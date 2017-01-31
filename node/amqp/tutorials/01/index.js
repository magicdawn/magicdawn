'use strict'

/**
 * Module dependencies
 */

const co = require('co')
const amqp = require('amqplib')

const ERROR_HANDLER = e => console.error(e.stack || e)

const main = co.wrap(function*() {
  const conn = yield amqp.connect('amqp://localhost')
  const ch = yield conn.createChannel()

  const queue = 'hello'
  ch.assertQueue(queue, {
    durable: false
  })

  ch.sendToQueue(queue, Buffer.from('你好啊'))

  ch.consume(queue, (msg) => {
    console.log('received: ', msg.content.toString())
  }, {
    noAck: true
  })

  setTimeout(() => {
    // conn.close()
  }, 1000 * 30)
})

main().catch(ERROR_HANDLER)