import { StackContext, NextjsSite } from 'sst/constructs'

export function TimDocsWeb({ stack, app }: StackContext) {
  const site = new NextjsSite(stack, 'Site', {
    path: '../web',
    environment: {
      // Pass (non-sensitive) environment variables to our app here
      COGNITO_CLIENT_ID: '',
      COGNITO_ISSUER: '',
      NODE_ENV: 'production',
    },
  })

  site.attachPermissions(['secretsmanager'])

  stack.addOutputs({
    NextjsSite: site.url,
  })
}
