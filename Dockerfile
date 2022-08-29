FROM node:16-alpine

ENV privateKey='ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN apk add git;

RUN apk --no-cache add curl;

RUN yarn install --non-interactive

COPY $PWD/docker/entrypoint.sh /usr/local/bin

ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]