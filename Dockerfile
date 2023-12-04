FROM node:21-alpine3.17

WORKDIR /usr/src/app
COPY package.json .
COPY . .
RUN npm install --quiet