import { SSTConfig } from "sst";
import { NextJS13Stack } from "./stacks/WebStack";

export default {
  config(_input) {
    return {
      name: "patrickufer-next13-sst-node16",
      region: "us-east-1",
      profile: "rtatlanta",
      stage: "dev",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      // permissions: ["secretsmanager:GetSecretValue"],
      runtime: "nodejs16.x",
      architecture: "x86_64",
    });
    app.stack(NextJS13Stack);
  },
} satisfies SSTConfig;
