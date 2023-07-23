"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  SismoConnectButton,
  SismoConnectResponse,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-react";
import {
  CONFIG,
  AUTHS,
  CLAIMS,
  SIGNATURE_REQUEST,
  AuthType,
  ClaimType,
} from "../sismo-connect-config";

const AUTH = ['github', 'twitter', 'telegram']
export default function SismoConnect({ setSearch, handleSubmit, setIsOpen }: any) {
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
    useState<SismoConnectVerifiedResult>();
  const [sismoConnectResponse, setSismoConnectResponse] = useState<SismoConnectResponse>();
  const [pageState, setPageState] = useState<string>("init");
  const [error, setError] = useState<string>("");
  const { push } = useRouter();

  return (
    <>
      <SismoConnectButton
        config={CONFIG}
        // Auths = Data Source Ownership Requests. (e.g Wallets, Github, Twitter, Github)
        auths={AUTHS}
        // Signature = user can sign a message embedded in their zk proof
        signature={SIGNATURE_REQUEST}
        text="Prove with Sismo"
        // Triggered when received Sismo Connect response from user data vault
        onResponse={async (response: SismoConnectResponse) => {
          setSismoConnectResponse(response);
          setPageState("verifying");
          const verifiedResult = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(response),
          });
          const data = await verifiedResult.json();

          if (verifiedResult.ok) {
            const auth:any = {}
            data?.auths?.forEach((item:any) => {
              auth[AUTH[item.authType]] = item.userId
            });
            handleSubmit({
              sismoId: '1',
              sismoUser: data?.auths?.[0].userId,
              authType: AUTH[data?.auths?.[0]?.authType],
            })
            setSismoConnectVerifiedResult(data);
            setSearch('')
            setIsOpen(false)
            document.location.href="/";
            setPageState("verified");
          } else {
            setPageState("error");
            setError(data);
          }
        }}
      />
    </>
  );
}

function readibleHex(userId: string, startLength = 6, endLength = 4, separator = "...") {
  if (!userId?.startsWith("0x")) {
    return userId; // Return the original string if it doesn't start with "0x"
  }
  return userId.substring(0, startLength) + separator + userId.substring(userId.length - endLength);
}

function getProofDataForAuth(
  sismoConnectResponse: SismoConnectResponse,
  authType: AuthType
): string | null {
  for (const proof of sismoConnectResponse.proofs) {
    if (proof.auths) {
      for (const auth of proof.auths) {
        if (auth.authType === authType) {
          return proof.proofData;
        }
      }
    }
  }

  return null; // returns null if no matching authType is found
}

function getProofDataForClaim(
  sismoConnectResponse: SismoConnectResponse,
  claimType: number,
  groupId: string,
  value: number
): string | null {
  for (const proof of sismoConnectResponse.proofs) {
    if (proof.claims) {
      for (const claim of proof.claims) {
        if (claim.claimType === claimType && claim.groupId === groupId && claim.value === value) {
          return proof.proofData;
        }
      }
    }
  }

  return null; // returns null if no matching claimType, groupId and value are found
}
