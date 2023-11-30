FROM node:18.16-alpine as builder

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache && apk add --no-cache bash

RUN mkdir -p /tmp/bff-sdk-template
WORKDIR /tmp/bff-sdk-template

COPY . /tmp/bff-sdk-template/

RUN npm i pnpm @antfu/ni zx -g
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc ni --ignore-scripts --registry=http://dev-npm.tenxcloud.net

RUN chmod +x ./publish.sh
ENTRYPOINT ["sh", "publish.sh"]
