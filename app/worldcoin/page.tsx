'use client'
import { IDKitWidget } from '@worldcoin/idkit'


export default function Worldcoin() {
  const onSuccess = (response) => {
    console.log('Success!', response)
  }

  const handleVerify = (proof) => {
    console.log('Proof received:', proof)
  }

  return (
    <div className="App">
      <IDKitWidget
        app_id="app_ae12796fe25aa0e49f21304075b405a4" // obtained from the Developer Portal
        action="monstor-proof" // this is your action name from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // optional callback when the proof is received
        credential_types={['orb', 'phone']} // optional, defaults to ['orb']
        enableTelemetry // optional, defaults to false
      >
        {({ open }) => <button onClick={open}>Verify with World ID</button>}
      </IDKitWidget>
    </div>
  )
}
