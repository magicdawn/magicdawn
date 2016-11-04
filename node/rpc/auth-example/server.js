'use strict';

const grpc = require('grpc');
const auth = grpc.load(__dirname + '/userAuth.proto').auth;
const co = require('co');
const pcb = require('promise.cb');

let i = 0;
const getAuthResult = pcb(co.wrap(function(call) {
  const token = call.request.token;
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

const server = new grpc.Server();
server.addProtoService(auth.AuthService.service, {
  getAuthResult: getAuthResult
});
server.bind('127.0.0.1:5200', grpc.ServerCredentials.createInsecure());
server.start();