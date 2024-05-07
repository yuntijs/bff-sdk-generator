import { CodegenConfig } from "@graphql-codegen/cli";

const endpoint = process.env.GRAPH_API_ENDPOINT;
const useSWRInfiniteConfig = process.env.CONFIG_USE_SWR_INFINITE;

const config: CodegenConfig = {
  schema: endpoint,
  documents: [
    "/schema/*.gql",
    "/schema/**/*.gql",
  ],
  generates: {
    "./src/sdk.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
        "plugin-typescript-swr",
      ],
    },
  },
  config: {
    autogenSWRKey: true,
    useSWRInfinite: useSWRInfiniteConfig?.split(',')
  },
};

export default config;
