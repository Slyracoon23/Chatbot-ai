import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Auth02Provider from 'next-auth/providers/auth0'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
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
     jwt({ token }) {
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
