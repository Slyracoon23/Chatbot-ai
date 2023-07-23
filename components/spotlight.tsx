'use client';
import "react-cmdk-dark/dist/cmdk.css";
import Image from 'next/image';
import { useState, useEffect } from "react";
// @ts-ignore
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk-dark";
import SismoConnect from '@/components/sismo-connect';
import { ConnectButton } from '@/components/connect-button';
import { createDriver } from 'use-neo4j'
import { createNode } from '../services/neo4j'

const Spotlight = () => {
  const [page, setPage] = useState<'root' | 'projects'>('root')
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState<boolean>(false)


const driver = createDriver(
  'neo4j+s',
  '008a57cc.databases.neo4j.io',
  7687,
  'neo4j',
  'r5a9crFqtc0kqnioMrMcNZyZyIJ4plwmizIK8Hl-zUg'
)

interface NodeProps {
  id: number;
  name: string;
  skills: string;
  email: string;
}


  const label = 'Employees';
  const data = {
    id: 13,
    name: 'Bob',
    skills: 'none',
    email: 'bob.com',
    companyId: 5,
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32 ) {
        e.preventDefault();
        e.stopPropagation();
  
        setIsOpen((currentValue: boolean) => {
          return !currentValue;
        });
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
              createNode(label, data)
            }
          },
          {
            id: 'walletconnect',
            children: <ConnectButton />,
            icon: () => (
              <Image src="/icon-wc.svg" width="40" height="40" alt="twitter" />
            ),
            onClick: () => {
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
            },
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
            },
          },
        ],
      },
      {
        heading: 'Commands',
        id: 'commands',
        items: [
          {
            id: "sismo",
            children: <SismoConnect />,
            icon: () => <Image src='/icon-sismo.svg' width="40" height="40" alt="twitter" />,
          },
          {
            id: 'privacy-policy',
            children: 'Create EAS Attestation',
            icon: 'CogIcon',
            onClick: () => {
            },
          },
          {
            id: 'email',
            children: 'Re: AWS partnership” — jeff@amazon.com',
            icon: 'CogIcon',
            onClick: () => {
            },
          },
        ],
      },
    ],
    search
  )

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setIsOpen}
      search={search}
      isOpen={isOpen}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list :any) => (
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
  )
}

export default Spotlight
