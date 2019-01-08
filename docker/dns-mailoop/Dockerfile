FROM node:10-stretch

COPY . /dns-mailoop

RUN cd /dns-mailoop && \
    yarn install && \
    yarn cache clean

WORKDIR /dns-mailoop

ENV PORT 53
ENV HOST 0.0.0.0

CMD exec node index.js

EXPOSE 53
