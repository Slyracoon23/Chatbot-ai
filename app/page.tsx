'use client'

import React, { useEffect } from 'react'
import { KGraph } from '@/components/kgraph'
import { useReadCypher } from 'use-neo4j'
import Spotlight from '@/components/spotlight'
import Web3ConnectButton from '@/components/web3connect-button'

export const runtime = 'edge'

export default function IndexPage() {
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
  }, [runNodesQuery, runEdgesQuery])

  return (
    <div className="flex-row justify-around align-middle">
      <Spotlight runNodesQuery={runNodesQuery} runEdgesQuery={runEdgesQuery} />
      <KGraph
      // nodesLoading={nodesLoading}
      // nodesRecords={nodesRecords}
      // edgesRecords={edgesRecords}
      // edgesLoading={edgesLoading}
      />
      <Web3ConnectButton />
    </div>
  )
}
