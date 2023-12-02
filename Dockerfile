FROM node:20.10.0

COPY ./ /workspace

WORKDIR /workspace

ADD sources.list /etc/apt/sources.list
RUN apt-get update 
RUN npm config set registry https://registry.npm.taobao.org && npm install -g npm 
RUN npm install -g pnpm 
RUN pnpm install