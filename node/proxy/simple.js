'use strict';

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

const t = new Proxy(original, {
  get: function(target, key, receiver) {
    console.log('key = %s', key);

    // console.log(target === original); // true
    // console.log(t === receiver); // true

    if (!/Async$/.test(key)) {
      return Reflect.get(target, key, receiver);
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
});

// console.log(t.hello);
// console.log(t.helloAsync);

// t.hello(console.log); // err, result := null, 'hello'
// t.helloAsync().then(console.log, console.error); // hello

console.log(t.foo.bar);
console.log(t.foo.barAsync);