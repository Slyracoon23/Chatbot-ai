'use client'

import React, { useEffect } from 'react'
// import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import Spotlight from '@/components/spotlight'
import { ConnectButton } from '@/components/connect-button'
import SocialModal from '@/components/social-modal'
import { UserProfileCard } from '@/components/profile-card'
import NotificationsCard from '@/components/notifications-card'
import OtherProfile from '@/components/other-profile'
import WalletInfo from '@/components/wallet-information'

export const runtime = 'edge'

import React, { useEffect } from 'react'
import { KGraph } from '@/components/kgraph'
import { useReadCypher } from 'use-neo4j'
import { ConnectButton } from '@/components/connect-button'

export const runtime = 'edge'

export default function IndexPage() {
  // const id = nanoid()

  const {
    loading: nodesLoading,
    records: nodesRecords,
    run: runNodesQuery
  } = useReadCypher('MATCH (n) RETURN n LIMIT 50')

  const {
    loading: edgesLoading,
    records: edgesRecords,
    run: runEdgesQuery
  } = useReadCypher('MATCH ()-[r]->() RETURN r LIMIT 50')

  useEffect(() => {
    // Run once when the component mounts
    runNodesQuery()
    runEdgesQuery()
    // We can add these deps to make linter happy, anyway they will not change
  }, [runEdgesQuery, runNodesQuery])

  return (
    <div className="flex-row justify-around align-middle">
      <Spotlight runNodesQuery={runNodesQuery} runEdgesQuery={runEdgesQuery} />
      <KGraph
      // nodesLoading={nodesLoading}
      // nodesRecords={nodesRecords}
      // edgesRecords={edgesRecords}
      // edgesLoading={edgesLoading}
      />
      <ConnectButton />
    </div>
  )
}
