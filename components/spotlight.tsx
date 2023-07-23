'use client'
import 'react-cmdk-dark/dist/cmdk.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'
// @ts-ignore
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk-dark'
import SismoConnect from '@/components/sismo-connect'
import { ConnectButton } from '@/components/connect-button'
import { createDriver } from 'use-neo4j'
import { useWriteCypher } from 'use-neo4j'
import { EOF } from 'dns'
import { useLazyWriteCypher } from 'use-neo4j'
// import { createNode } from '../services/neo4j'

interface NodeProps {
  id: number
  name: string
  skills: string
  email: string
}

const Spotlight = ({ runNodesQuery, runEdgesQuery }:any) => {
  const [page, setPage] = useState<'root' | 'projects'>('root')
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (window.location.href?.includes('sismoConnectResponse')){
      setSearch('sismo')
      setIsOpen(true)
    }
  }, [])

  const cypher = `
  CREATE (u:User {id: $userId, name: $userName})
  CREATE (t:Twitter {id: $twitterId, username: $twitterUsername})
  CREATE (u)-[:CONNECTS]->(t)
  `
  const cypherSismo = `
  CREATE (u:User {id: $userId, name: $userName})
  CREATE (s:Sismo {id: $sismoId, username: $sismoUser, authType: $authType})
  CREATE (u)-[:CONNECTS]->(t)
  `
  // Initialize the hook with the cypher query.
  const [runQuery, { loading, error, first }] = useLazyWriteCypher(cypher)
  const [runQuerySismo] = useLazyWriteCypher(cypherSismo)

  const params = {
    userId: 'Earl',
    userName: 'earl',
    twitterId: 'Twitter ID',
    twitterUsername: 'SLyracoon'
  }

  const handleTwitterSubmit = (params:any) => {
    // Run the query.
    runQuery(params)
      .then(res => {
        console.log(res)
        // Handle the result...
        runNodesQuery()
        runEdgesQuery()
      })
      .catch(err => {
        console.error(err)
        // Handle the error...
      })
  }
  const handleSismoSubmit = (params:any) => {
    // Run the query.
    runQuerySismo(params)
      .then(res => {
        console.log(res)
        // Handle the result...
        runNodesQuery()
        runEdgesQuery()
      })
      .catch(err => {
        console.error(err)
        // Handle the error...
      })
  }

  const handleClick = (id: string) => {
    switch (id) {
      case 'twitter':
        console.log('twitter')
        // createNode(label, data);

        break
      case 'walletconnect':
        // handle walletconnect action
        break
      case 'lens':
        // handle lens action
        break
      case 'discord':
        // handle discord action
        break
      case 'sismo':
        // handle sismo action
        break
      case 'privacy-policy':
        // handle privacy-policy action
        break
      case 'email':
        // handle email action
        break
      default:
        console.log(`No case matched for ${id}`)
    }
  }

  const label = 'Employees'
  const data = {
    id: 13,
    name: 'Bob',
    skills: 'none',
    email: 'bob.com',
    companyId: 5
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key == ' ' || e.code == 'Space' || e.keyCode == 32) {
        e.preventDefault()
        e.stopPropagation()

        setIsOpen((currentValue: boolean) => {
          return !currentValue
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const filteredItems = filterItems(
    [
      {
        heading: 'Connections',
        id: 'connections',
        items: [
          {
            id: 'twitter',
            children: 'Connect to Twitter',
            icon: () => (
              <Image
                src="/icon-twitter.svg"
                width="40"
                height="40"
                alt="twitter"
              />
            ),
            onClick: () => { handleTwitterSubmit(params) }
          },
          {
            id: 'walletconnect',
            children: <ConnectButton />,
            icon: () => (
              <Image src="/icon-wc.svg" width="40" height="40" alt="twitter" />
            ),
            onClick: () => {}
          },
          {
            id: 'lens',
            children: 'Connect Lens Profile',
            icon: () => (
              <Image
                src="/icon-lens.svg"
                width="40"
                height="40"
                alt="twitter"
              />
            ),
            closeOnSelect: false,
            onClick: () => {
              // handleClick('twitter');
              console.log('twitter')
            }
          },
          {
            id: 'discord',
            children: 'Connect Discord',
            icon: () => (
              <Image
                src="/icon-discord.svg"
                width="40"
                height="40"
                alt="twitter"
              />
            ),
            closeOnSelect: false,
            onClick: () => {
              console.log('discord')
            }
          }
        ]
      },
      {
        heading: 'Commands',
        id: 'commands',
        items: [
          {
            id: "sismo",
            keywords: ['Prove with Sismo'],
            children: <SismoConnect setSearch={setSearch} setIsOpen={setIsOpen} handleSubmit={handleSismoSubmit} />,
            icon: () => (
              <Image
                src="/icon-sismo.svg"
                width="40"
                height="40"
                alt="twitter"
              />
            )
          },
          {
            id: 'privacy-policy',
            children: 'Create EAS Attestation',
            icon: 'CogIcon',
            onClick: () => {}
          },
          {
            id: 'email',
            children: 'Re: AWS partnership” — jeff@amazon.com',
            icon: 'CogIcon',
            onClick: () => {}
          }
        ]
      }
    ],
    search
  )

  return (
    <>
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setIsOpen}
      search={search}
      isOpen={isOpen}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list: any) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }: any) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>
    </CommandPalette>
    </>
  )
}

export default Spotlight
