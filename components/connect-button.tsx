'use client'

import { useSignIn } from '@walletconnect/modal-auth-react'
import { useState } from 'react'

export function ConnectButton() {
  const [disabled, setDisabled] = useState(false)
  const { signIn } = useSignIn({ statement: 'Sign In to My Dapp' })

  async function onSignIn() {
    try {
      setDisabled(true)
      const data = await signIn()
      console.info(data)
    } catch (err) {
      console.error(err)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <button onClick={onSignIn} disabled={disabled}>
      Connect to WalletConnect
    </button>
  )
}
