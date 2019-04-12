FROM node:10-alpine

RUN mkdir -p /usr/src/common
COPY ./common /usr/src/common

WORKDIR /usr/src/app
COPY ./subscription-service .
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]