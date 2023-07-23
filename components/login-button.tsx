'use client'

import * as React from 'react'
// import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconGitHub, IconSpinner } from '@/components/ui/icons'

// interface LoginButtonProps extends ButtonProps {
//   showGithubIcon?: boolean
//   text?: string
// }

export function LoginButton({
  text = 'Login with worldcoin',
  showGithubIcon = false, //true,
  // className,
  ...props
}: any) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        console.log('login button clicked worldcoin')
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        // signIn('worldcoin')
      }}
      disabled={isLoading}
      // className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : null}
      {text}
    </Button>
  )
}
