'use client'

import React from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, avalanche, bscTestnet, mainnet, polygon } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'

const chains = [arbitrum, mainnet, polygon, bscTestnet, avalanche]
const projectId = 'aca932c97e3f9bc59a1636dc1aeae670'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function Web3ConnectButton() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button icon="hide" label="Connect" balance="hide" />
      </WagmiConfig>

      <Web3Modal
        themeMode="dark"
        themeVariables={{
          '--w3m-overlay-backdrop-filter': 'blur(5px)',
          '--w3m-overlay-background-color': '#a3e635',
          '--w3m-background-color': '#a3e635',
          '--w3m-accent-fill-color': '#fff',
          '--w3m-accent-color': '#a3e635'
          //   '--w3m-font-family': 'jost'
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  )
}

export default Web3ConnectButton
