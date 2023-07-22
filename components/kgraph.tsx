'use client';
import React, { useState } from "react";
import { GraphCanvas } from "reagraph";

export const KGraph = () => {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      label: "1",
    },
    {
      id: "2",
      label: "2",
    },
  ]);

  const [edges, setEdges] = useState([
    {
      source: "1",
      target: "2",
      id: "1-2",
      label: "1-2",
    },
    {
      source: "2",
      target: "1",
      id: "2-1",
      label: "2-1",
    },
  ]);

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      label: (nodes.length + 1).toString(),
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div>

      <GraphCanvas nodes={nodes} edges={edges} />
    </div>
  );
};
