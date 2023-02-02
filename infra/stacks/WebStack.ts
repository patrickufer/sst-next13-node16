import { StackContext, NextjsSite } from "sst/constructs";

export function NextJS13Stack({ stack, app }: StackContext) {
  const site = new NextjsSite(stack, "Site", {
    path: "../web",
    environment: {
      // Pass (non-sensitive) environment variables to our app here
      NODE_ENV: "production",
    },
  });

  stack.addOutputs({
    NextjsSite: site.url,
  });
}
