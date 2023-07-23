import * as React from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import Web3ConnectButton from './web3connect-button'

export async function Header() {
  const session = { user: null }
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-muted/50 px-4">
      <div className="flex w-full items-stretch justify-end gap-2">
        <ThemeToggle />
        <Web3ConnectButton />
        {/* <div className="flex items-center">
          <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button>
              <Link href="/sign-in?callbackUrl=/">Login</Link>
            </Button>
          )}
        </div> */}
      </div>
      {/* <div className="flex items-center justify-end space-x-2">
        <a
          href="/"
          rel="noopener noreferrer"
          // className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="ml-2 hidden md:flex">GitHub</span>
        </a>
        <a
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          target="_blank"
          // className={cn(buttonVariants())}
        >
          <IconVercel className="mr-2" />
          <span className="hidden sm:block">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
        </a>
      </div> */}
      <div className="flex items-center justify-end space-x-2">
      </div>
    </header>
  )
}
