'use client'
import 'react-cmdk-dark/dist/cmdk.css'
import Image from 'next/image'
import { useState, useCallback, useEffect, useRef } from 'react'
// @ts-ignore
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk-dark'
// @ts-ignore
import { IDKitWidget } from '@worldcoin/idkit'
import SismoConnect from '@/components/sismo-connect'
import { ConnectButton } from '@/components/connect-button'
import Worldcoin from '@/components/worldcoin'
import { useLazyWriteCypher } from 'use-neo4j'

interface NodeProps {
  id: number
  name: string
  skills: string
  email: string
}

const Spotlight = ({ runNodesQuery, runEdgesQuery }: any) => {
  const [page, setPage] = useState<'root' | 'projects'>('root')
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [worldcoinModalOpen, setWorldcoinModalOpen] = useState(false)

  const worldcoinRef = useRef({ open: () => {} })

  const widgetChildren = useCallback(({ open }: any) => {
    worldcoinRef.current.open = open
    return null // Here you are returning null, you could also return a React element if needed.
  }, [])

  // useEffect(() => {
  //   if (worldcoinModalOpen) {
  //     worldcoinRef.current.open();
  //   }
  // }, [worldcoinModalOpen]);

  const handleWorldcoinSuccess = (data: any) => {
    console.log(data)
    // handle successful Worldcoin verification here
    setWorldcoinModalOpen(false)

    handleWorldcoinSubmit()
  }

  const handleWorldcoinVerify = (data: any) => {
    console.log('Proof received:', data)
    // handle Worldcoin proof receipt here
    // Define Cypher query for connecting user with Worldcoin entity

    handleWorldcoinSubmit()
  }

  const cypherWorldcoin = `
  CREATE (u:User {id: $userId})
  CREATE (w:Worldcoin {id: $worldcoinId})
  CREATE (u)-[:CONNECTS]->(w)
  `

  // Initialize the hook with the cypher query.
  const [
    runWorldcoinQuery,
    { loadingWorldcoin, errorWorldcoin, firstWorldcoin }
  ] = useLazyWriteCypher(cypherWorldcoin) as any

  useEffect(() => {
    if (window.location.href?.includes('sismoConnectResponse')) {
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

  const handleTwitterSubmit = () => {
    const params = {
      userId: 'Earl',
      userName: 'earl',
      twitterId: 'Twitter ID 2',
      twitterUsername: 'SLyracoon'
    }
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
  const handleSismoSubmit = (params: any) => {
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

  const handleWorldcoinSubmit = () => {
    // Define Cypher query for connecting user with Worldcoin entity

    // Define parameters for the Cypher query
    const worldcoinParams = {
      userId: 'Earl', // replace this with the actual user ID
      worldcoinId: 1 // replace this with the actual Worldcoin ID
    }

    // Run the Cypher query
    runWorldcoinQuery(worldcoinParams)
      .then((res: any) => {
        console.log(res)
        // Handle the result...
        runNodesQuery()
        runEdgesQuery()
      })
      .catch((err: any) => {
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
            onClick: () => {
              handleTwitterSubmit()
            }
          },
          {
            id: 'Worldcoin',
            children: 'Connect to Worldcoin',
            icon: () => (
              <Image
                src="/icon-twitter.svg"
                width="40"
                height="40"
                alt="twitter"
              />
            ),
            onClick: () => {
              // debugger
              worldcoinRef.current.open()
            }
          },
          {
            id: 'worldcoin',
            children: 'Connect to Worldcoin',
            icon: () => (
              <Image
                src="/icon-worldcoin.svg"
                width="40"
                height="40"
                alt="worldcoin"
              />
            ),
            onClick: () => {}
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
            id: 'sismo',
            keywords: ['Prove with Sismo'],
            children: (
              <SismoConnect
                setSearch={setSearch}
                setIsOpen={setIsOpen}
                handleSubmit={handleSismoSubmit}
              />
            ),
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
      <Worldcoin />
      <IDKitWidget
        ref={worldcoinRef}
        app_id="app_ae12796fe25aa0e49f21304075b405a4"
        action="monstor-proof"
        onSuccess={handleWorldcoinSuccess}
        handleVerify={handleWorldcoinVerify}
        //@ts-ignore
        credential_types={['orb', 'phone']}
        enableTelemetry
      >
        {widgetChildren as any}
      </IDKitWidget>
    </>
  )
}

export default Spotlight
