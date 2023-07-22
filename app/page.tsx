'use client'

import React, { useEffect } from 'react'
import Spotlight from '@/components/spotlight'
import { KGraph } from '@/components/kgraph'
import { useReadCypher } from 'use-neo4j'
import { ConnectButton } from '@/components/connect-button'

export const runtime = 'edge'

export default function IndexPage() {
  const {
    loading: nodesLoading,
    records: nodesRecords,
    run: runNodesQuery
  } = useReadCypher('MATCH (n) RETURN n LIMIT 30')

  const {
    loading: edgesLoading,
    records: edgesRecords,
    run: runEdgesQuery
  } = useReadCypher('MATCH ()-[r]->() RETURN r LIMIT 30')

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
        nodesLoading={nodesLoading}
        nodesRecords={nodesRecords}
        edgesRecords={edgesRecords}
        edgesLoading={edgesLoading}
      />
      <ConnectButton />
    </div>
  )
}
