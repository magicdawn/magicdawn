'use strict';

const asyncHandler = {
  get: function(target, key, receiver) {
    // console.log('key = %s', key);

    if (!/Async$/.test(key)) {
      const ret = Reflect.get(target, key, receiver);
      // 是个对象
      if (typeof ret === 'object') {
        return new Proxy(ret, asyncHandler);
      }
      // 其他值
      return ret;
    }

    let m = key.replace(/Async$/, '');
    m = Reflect.get(target, m, receiver);
    if (typeof m !== 'function') {
      throw new Error(`${ m } is not a function`);
    }

    return function(...args) {
      return new Promise((resolve, reject) => {
        args.push(function(err, result) {
          if (err) return reject(err);
          resolve(result);
        });
        m.apply(receiver, args);
      });
    };
  }
};

const original = {
  name: 'foobar',
  foo: {
    bar: cb => {
      cb(null, 'foo.bar');
    }
  },
  hello: cb => {
    cb(null, 'hello');
  }
};

const t = new Proxy(original, asyncHandler);
t.helloAsync().then(console.log, console.error);
t.foo.barAsync().then(console.log, console.error);
