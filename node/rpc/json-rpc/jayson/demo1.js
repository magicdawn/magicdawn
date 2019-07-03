const jayson = require('jayson/promise')
const _ = require('lodash')

function collapse(stem, sep) {
  return function(map, value, key) {
    key = _.camelCase(key)
    var prop = stem ? stem + sep + key : key
    if (_.isFunction(value)) map[prop] = value
    else if (_.isObject(value)) map = _.reduce(value, collapse(prop, sep), map)
    return map
  }
}

const methods = require('./server/index.js')
const methodsMap = _.reduce(methods, collapse('', '.'), {})
// console.log(methods)
// console.log(methodsMap)

const server = jayson.Server(methodsMap)
server.http().listen(3000)

const client = jayson.client.http({
  port: 3000,
})

const createProxy = require('../../../proxy/rpc/create-proxy.js')
const rpc = createProxy(async ({path, args}) => {
  if (args.length > 1) {
    throw new Error('params.length should be 1 or 0')
  }

  var arg = args[0]
  // https://www.jsonrpc.org/specification#parameter_structures
  // by-position: params MUST be an Array, containing the values in the Server expected order.
  // by-name: params MUST be an Object,
  if (arg && !(Array.isArray(arg) || typeof arg === 'object')) {
    throw new Error('params must be Array or Object')
  }

  return client.request(path, arg)
})

rpc.foo.fooChild1([1, 2]).then(console.log)
rpc.foo.fooChild1([1]).then(console.log)

rpc.hello.world([1]).then(console.log)
rpc.test.serverError().then(console.log)
