const createProxy = require('./create-proxy.js')

const rpc = createProxy(async ({path, args}) => {
  console.log('------------')
  console.log(`rpc calling ${path}(${args.join(',')})`)
  console.log('------------')
})

p = rpc.some.method(1, 2)
console.log(p)

/*
------------
rpc calling some.method(1,2)
------------
Promise { undefined }
*/
