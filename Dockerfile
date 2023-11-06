FROM node:21-alpine3.17

WORKDIR /app
COPY package*.json ./
RUN npm ci --quiet

COPY ./prisma prisma
COPY ./src src
RUN npm run build
EXPOSE 8888

CMD [ "npm" , "start" ]