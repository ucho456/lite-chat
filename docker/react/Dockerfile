FROM node:16.15.1-slim

ENV TZ Asia/Tokyo

WORKDIR /app

COPY ../../package*.json ./
RUN npm install

COPY ../../ .

RUN apt-get update \
    && apt-get install -y
