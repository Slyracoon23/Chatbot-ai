'use client'
import 'react-cmdk/dist/cmdk.css'
import Image from 'next/image'
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk'
import { useState, useEffect } from 'react'

const Spotlight = () => {
  const [page, setPage] = useState<'root' | 'projects'>('root')
  const [open, setOpen] = useState<boolean>(true)
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key == ' ' || e.code == 'Space' || e.keyCode == 32) {
        e.preventDefault()
        e.stopPropagation()

        setIsOpen(currentValue => {
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
              console.log('twitter')
            }
          },
          {
            id: 'worldcoin',
            children: 'Connect to Worldcoin',
            icon: () => (
              <Image src="/icon-wc.svg" width="40" height="40" alt="twitter" />
            ),
            onClick: () => {
              console.log('wc')
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
              console.log('lens')
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
              setPage('projects')
            }
          }
        ]
      },
      {
        heading: 'Commands',
        id: 'commands',
        items: [
          {
            id: 'developer-settings',
            children: 'Create Sismo Badge',
            icon: () => (
              <Image
                src="/icon-sismo.svg"
                width="40"
                height="40"
                alt="twitter"
              />
            ),
            onClick: () => {
              alert('Sismo ...')
            }
          },
          {
            id: 'privacy-policy',
            children: 'Create EAS Attestation',
            icon: 'CogIcon',
            onClick: () => {
              alert('EAS out...')
            }
          },
          {
            id: 'email',
            children: 'Re: AWS partnership” — jeff@amazon.com',
            icon: 'CogIcon',
            onClick: () => {
              alert('email...')
            }
          }
        ]
      }
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
          filteredItems.map(list => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
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
