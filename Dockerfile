# Build
FROM node:16-alpine AS builder

USER node

WORKDIR /usr/app

COPY --chown=node . .

RUN yarn install --frozen-lockfile

RUN yarn build

# Runner
FROM node:16-alpine

USER node

WORKDIR /usr/app

COPY --from=builder --chown=node /usr/app/node_modules ./node_modules

COPY --from=builder --chown=node /usr/app/dist ./dist

COPY --from=builder --chown=node /usr/app/package.json .

EXPOSE 8080

ENTRYPOINT [ "yarn", "start:prod" ]