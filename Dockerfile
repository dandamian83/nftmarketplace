FROM node:16-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN apk add git;

RUN apk --no-cache add curl;

RUN yarn install --non-interactive

COPY $PWD/docker/entrypoint.sh /usr/local/bin

ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]