#!/bin/sh

consul-template -consul-addr=$CONSUL_ADDR:8500 -template="development.tpl:config/development.yml:touch app.js" &
npm run start-dev