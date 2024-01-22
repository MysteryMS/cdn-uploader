FROM node:21-alpine3.18 AS base

WORKDIR /app

COPY . /app

FROM base AS deps
RUN npm ci

FROM base as builder
RUN npm run build

FROM base as runner

CMD ["npm", "run", "start"]
