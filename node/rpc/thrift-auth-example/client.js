'use strict';

const co = require('co');
const pcb = require('promise.cb');
const thrift = require('thrift');
const AuthService = require('./gen-nodejs/AuthService');
const types = require('./gen-nodejs/userAuth_types');
const pify = require('promise.ify');
const _ = require('lodash');

const conn = thrift.createConnection('localhost', 5300, {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol
});
conn.on('error', console.error);

const c = thrift.createClient(AuthService, conn);
c.getAuthResultAsync = pify(c.getAuthResult, c);

const main = co.wrap(function*() {
  console.time('rpc');
  for (let i = 0; i < 10000; i++) {
    const result = yield c.getAuthResultAsync(new types.AuthRequest({
      token: 'hello world'
    }));
    // console.log(result);
  }
  console.timeEnd('rpc');
});

main().catch(e => console.error(e.stack || e));