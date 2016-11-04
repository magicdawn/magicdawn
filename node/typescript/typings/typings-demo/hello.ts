/// <reference path="typings/index.d.ts" />

import Koa = require('koa')

const app = new Koa();

app.use(function () {
  if (name === 'console') {
    console.log('Your name is %s', this.name);
  }
});