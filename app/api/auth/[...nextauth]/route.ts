// export { GET, POST } from '@/auth'
// export const runtime = 'edge'


import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

const {
    handlers: { GET, POST },
    auth,
    CSRF_experimental // will be removed in future
  } =  NextAuth({
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      // authorization: "https://id.worldcoin.org/authorize",
      issuer: 'https://id.worldcoin.org', 
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      //@ts-ignore
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          credentialType: profile["https://id.worldcoin.org/beta"].credential_type,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
    authorized({ auth }) {
      return true // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})


export { GET, POST };
