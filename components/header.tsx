import * as React from 'react'

import Web3ConnectButton from './web3connect-button'
import { ThemeToggle } from './theme-toggle'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-muted/50 px-4">
      <div className="flex w-full items-stretch justify-end gap-2">
        <ThemeToggle />
        <Web3ConnectButton />
      </div>
    </header>
  )
}
