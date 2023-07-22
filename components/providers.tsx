'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { Neo4jProvider, createDriver } from 'use-neo4j'
import { TooltipProvider } from '@/components/ui/tooltip'
import { WalletConnectModalAuth } from '@walletconnect/modal-auth-react'

const driver = createDriver(
  'neo4j+s',
  '008a57cc.databases.neo4j.io',
  7687,
  'neo4j',
  'r5a9crFqtc0kqnioMrMcNZyZyIJ4plwmizIK8Hl-zUg'
)

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <>
      <NextThemesProvider {...props}>
        <Neo4jProvider driver={driver}>
          <TooltipProvider>{children}</TooltipProvider>
        </Neo4jProvider>
      </NextThemesProvider>
      <WalletConnectModalAuth
        projectId={'ce5ddda2d7ebe0e88dd74bc3b54a2cf7'}
        metadata={{
          name: 'GraphID',
          description: 'A Self-Sovereign Knowledge Graph',
          url: 'https://graphid.vercel.app',
          icons: ['https://graphid.vercel.app/logo.png']
        }}
      />
    </>
  )
}
