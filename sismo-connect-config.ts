import {
  ClaimType,
  AuthType,
  SignatureRequest,
  AuthRequest,
  ClaimRequest,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-client";

export { ClaimType, AuthType };
export const CONFIG: SismoConnectConfig = {
  appId: "0xc1ec2bb5b7f865cd7b31824c7c2c73d3",
};

// Request users to prove ownership of a Data Source (Wallet, Twitter, Github, Telegram, etc.)
export const AUTHS: AuthRequest[] = [
  { authType: AuthType.GITHUB, isOptional: true },
  { authType: AuthType.TWITTER, isOptional: true },
  { authType: AuthType.TELEGRAM, isOptional: true },
];

// Request users to prove membership in a Data Group (e.g I own a wallet that is part of a DAO, owns an NFT, etc.)
export const CLAIMS: ClaimRequest[] = [
];

// Request users to sign a message
export const SIGNATURE_REQUEST: SignatureRequest = {
  message: "signature",
  isSelectableByUser: true,
};
