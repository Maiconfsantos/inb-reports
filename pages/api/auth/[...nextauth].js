import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: 'Credential',
      authorize: async(credentials) =>{
        const user = { name: credentials.username, password: credentials.password }
        console.log('user')
        if(user){
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }

    })
  ],
  pages: {
    signIn: '/logon', 
    //signOut: '/api/auth/signout', // Displays form with sign out button
    //error: '/api/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/api/auth/verify-request', // Used for check email page
    //newUser: null // If set, new users will be directed here on first sign in
  },
  session: { jwt: false },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = (user) ? true : false
      // Add auth_time to token on signin in
      if (isSignIn) { 
        token.auth_time = Math.floor(Date.now() / 1000)
        token.username = user.user;
      }

      //console.log(token)
      return (Promise.resolve(token))
    }

  }
}

export default (req, res) => NextAuth(req, res, options)