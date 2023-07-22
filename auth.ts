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
    // GitHub,
    Auth02Provider({
      id: 'worldcoin',
      name: 'worldcoin',
      wellKnown: 'https://id.worldcoin.org/.well-known/openid-configuration',
      authorization: "https://id.worldcoin.org/authorize",
      issuer: 'https://id.worldcoin.org', 
      clientId: 'app_ae12796fe25aa0e49f21304075b405a4',
      clientSecret: 'sk_739db7c673a1732f7e29e8de22326d81364936d123891b88',
      profile: profile => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id
        token.image = profile.picture
      }
      return token
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
