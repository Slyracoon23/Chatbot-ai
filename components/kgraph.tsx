'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
  darkTheme,
  GraphCanvas,
  GraphCanvasRef,
  GraphEdge,
  GraphNode,
  useSelection,
  RadialMenu,
  SphereWithSvg,
  Svg,
  SphereWithIcon
} from 'reagraph'
import { useReadCypher } from 'use-neo4j'

import { CardDemo} from '@/components/card-kgraph';


export const KGraph = () => {
  const graphRef = useRef<GraphCanvasRef | null>(null)

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
    // Run the edges query when the component mounts and every minute afterwards
    const intervalId = setInterval(() => {
      runNodesQuery()
      runEdgesQuery()
    }, 60000) // Run every minute (60000 milliseconds)

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    // Update the nodes state when the nodesRecords changes
    if (nodesRecords) {
      const newNodes: any = nodesRecords.map((record: any) => {
        const node = record.get('n')
        return { id: node.identity.toString(), label: node.labels[0] }
      })
      setNodes(newNodes)
    }
  }, [nodesRecords])

  useEffect(() => {
    // Update the edges state when the edgesRecords changes
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

  const {
    selections,
    actives,
    onNodeClick,
    onCanvasClick,
    onNodePointerOver,
    onNodePointerOut
  } = useSelection({
    ref: graphRef,
    nodes,
    edges,
    pathSelectionType: 'out'
  })

  if (nodesLoading || edgesLoading) return <div>Loading...</div>

  return (
    <div>
      <GraphCanvas
        theme={darkTheme}
        nodes={nodes}
        edges={edges}
        ref={graphRef}
        selections={selections}
        onCanvasClick={onCanvasClick}
        onNodeClick={onNodeClick}
        // cameraMode="rotate"
        renderNode={({ node, ...rest }) => (
          <SphereWithIcon {...rest} node={node} image={node.icon || '/kartek.png'} />
        )}
        contextMenu={({ data, additional, onClose }) => (
          <CardDemo/>
        )}
      />
    </div>
  )
}
