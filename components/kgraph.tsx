'use client'
import React, { useState, useEffect } from 'react'
import { GraphCanvas, SphereWithIcon } from 'reagraph'
import { useReadCypher } from 'use-neo4j'

export const KGraph = () => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const {
    loading: nodesLoading,
    records: nodesRecords,
    run: runNodesQuery
  } = useReadCypher('MATCH (n) RETURN n LIMIT 10')

  const {
    loading: edgesLoading,
    records: edgesRecords,
    run: runEdgesQuery
  } = useReadCypher('MATCH ()-[r]->() RETURN r LIMIT 10')

  useEffect(() => {
    runNodesQuery()
    runEdgesQuery()
  }, [runEdgesQuery, runNodesQuery])

  useEffect(() => {
    if (nodesRecords) {
      const newNodes: any = nodesRecords.map((record: any) => {
        const node = record.get('n')
        return { id: node.identity.toString(), label: node.labels[0] }
      })
      setNodes(newNodes)
    }
  }, [nodesRecords])

  useEffect(() => {
    if (edgesRecords) {
      const newEdges: any = edgesRecords.map((record: any) => {
        const relationship = record.get('r')
        return {
          source: relationship.start.toString(),
          target: relationship.end.toString(),
          id: relationship.identity.toString(),
          label: relationship.type
        }
      })
      setEdges(newEdges)
    }
  }, [edgesRecords])

  if (nodesLoading || edgesLoading) return <div>Loading...</div>

  return (
    <div>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        renderNode={({ node, ...rest }) => (
          <SphereWithIcon
            {...rest}
            node={node}
            image={node.icon || '/twitter.png'}
          />
        )}
      />
    </div>
  )
}
