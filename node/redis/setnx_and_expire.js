'use strict';

const fs = require('fs');
const R = require('ramda');
const read = R.curry(fs.readFileSync)(R.__, 'utf8');
const redis = new (require('ioredis'))();
const co = require('co');
const lua = read(__dirname + '/lua/setnx_and_expire.lua');

redis.defineCommand('setnx_and_expire', {
  lua,
  numberOfKeys: 1,
});

// This will define a command echo:
redis.defineCommand('echo', {
  numberOfKeys: 2,
  lua: 'return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}'
});

const main = co.wrap(function* () {
  let result;

  result = yield redis.echo('k1', 'k2', 'a1', 'a2');
  console.log(result);

  result = yield redis.setnx_and_expire('key', 'value', 100);
  console.log(result);
});

if (module === process.mainModule) {
  main().catch(e => console.error(e.stack || e));
}