FROM node:10.18.0-alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .

RUN npm --prefix client install