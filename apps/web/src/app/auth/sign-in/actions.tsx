'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z
    .string()
    .min(1, { message: 'Please, provide your password.' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const payload = signInSchema.safeParse(Object.fromEntries(data))

  if (!payload.success) {
    const errors = payload.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }
  const { email, password } = payload.data

  try {
    const result = await signInWithPassword({
      email,
      password,
    })

    console.log(result)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)
    return {
      success: false,
      message: 'An unexpected error occurred, try again in a few minutes',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
