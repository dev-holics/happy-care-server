FROM node:16.16.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN touch .env

RUN yarn build

EXPOSE 3000

CMD yarn start:prod
