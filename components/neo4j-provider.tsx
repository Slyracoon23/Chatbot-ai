'use client';
import React from 'react';
import { Neo4jProvider, createDriver } from 'use-neo4j';


const driver = createDriver("neo4j+s", "008a57cc.databases.neo4j.io", 7687, "neo4j", "r5a9crFqtc0kqnioMrMcNZyZyIJ4plwmizIK8Hl-zUg");

export const Neo4jContextProvider = ({children}) => {
    

  return (
    <Neo4jProvider driver={driver}>
      {children}
    </Neo4jProvider>
  );
}
