'use client'

import { BrowserProvider } from 'ethers'
import { useState } from 'react'
// import { Input, Box, Flex } from "@chakra-ui/react"
import lf from 'localforage'
import { last, assoc, isNil } from 'ramda'
import Link from 'next/link'
import Jdenticon from 'react-jdenticon'
import {
  connectWithWeaveDB,
  createTempAddress,
  getPubKey,
  isOwner,
  signPayload,
  verifyProof
} from '../lib/nextid'
import { ExternalLink } from './external-link'
import { Button } from './ui/button'

export default function SignIn({
  isModal,
  setIsModal,
  userMap,
  setUserMap,
  setUser
}: // sdk
any) {
  const [nextID, setNextID] = useState(null)
  const [logging, setLogging] = useState(false)
  const [handle, setHandle] = useState('')
  const [statusID, setStatusID] = useState('')

  return !isModal ? null : (
    <div onClick={() => setIsModal(false)}>
      <Button
        onClick={(e: any) => {
          e.stopPropagation()
        }}
      >
        {!isNil(nextID) ? (
          <>
            <Button onClick={() => setNextID(null)}>Cancel</Button>
            <div>
              <div>
                To link <div>{(nextID as any).addr}</div>
              </div>
              <div>
                tweet
                <ExternalLink
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    (nextID as any).tweet
                  )}`}
                >
                  this
                </ExternalLink>
                via @{(nextID as any).identity} and get the status ID.
              </div>
            </div>
            <div>
              <input
                placeholder="Status ID"
                onChange={e => setStatusID(e.target.value)}
                value={statusID}
              />
              <div
                onClick={async () => {
                  setLogging(true)
                  try {
                    if (/^\s*$/.test(statusID)) {
                      alert('specify status ID')
                      setLogging(false)
                      return
                    }
                    if (await verifyProof(statusID, nextID)) {
                      const signer = await new BrowserProvider(
                        (window as any).ethereum
                      ).getSigner()
                      const { new_user, user_with_cred } =
                        await createTempAddress(
                          (nextID as any).identity,
                          signer
                          // sdk
                        )
                      if (isNil(new_user)) {
                        alert('something went wrong!')
                      } else {
                        await lf.setItem('user', user_with_cred)
                        setUserMap(
                          assoc((nextID as any).identity, new_user, userMap)
                        )
                        setUser(user_with_cred)
                        setLogging(false)
                        setIsModal(false)
                        setNextID(null)
                      }
                    }
                  } catch (e) {}
                  setLogging(false)
                }}
              >
                {logging ? <div /> : null}
                <div>Verify</div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <input
              placeholder="Twitter Handle"
              onChange={e => setHandle(e.target.value)}
              value={handle}
            />
            <Button
              onClick={async () => {
                setLogging(true)
                try {
                  const identity = handle.toLowerCase()
                  if ((window as any).ethereum) {
                    const { public_key, addr, signer } = await getPubKey(
                      identity
                    )
                    if (await isOwner(identity, public_key)) {
                      const { new_user, user_with_cred } =
                        await createTempAddress(identity, signer /*, sdk*/)
                      if (isNil(new_user)) {
                        alert('something went wrong!')
                        setLogging(false)
                        return
                      } else {
                        await lf.setItem('user', user_with_cred)
                        setUserMap(assoc(identity, new_user, userMap))
                        setUser(user_with_cred)
                        setLogging(false)
                        setIsModal(false)
                        return
                      }
                    }
                    const { signature, uuid, created_at, tweet } =
                      await signPayload(identity, public_key, signer)
                    setNextID({
                      addr,
                      identity,
                      signature,
                      uuid,
                      public_key,
                      created_at,
                      tweet
                    } as any)
                  }
                } catch (e) {}
                setLogging(false)
              }}
            >
              {logging ? <div /> : null}
              <div>NextID Sign In</div>
            </Button>
          </div>
        )}
      </Button>
    </div>
  )
}
