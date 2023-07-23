// @ts-nocheck
'use client'

import 'react-cmdk-dark/dist/cmdk.css'
import Image from 'next/image'
import { useState, useCallback, useEffect, useRef } from 'react'
// @ts-ignore
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk-dark'
// @ts-ignore
import { IDKitWidget } from '@worldcoin/idkit'
import SismoConnect from '@/components/sismo-connect'
import Worldcoin from '@/components/worldcoin'
import { useLazyWriteCypher } from 'use-neo4j'
import Web3ConnectButton from './web3connect-button'
// import { createNode } from '../services/neo4j'

import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry
} from '@ethereum-attestation-service/eas-sdk'
import { ethers } from 'ethers'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface NodeProps {
  id: number
  name: string
  skills: string
  email: string
}

const Spotlight = ({ runNodesQuery, runEdgesQuery }: any) => {
  const [page, setPage] = useState<'root' | 'projects'>('root')
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [worldcoinModalOpen, setWorldcoinModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showAttestation, setShowAttestation] = useState(false)

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

    //@ts-ignore
    { loadingWorldcoin, errorWorldcoin, firstWorldcoin }
  ] = useLazyWriteCypher(cypherWorldcoin) as any

  const cypher = `
  CREATE (u:User {id: $userId, name: $userName})
  CREATE (t:Twitter {id: $twitterId, username: $twitterUsername})
  CREATE (u)-[:CONNECTS]->(t)
  `

  const cypherEAS = `
  CREATE (u:User {id: $userId})
  CREATE (d:DAO {id: "DAO 1", easId: $easId})
  CREATE (u)-[:IS_MEMBER_OF]->(d)
  
  `

  const [runEASQuery, { loadingEAS, errorEAS, firstEAS }] =
    useLazyWriteCypher(cypherEAS)

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
      .then((res: any) => {
        console.log(res)
        // Handle the result...
        runNodesQuery()
        runEdgesQuery()
      })
      .catch((err:any) => {
        console.error(err)
        // Handle the error...
      })
  }
  const handleSismoSubmit = (params: any) => {
    // Run the query.
    runQuerySismo(params)
      .then((res:any) => {
        console.log(res)
        // Handle the result...
        runNodesQuery()
        runEdgesQuery()
      })
      .catch((err:any) => {
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


  const handleEAS = async () => {
    //////////////////////////////////////

    const provider = ethers.providers.getDefaultProvider('sepolia')
    const privateKey =
      '78f847335d13b4ddf6e2e279515f48d2246256bd910b4f007fa3e6ac16e7887a'
    const signer = new ethers.Wallet(privateKey, provider)

    const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e' // Sepolia v0.26

    // Assume that eas and sender are initialized elsewhere in your app
    const eas = new EAS(EASContractAddress, { signerOrProvider: signer })

    const offchain = await eas.getOffchain()

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder('uint256 eventId, uint8 voteIndex')
    const encodedData = schemaEncoder.encodeData([
      { name: 'eventId', value: 1, type: 'uint256' },
      { name: 'voteIndex', value: 1, type: 'uint8' }
    ])

    const schemaUID =
      '0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995'

    const attestationData = {
      recipient: signer.address,
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: 0,
      // Unix timestamp of current time
      time: 1671219636,
      revocable: true,
      version: 1,
      nonce: 0,
      schema: schemaUID,
      refUID:
        '0xee0d4d106d3f65f24f38d132138194a75c8788e9df520b526560ce825ddb60e3',
      data: encodedData,
    }

    const response = await offchain.signOffchainAttestation(
      attestationData,
      signer
    )

    const isValid = await offchain.verifyOffchainAttestationSignature(
      signer.address,
      response
    )
    alert('Attestation created successfully! and is valid: ' + isValid)
    ////////////////////////////////////////////

    // Define Cypher query for connecting user with Worldcoin entity
    setShowAttestation(false)
    // Define parameters for the Cypher query
    const easParams = {
      userId: 'Earl', // replace this with the actual user ID
      easId: 1 // replace this with the actual Worldcoin ID
    }

    // Run the Cypher query
    runEASQuery(easParams)
      .then((res:any) => {
        console.log(res)
        // Handle the result...
        runNodesQuery()
        runEdgesQuery()
      })
      .catch((err:any) => {
        console.error(err)
        // Handle the error...
      })
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
                src="/icon-worldcoin.svg"
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
            id: 'walletconnect',
            children: () => <Web3ConnectButton />,
            icon: () => (
              <Image src="/icon-wc.svg" width="40" height="40" alt="twitter" />
            ),
            onClick: () => {}
          },
          {
            id: 'polygon',
            children: 'Age Verification with Polygon Id',
            icon: () => (
              <Image src="/icon-poly.svg" width="40" height="40" alt="twitter" />
            ),
            onClick: () => {
              window.location.href = 'https://platform-test.polygonid.com/claim-link/ec0dbb00-3aea-41a0-93d8-acb4321f367a'
            }
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
                handleSubmit={handleSismoSubmit}
              />
            ),
            onClick: () => {
              handleSismoSubmit({
                sismoId: '1',
                sismoUser: '0xuser',
                authType: 'Twitter'
              })
            },
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
            onClick: () => {
              setShowAttestation(true)
            }
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
      {showAttestation && (
        <Dialog open={showAttestation} onOpenChange={setShowAttestation}>
          <DialogTrigger asChild>
            <Button variant="outline">
              Make an Attesation about your Friend!
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Create your attestation here! Friend OF ...
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name of Friend:
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  EthWallet of Friend:
                </Label>
                <Input
                  id="ethwallet"
                  value="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleEAS} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default Spotlight
