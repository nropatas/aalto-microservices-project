FROM node:10-alpine

WORKDIR /usr/src/app
COPY ./user-service .
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]