#!/usr/bin/env node

const tokenUtils = require('../lib/token-utils');

const [fn, ...args] = process.argv.slice(2);

switch (fn) {
case 'encode':
    console.log(tokenUtils.genAuthToken(args[0]));
    break;
case 'decode':
    console.log(tokenUtils.verifyAuthToken(args[0]));
    break;
default:
    console.log('Invalid function:', fn);
}
