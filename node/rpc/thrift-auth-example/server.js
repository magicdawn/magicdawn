'use strict';
const co = require('co');
const pcb = require('promise.cb');
const thrift = require('thrift');
const AuthService = require('./gen-nodejs/AuthService');
const types = require('./gen-nodejs/userAuth_types');

let i = 0;
const getAuthResult = pcb(co.wrap(function(req) {
  const token = req.token;
  console.log('calling, token = %s', token);

  if (i++ % 2 === 0) {
    return {
      success: false,
      error: {
        code: 'ERROR_CODE',
        message: 'error message'
      }
    };

  } else {
    return {
      success: true,
      data: {
        uid: 'hello'
      }
    };
  }
}));

const server = thrift.createServer(AuthService, {
  getAuthResult: getAuthResult
}, {});

server.listen(5300);