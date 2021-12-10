
FROM node:16-bullseye AS builder
LABEL maintainer="datapunt@amsterdam.nl"

ARG BUILD_ENV=prod
ARG BUILD_NUMBER=0
WORKDIR /app

COPY src /app/src
COPY internals /app/internals
COPY server /app/server

COPY package.json \
  package-lock.json \
  .eslintrc.js \
  .gitignore \
  .gitattributes \
  tsconfig.json \
  jest.config.js \
  .babelrc \
  /app/

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:


# Install NPM dependencies. Also:
RUN npm --production=false \
  --unsafe-perm \
  --verbose \
  install
RUN npm cache clean --force

# Test 
FROM builder as test
RUN npm run test

# Build
FROM builder as build
RUN npm run build

# Deploy
FROM nginx:stable-alpine
COPY --from=build /app/build/. /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/
