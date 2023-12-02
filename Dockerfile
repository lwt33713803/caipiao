FROM node:20.10.0

COPY ./ /workspace

WORKDIR /workspace


RUN  sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN apt-get update 
RUN npm config set registry https://registry.npm.taobao.org && npm install -g npm 
RUN npm install -g pnpm 
RUN pnpm install