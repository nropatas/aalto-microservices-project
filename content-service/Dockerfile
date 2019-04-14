FROM node:10-alpine

RUN wget https://releases.hashicorp.com/consul-template/0.20.0/consul-template_0.20.0_linux_amd64.zip && \
    unzip consul-template_0.20.0_linux_amd64.zip && \
    mv consul-template /usr/local/bin/consul-template && \
    rm consul-template_0.20.0_linux_amd64.zip && \
    mkdir -p /usr/src/common

COPY ./common /usr/src/common

WORKDIR /usr/src/app
COPY ./content-service .
RUN chmod 700 start.sh && \
    npm install

EXPOSE 8080
CMD ["npm", "start"]