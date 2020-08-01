FROM node:10-alpine

RUN mkdir /app/
WORKDIR /app/

COPY ./ ./

RUN yarn install

ENV PORT 5000
EXPOSE $PORT

ENV NODE_ENV=production
CMD node bin/www

ARG APP_VERSION=0.1.0-snapshot
ENV APP_VERSION=$APP_VERSION
