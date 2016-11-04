'use strict';

const request = require('superagent');
const co = require('co');


const main = co.wrap(function*() {
  const res = yield request
    .post('http://localhost')
    .field('x');
});

if (module === process.mainModule) {
  main().catch(e => console.error(e.stack || e));
}