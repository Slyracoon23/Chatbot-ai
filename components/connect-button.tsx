'use client'

import {
  WalletConnectModalAuth,
  useSignIn
} from '@walletconnect/modal-auth-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

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
    <Button variant={'roundedOutline'} onClick={onSignIn} disabled={disabled} className={'hover:border-green-500'} >
    {loading ? 'Loading...' : connectData?.valid ? 'Disconnect' : 'Connect'}

      Sign In
    </Button>
  )
}
