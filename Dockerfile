FROM node:18.16-alpine as builder

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache && apk add --no-cache bash

RUN mkdir -p /tmp/bff-sdk-generator
WORKDIR /tmp/bff-sdk-generator

COPY . /tmp/bff-sdk-generator/

# Enable this line to use npm mirror in China
# RUN npm set registry https://registry.npmmirror.com/

RUN npm i pnpm @antfu/ni zx cnpm -g
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc ni --ignore-scripts

RUN chmod +x ./publish.sh
ENTRYPOINT ["sh", "publish.sh"]
