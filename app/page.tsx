'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { nanoid } from '@/lib/utils'
import Spotlight from '@/components/spotlight'
import { KGraph } from '@/components/kgraph'
import { useReadCypher } from 'use-neo4j'
import { truncate } from 'fs'

export default function IndexPage() {
  const id = nanoid()
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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

  const LandingPage = () => {
    const handleInputClick = () => {
        setClicked(true);
        setIsVisible(false)
    };

    return (
      <div className="flex h-screen flex-row items-center justify-center">
       {!clicked &&  <Image className={`${clicked ? 'left-transform' : ''}`} src='/left.png' alt="left" width={350} height={520} />}
        <div className="flex h-screen flex-col items-center justify-center">
        {!clicked && <Image src='/GraphID.svg' alt="left" width={300} height={100} />}
          {!clicked && <p className="mt-6 text-center font-mono text-3xl font-bold">Your Digital Universe, Mapped Out</p>}
          {!clicked && <p className="text-mb mb-4 mt-6 text-center font-mono font-light">Reimagine how you share, manage, and visualize your digital data across Web2 and Web3</p>}
          {isVisible && (<input
              onClick={handleInputClick}
              className={`w-1/2 p-2 rounded ${clicked ? "input-transform text-2xl" : ""}`}
              type="text"
              placeholder="START SEARCH WITH SPACEBAR..."
          />)}
          {!clicked && <button className="connect-button">Connect</button>}
        </div>
        {!clicked && <Image className={`${clicked ? 'right-transform' : ''}`} src='/right.png' alt="left" width={300} height={500} />}
       </div>
    );
  };

  return (
    <div className="flex-row justify-around align-middle">
      {isVisible && <LandingPage />}
      {!isVisible && (
        <div>
        <Spotlight runNodesQuery={runNodesQuery} runEdgesQuery={runEdgesQuery} />
          <KGraph
            nodesLoading={nodesLoading}
            nodesRecords={nodesRecords}
            edgesRecords={edgesRecords}
            edgesLoading={edgesLoading}
          /></div>)}
    </div>
  )
}
