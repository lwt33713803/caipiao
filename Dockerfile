FROM node:20.10.0

COPY ./ /workspace

WORKDIR /workspace

RUN apt-get update && npm config set registry https://registry.npm.taobao.org && npm install -g npm && npm install -g pnpm && pnpm install
