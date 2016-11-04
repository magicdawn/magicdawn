'use strict';

const grpc = require('grpc');
const auth = grpc.load(__dirname + '/userAuth.proto').auth;
const co = require('co');
const pify = require('promise.ify');
const _ = require('lodash');
const c = new auth.AuthService('127.0.0.1:5200', grpc.credentials.createInsecure());
c.getAuthResultAsync = pify(c.getAuthResult, c);

const main = co.wrap(function*() {
  console.time('rpc');
  for (let i = 0; i < 10000; i++) {
    const result = yield c.getAuthResultAsync({
      token: 'hello world'
    });
    // console.log(result);
  }
  console.timeEnd('rpc');
});

main().catch(e => console.error(e.stack || e));