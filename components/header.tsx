import * as React from 'react'

import { IconGitHub, IconSeparator, IconVercel } from '@/components/ui/icons'
import { ConnectButton } from './connect-button'

export async function Header() {
  // const session = await auth()
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <div className="flex items-center">
          <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <ConnectButton />
      </div>
    </header>
  )
}
