// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js'
// )

const version = 'latest'
importScripts(`https://cdn.jsdelivr.net/npm/workbox-sw@${version}`)
workbox.setConfig({
  modulePathCb(name, debug) {
    const env = debug ? 'dev' : 'prod'
    return `https://cdn.jsdelivr.net/npm/${name}@${version}/build/${name}.${env}.js`
  },
})

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}

workbox.core.skipWaiting()
workbox.core.clientsClaim()

const route = workbox.routing.registerRoute
const {
  StaleWhileRevalidate,
  NetworkFirst,
  CacheFirst,
  NetworkOnly,
  CacheOnly,
} = workbox.strategies

// ltc
route(
  /\/traffic\/static\/(js|css|fonts|media)\/.+\.[\w\d]+\.(js|css|png|jpg|swf|ttf|eot|woff|woff2)/i,
  new CacheFirst()
)

// index.html
route('/traffic/', new NetworkFirst())
