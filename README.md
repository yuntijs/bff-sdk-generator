# bff-sdk-template

template for bff sdk

```bash
# you should npm login first or run `npm set` command first, like: npm set //dev-npm.tenxcloud.net/:_authToken=xxxxx
docker build -t kubebb/gql-sdk-generator:latest -f Dockerfile --secret id=npmrc,src=$HOME/.npmrc .
```

```bash
# you should npm login first or run `npm set` command first, like: npm set //registry.npmjs.org/:_authToken=xxxxx
docker run --rm --net=host --env GRAPH_API_ENDPOINT=http://0.0.0.0:8888/bff --env SDK_PACKAGE_NAME=@yuntijs/arcadia-bff-sdk --env SDK_YUNTI_NAME=ArcadiaBffSDK --env GRAPH_CLIENT_ENDPOINT=/kubeagi-apis/bff -v /graphql/to/path/schema:/schema -v ~/.npmrc:/root/.npmrc yuntijs/gql-sdk-generator:latest
```