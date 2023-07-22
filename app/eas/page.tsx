import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

const offchain = await eas.getOffchain();

// Initialize SchemaEncoder with the schema string
const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
const encodedData = schemaEncoder.encodeData([
  { name: "eventId", value: 1, type: "uint256" },
  { name: "voteIndex", value: 1, type: "uint8" },
]);

const privateKey = '78f847335d13b4ddf6e2e279515f48d2246256bd910b4f007fa3e6ac16e7887a';
// Signer is an ethers.js Signer instance
const provider = ethers.getDefaultProvider();  // or use a specific provider like ethers.providers.InfuraProvider
const signer = new ethers.Wallet(privateKey, provider);

const offchainAttestation = await offchain.signOffchainAttestation({
  recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
  // Unix timestamp of when attestation expires. (0 for no expiration)
  expirationTime: 0,
  // Unix timestamp of current time
  time: 1671219636,
  revocable: true,
  nonce: 0,
  schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
  refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
  data: encodedData,
}, signer);