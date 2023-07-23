'use client'
import React, { useEffect } from 'react'
import { nanoid } from '@/lib/utils'
import Spotlight from '@/components/spotlight'
import { KGraph } from '@/components/kgraph'
import { useReadCypher } from 'use-neo4j'

export default function IndexPage() {
  const id = nanoid()

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
  }, [])

  return (
    <div className="flex-row justify-around align-middle">
      <Spotlight runNodesQuery={runNodesQuery} runEdgesQuery={runEdgesQuery} />
      <KGraph
        nodesLoading={nodesLoading}
        nodesRecords={nodesRecords}
        edgesRecords={edgesRecords}
        edgesLoading={edgesLoading}
      />
    </div>
  )
}
