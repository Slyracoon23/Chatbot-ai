'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { TooltipProvider } from '@/components/ui/tooltip'
import { WalletConnectModalAuth } from '@walletconnect/modal-auth-react'


export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <>
      <NextThemesProvider {...props}>
        <TooltipProvider>{children}</TooltipProvider>
      </NextThemesProvider>
      <WalletConnectModalAuth
        projectId={'ce5ddda2d7ebe0e88dd74bc3b54a2cf7'}
        metadata={{
          name: 'My Dapp',
          description: 'My Dapp description',
          url: 'https://my-dapp.com',
          icons: ['https://my-dapp.com/logo.png']
        }}
      />
    </>
  )
}
