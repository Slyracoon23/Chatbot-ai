'use client'

import { useSignIn } from '@walletconnect/modal-auth-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

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
    <Button  className="connect-button hover:border-green-500" variant={'roundedOutline'} onClick={onSignIn} disabled={disabled}>
      Connect
    </Button>
  )
}
