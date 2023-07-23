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
        projectId="ce5ddda2d7ebe0e88dd74bc3b54a2cf7"
        modalOptions={{
          explorerRecommendedWalletIds: [
            'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
            '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
            '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
          ]
        }}
        metadata={{
          name: 'GraphID',
          description: 'Self-Sovereign Knowledge Graph',
          url: 'https://graphid.vercel.app',
          icons: ['https://graphid.vercel.app/logo.png']
        }}
      />
    </>
  )
}
