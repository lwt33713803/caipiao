FROM node:20.10-alpine3.18

COPY ./ /workspace

WORKDIR /workspace

RUN apt-get update 
RUN npm config set registry https://registry.npm.taobao.org && npm install -g npm 
RUN npm install -g pnpm 
RUN pnpm install