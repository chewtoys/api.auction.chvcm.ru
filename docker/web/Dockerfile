FROM node:10-alpine as builder

ARG RECAPTCHA_SITE

COPY . /alendo-api.auction.chvcm.ru

RUN apk add --no-cache --virtual .gyp python make g++ git && \
    cd /alendo-api.auction.chvcm.ru && \
    yarn install --production false --frozen-lockfile && \
    yarn heroku-postbuild && \
    yarn install --production true --frozen-lockfile --prefer-offline && \
    yarn cache clean && \
    apk del .gyp

WORKDIR /alendo-api.auction.chvcm.ru

ENV PORT 80
ENV HOST 0.0.0.0

CMD exec node dist/bin/web.js

EXPOSE 80
