FROM --platform=linux/amd64 node:18.16-alpine as builder

ARG sdk_package_name
ARG sdk_yunti_name
ENV SDK_PACKAGE_NAME=${sdk_package_name}
ENV SDK_YUNTI_NAME=${sdk_yunti_name}

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache && apk add --no-cache bash

RUN mkdir -p /tmp/bff-sdk-template
WORKDIR /tmp/bff-sdk-template

COPY . /tmp/bff-sdk-template/

ARG _authToken

RUN npm set //dev-npm.tenxcloud.net/:_authToken="${_authToken}" \
  && npm i pnpm @antfu/ni zx -g \
  && ni --ignore-scripts

RUN chmod +x ./publish.sh
ENTRYPOINT ["sh", "publish.sh"]
