FROM node:20.10-alpine3.18

COPY ./ /workspace

WORKDIR /workspace

RUN npm install -g npm 
RUN npm install -g pnpm 
RUN pnpm install