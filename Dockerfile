FROM node:20.10.0

COPY ./ /workspace

WORKDIR /workspace

ADD sources.list /etc/apt/
RUN sed -i "s@http://deb.debian.org@http://mirrors.aliyun.com@g" /etc/apt/sources.list
RUN cat /etc/apt/sources.list
RUN rm -Rf /var/lib/apt/lists/*
RUN apt-get update 
RUN npm config set registry https://registry.npm.taobao.org && npm install -g npm 
RUN npm install -g pnpm 
RUN pnpm install