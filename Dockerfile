FROM node:21-alpine3.18 AS base

WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run build


CMD ["npm", "run", "start"]
