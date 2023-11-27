FROM node:16.20.2

COPY ./ /WORKSPACE

WORKDIR /WORKSPACE

RUN apt-get update && npm install -g pnpm && pnpm install
