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

import { CardDemo } from '@/components/card-kgraph'

export const KGraph = ({
  nodesLoading,
  nodesRecords,
  edgesLoading,
  edgesRecords
}: any) => {
  const graphRef = useRef<GraphCanvasRef | null>(null)

  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  console.log(nodes)
  useEffect(() => {
    if (nodesRecords) {
      const newNodes: any = nodesRecords.map((record: any) => {
        const node = record.get('n')
        console.log(node)
        return { id: node.identity.toString(), label: `${node.labels[0]}-${node.identity.toString()}`, icon: `/icon-${node.labels[0]?.toLowerCase()}.svg` }
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
          <SphereWithIcon
            {...rest}
            node={node}
            image={node.icon || '/kartek.png'}
          />
        )}
        contextMenu={({ data, onClose }) => <CardDemo />}
      />
    </div>
  )
}
