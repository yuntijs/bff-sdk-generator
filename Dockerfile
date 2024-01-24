FROM node:18.16-alpine as builder

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache && apk add --no-cache bash

RUN mkdir -p /tmp/bff-sdk-generator
WORKDIR /tmp/bff-sdk-generator

COPY . /tmp/bff-sdk-generator/

RUN npm i pnpm @antfu/ni zx cnpm -g --registry=https://registry.npmmirror.com
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc ni --ignore-scripts --registry=http://dev-npm.tenxcloud.net

RUN chmod +x ./publish.sh
ENTRYPOINT ["sh", "publish.sh"]
