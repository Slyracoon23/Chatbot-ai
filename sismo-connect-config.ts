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
  // vaultAppBaseUrl: "https://graphid.vercel.app/",
  // vault: {
  //   // For development purposes insert the Data Sources that you want to impersonate
  //   // Never use this in production
  //   // impersonate: [
  //   //         // Github Data Source
  //   //         "github:asyaasha",
  //   //         // Twitter Data Source
  //   //         "twitter:asiya_asha",
  //   //         // Telegram Data Source
  //   //         "telegram:asiyaasha",
  //   // ],
  // },
  // displayRawResponse: true, // this enables you to get access directly to the
  // Sismo Connect Response in the vault instead of redirecting back to the app
};

// Request users to prove ownership of a Data Source (Wallet, Twitter, Github, Telegram, etc.)
export const AUTHS: AuthRequest[] = [
  // Anonymous identifier of the vault for this app
  // vaultId = hash(vaultSecret, appId).
  // full docs: https://docs.sismo.io/sismo-docs/build-with-sismo-connect/technical-documentation/vault-and-proof-identifiers
  // { authType: AuthType.VAULT },
  // { authType: AuthType.EVM_ACCOUNT },
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
