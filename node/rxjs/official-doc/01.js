const Rx = require('rxjs')

var foo = Rx.Observable.create(function(observer) {
  console.log('Hello')
  observer.next(42)
  observer.next(100)
  observer.next(200)
  setTimeout(() => {
    observer.next(300) // 异步执行
  }, 1000)
})

console.log('before')
foo.subscribe(function(x) {
  console.log(x)
})
console.log('after')
