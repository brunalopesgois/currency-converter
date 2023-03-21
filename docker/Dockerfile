# Build
FROM node:16-alpine

WORKDIR /usr/app

COPY package.json .

COPY yarn.lock .

COPY . .

RUN yarn install --quiet

RUN yarn build

COPY . .

USER node

EXPOSE 3000

ENTRYPOINT [ "yarn", "start:prod" ]