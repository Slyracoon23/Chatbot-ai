'use client'

import {
  WalletConnectModalAuth,
  useSignIn
} from '@walletconnect/modal-auth-react'
import { useState } from 'react'
import { Button } from './ui/button'

export function ConnectButton() {
  const [disabled, setDisabled] = useState(false)
  const {
    signIn,
    data: connectData,
    loading
  } = useSignIn({
    statement: 'Sign In to GraphID'
  })

  async function onSignIn() {
    try {
      setDisabled(true)
      console.log('data obtained:', connectData)
      const data = await signIn()
      console.info('sign-in data:', data)
    } catch (err) {
      console.log('this happened:', err)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <Button disabled={disabled} onClick={onSignIn}>
      {loading ? 'Loading...' : connectData?.valid ? 'Disconnect' : 'Connect'}
    </Button>
  )
}
