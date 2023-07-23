// import SDK from "weavedb-sdk"
// import { publicKey } from 'eth-crypto'
// import {
//   SigningKey,
//   getBytes,
//   verifyMessage,
//   hashMessage,
//   BrowserProvider
// } from 'ethers'
// import { mergeLeft, isEmpty, isNil } from 'ramda'

export async function createTempAddress(handle: any, signer: any /*sdk: any*/) {
  console.log('temp address')
  // sign a query to link a temporary address to the twitter handle
  const { identity: user_cred, tx: params } = {
    identity: { name: 'jon' },
    tx: { query: { linkTo: 'the query link' } }
  }

  //   const { identity: user_cred, tx: params } = await sdk._createTempAddress(
  //   (await signer.getAddress()).toLowerCase(),
  //   null,
  //   handle,
  //   {
  //     evm: signer,
  //     relay: true,
  //     jobID: `auth:nextid:twitter`,
  //   },
  //   "custom"
  // )

  // get a signature from PKP via Lit Action, and the Twitter profile data
  // const res = await fetch("/api/auth", {
  //   method: "POST",
  //   body: JSON.stringify({ params }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then(v => v.json())
  // if (isNil(res.sig)) {
  //   return { _user: null, id_user: null }
  // }

  // construct a relay query to send to WeaveDB
  // const relay_params = {
  //   function: "relay",
  //   query: [`auth:nextid:twitter`, params, { linkTo: params.query.linkTo }],
  //   signature: res.sig,
  //   nonce: 1,
  //   // TODO:
  //   // caller: process.env.NEXT_PUBLIC_PKP_ADDRESS.toLowerCase(),
  //   caller: "something",
  //   type: "secp256k1-2",
  // }

  // send the relay query to WeaveDB
  // const tx = {success: true} //await sdk.write("relay", relay_params)
  // if (tx.success !== true) return { _user: null, id_user: null }

  // const { profile } = res
  const profile = {
    name: 'jane',
    profile_image_url_https: 'https:placeholder'
  }

  const new_user = {
    name: profile.name,
    image: profile.profile_image_url_https,
    uid: handle,
    handle
  }
  // const user_with_cred = mergeLeft(user_cred, new_user)
  const user_with_cred = 'no'

  // // store the user data to WeaveDB users collection, if it doesn't exist
  // const wuser = "a user" // await sdk.get("users", handle)
  // if (isNil(wuser)) {
  //   // await sdk.set(new_user, "users", handle, user_with_cred)
  //   console.log("set new user on sdk")
  // }
  return { new_user, user_with_cred }
}

export async function connectWithWeaveDB(contractTxId: any) {
  // const sdk = new SDK({ contractTxId })
  // await sdk.init()
  console.log('pretend to connect with arweave sdk')
}

export async function getPubKey(identity: any) {
  const signer = '0x' // await new BrowserProvider(window.ethereum).getSigner()
  const addr = '0x' // await signer.getAddress()
  // const message = `NextID\nPlatform: twitter\nIdentity: ${identity}\nTimestamp: ${Date.now()}\nWallet Address: ${addr}`
  // const pubKey = SigningKey.recoverPublicKey(
  //   getBytes(hashMessage(message)),
  //   await signer.signMessage(message)
  // )
  // const compressed = publicKey.compress(pubKey.slice(2))
  const public_key = '0x' //`0x${compressed}`
  return { public_key, addr, signer }
}

export async function isOwner(identity: any, public_key: any) {
  // const proofs = await fetch(
  //   `https://proof-service.next.id/v1/proof?platform=twitter&identity=${identity}`
  // ).then(v => v.json())
  // for (const v of proofs.ids) {
  //   for (const v2 of v.proofs) {
  //     if (
  //       v2.platform === "twitter" &&
  //       v2.is_valid &&
  //       v2.identity.toLowerCase() === identity &&
  //       v.persona === public_key
  //     ) {
  //       return true
  //     }
  //   }
  // }
  return false
}

export async function signPayload(identity: any, public_key: any, signer: any) {
  const res = await fetch('https://proof-service.next.id/v1/proof/payload', {
    method: 'POST',
    body: JSON.stringify({
      action: 'create',
      platform: 'twitter',
      identity,
      public_key
    })
  }).then(v => v.json())
  // const sig = await signer.signMessage(res.sign_payload)
  // const base64 = Buffer.from(sig.slice(2), "hex").toString("base64")
  // const tweet = res.post_content.default
  //   .split("\n")
  //   .map((v: any) => v.replace("%SIG_BASE64%", base64))
  //   .join("\n")
  return {
    signature: '', // base64,
    uuid: '', //res.uuid,
    created_at: '', // res.created_at,
    tweet: ''
  }
}

export async function verifyProof(statusID: any, nextID: any) {
  // try {
  //   const verify = await fetch("https://proof-service.next.id/v1/proof", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       action: "create",
  //       platform: "twitter",
  //       identity: nextID.identity,
  //       public_key: nextID.public_key,
  //       proof_location: statusID,
  //       extra: { signature: nextID.signature },
  //       uuid: nextID.uuid,
  //       created_at: nextID.created_at,
  //     }),
  //   }).then(v => v.json())
  //   return isEmpty(verify)
  // } catch (e) { }
  return false
}

/*
tweet: `This is proof of my account ownership and participation in GraphID
 
▫️▫️▫️▫️▫️▫️▫️▫️▫️
 
e36ff5de2f03504f70c167759e58a95e1d779ba6f5ee460511df1406c8069107
`
*/
