import { Orbit } from 'lucide-react'

import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1220px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Orbit className="dark:foreground size-6" />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
