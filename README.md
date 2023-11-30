# bff-sdk-template

template for bff sdk

```bash
# you should npm login first or run `npm set` command first, like: npm set //dev-npm.tenxcloud.net/:_authToken=xxxxx
docker build -t kubebb/gql-sdk-generator:latest -f Dockerfile --secret id=npmrc,src=$HOME/.npmrc .
```
