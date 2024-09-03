# Dockerfile
FROM node:21.7.3-alpine AS base

WORKDIR /app

# update and install dependency
RUN apk update && apk upgrade

COPY package*.json .
RUN npm install

FROM base AS build

WORKDIR /app

# copy the app, note .dockerignore
COPY --from=base /app /app
COPY ../../templates/nuxt-template .

RUN npm run build
RUN npm prune

EXPOSE 3000
VOLUME /app/content

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", ".output/server/index.mjs" ]
