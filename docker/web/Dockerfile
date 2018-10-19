FROM node:8-stretch

COPY . /alendo-api.auction.chvcm.ru

RUN apt-get install libpq-dev && \
    cd /alendo-api.auction.chvcm.ru && \
    yarn install && \
    yarn cache clean

WORKDIR /alendo-api.auction.chvcm.ru

ENV PORT 80
ENV HOST 0.0.0.0

CMD exec node dist/bin/web.js

EXPOSE 80
