const {graphql, buildSchema} = require('graphql')

var schema = buildSchema(`
  type Query{
    hello: String
  }
`)

var root = {
  hello() {
    return 'world'
  },
}

async function main() {
  const res = await graphql(
    schema,
    `
      {
        hello
      }
    `,
    root
  )

  console.log(res)
}

if (module === process.mainModule) {
  main()
}
