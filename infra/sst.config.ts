import { SSTConfig } from 'sst'
import { TimDocsWeb } from './stacks/WebStack'

export default {
  config(_input) {
    return {
      name: 'tim-docs-app',
      region: 'us-east-1',
      profile: 'demo',
      stage: 'prod',
    }
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      permissions: ['secretsmanager:GetSecretValue'],
      runtime: 'nodejs18.x',
      architecture: 'x86_64',
    })
    app.stack(TimDocsWeb)
  },
} satisfies SSTConfig
