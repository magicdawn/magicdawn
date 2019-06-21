class Node {
  constructor(stack = []) {
    // a Node is a function
    const fn = function() {}

    // make it right
    fn.__proto__ = Node.prototype

    // init
    fn.__stack__ = stack

    return fn
  }

  get __path__() {
    return this.__stack__.join('.')
  }

  add(subpath) {
    const stack = [...this.__stack__, subpath]
    return new Node(stack)
  }
}

module.exports = function createProxy(action) {
  const handler = {
    get: function(target, key, reciver) {
      const returnReal =
        ['inspect', 'name'].includes(key) ||
        typeof key === 'symbol' || // inspect
        /^__\w+__$/g.test(key) // inner __stack__ | __path__

      // return real
      if (returnReal) {
        return Reflect.get(target, key, reciver)
      }

      // return proxy
      if (!target instanceof Node) target = new Node()
      const currentNode = target.add(key)
      return new Proxy(currentNode, handler)
    },

    apply: function(target, thisArg, args) {
      if (!action) return

      const path = target.__path__
      return action({
        path,
        args,
      })
    },
  }

  const rootNode = new Node()
  const ret = new Proxy(rootNode, handler)
  return ret
}
