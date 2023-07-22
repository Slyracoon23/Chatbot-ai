'use client'
import React, { useEffect, useState } from 'react'

import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry
} from '@ethereum-attestation-service/eas-sdk'
import { ethers } from 'ethers'

const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e' // Sepolia v0.26

const AttestationComponent = () => {
  const [isValidSignature, setIsValidSignature] = useState(false)

  useEffect(() => {
    const createAttestation = async () => {
      // Assume that eas and sender are initialized elsewhere in your app
      const eas = new EAS(EASContractAddress)
      const provider = ethers.providers.getDefaultProvider('sepolia')

      const offchain = await eas.getOffchain()

      const attestationData = {
        recipient: signer.address,
        // Unix timestamp of when attestation expires. (0 for no expiration)
        expirationTime: 0,
        // Unix timestamp of current time
        time: 1671219636,
        revocable: true,
        version: 1,
        nonce: 0,
        schema:
          '0xf58b8b212ef75ee8cd7e8d803c37c03e0519890502d5e99ee2412aae1456cafe',
        refUID:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: '0x0000000000000000000000000000000000000000000000000000000000000000'
      }

      const privateKey =
        '78f847335d13b4ddf6e2e279515f48d2246256bd910b4f007fa3e6ac16e7887a'
      const signer = new ethers.Wallet(privateKey, provider)

      const response = await offchain.signOffchainAttestation(
        attestationData,
        signer
      )
      const isValid = await offchain.verifyOffchainAttestationSignature(
        signer.address,
        response
      )

      setIsValidSignature(isValid)
    }

    createAttestation()
  }, [])

  return (
    <div>
      <h1>Ethereum Attestation Service</h1>
      <p>
        The attestation signature is {isValidSignature ? 'valid' : 'invalid'}
      </p>
    </div>
  )
}

export default AttestationComponent
