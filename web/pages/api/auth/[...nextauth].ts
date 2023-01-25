import NextAuth from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'
import { SecretsManager } from '@aws-sdk/client-secrets-manager'

const congnitoClientSecretARN = 'my/cognito/CognitoClientSecret'
let cognitoClientSecret = ''
const isDevelopment = process.env.NODE_ENV === 'development'

export default async () => {
  if (!cognitoClientSecret && !isDevelopment) {
    cognitoClientSecret = await getSecret(congnitoClientSecretARN)
  }

  return NextAuth({
    providers:
      process.env.NODE_ENV !== 'development'
        ? [
            CognitoProvider({
              clientId: process.env.COGNITO_CLIENT_ID,
              clientSecret: cognitoClientSecret,
              issuer: process.env.COGNITO_ISSUER,
            }),
          ]
        : [],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        // Only allow gmail accounts
        if (user?.email.endsWith('@gmail.com')) {
          return true
        }
        return false
      },
      async redirect({ url, baseUrl }) {
        return baseUrl
      },
      async session({ session, token, user }) {
        return session
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        return token
      },
    },
  })
}

// Helper function to get secret from AWS at runtime
export async function getSecret(secretArn: string): Promise<string> {
  const client = new SecretsManager({
    region: process.env.AWS_REGION,
  })

  return new Promise((resolve, reject) => {
    client.getSecretValue({ SecretId: secretArn }, (err, data) => {
      if (err) {
        console.log(JSON.stringify(err))
        reject(err)
        return
      }

      if ('SecretString' in data) {
        resolve(data.SecretString as string)
      } else {
        resolve(Buffer.from(data.SecretBinary as any, 'base64').toString('ascii'))
      }
    })
  })
}
