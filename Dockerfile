FROM node:18.16-alpine as builder

ARG sdk_package_name
ARG sdk_yunti_name
ENV SDK_PACKAGE_NAME=${sdk_package_name}
ENV SDK_YUNTI_NAME=${sdk_yunti_name}

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache && apk add --no-cache bash

RUN mkdir -p /tmp/bff-sdk-template
WORKDIR /tmp/bff-sdk-template

COPY . /tmp/bff-sdk-template/

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm i pnpm @antfu/ni zx -g
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc ni --ignore-scripts --registry=http://dev-npm.tenxcloud.net

RUN chmod +x ./publish.sh
ENTRYPOINT ["sh", "publish.sh"]
