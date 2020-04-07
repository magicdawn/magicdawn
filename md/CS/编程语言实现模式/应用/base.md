## 基础

```js
const stringWidth = require('string-width')
const _repeat = require('lodash/repeat')
const _padStart = require('lodash/padStart')
const debugFactory = require('debug')

const DEFAULT_FILENAME = 'unknown.file'

class BaseLexer {
  constructor(input, filename) {
    this.originalInput = input.replace(/\r\n|\r/g, '\n')
    this.input = this.originalInput
    this.filename = filename || DEFAULT_FILENAME

    this.lineno = 1
    this.cursor = 0

    this.assertExpression = this.assertExpression.bind(this)
    this.assertCode = this.assertCode.bind(this)

    this.debug = debugFactory('BaseLexer')
  }

  consume(len) {
    this.input = this.input.substr(len)
    this.cursor += len
    return this
  }

  tok(type, val) {
    return {
      type,
      val,
      lineno: this.lineno,
      pos: this.cursor,
    }
  }

  scan(reg, type, assert) {
    const captures = reg.exec(this.input)
    this.debug('captures = %j', captures)
    if (captures) {
      const val = captures[1]
      assert && assert(val)

      // tok(pos) > consume
      const tok = this.tok(type, val)
      this.consume(captures[0].length)
      return tok
    }
  }

  eos() {
    if (this.input.length) return
    return this.tok('eos')
  }

  lex() {
    this.tokens = []
    let cur
    while (((cur = this.next()), cur.type !== 'eos')) {
      // console.log(cur)
      this.tokens.push(cur)
    }
    return this.tokens
  }

  fail() {
    throw this.error('unexpected input found')
  }

  error(message, pos) {
    return new SyntaxError(message, {
      input: this.originalInput,
      filename: this.filename,
      pos: pos || this.cursor,
    })
  }

  assertExpression(expr) {
    try {
      Function('', `return (${expr})`)
    } catch (e) {
      throw this.error('bad expression')
    }
  }

  assertCode(code) {
    try {
      Function('', code)
    } catch (e) {
      throw this.error('bad js code')
    }
  }
}

class BaseParser {
  constructor(input, filename, included) {
    this.input = input
    this.filename = filename
  }

  consume(n) {
    this.tokens = this.tokens.slice(n)
  }

  cur() {
    return (
      this.tokens[0] || {
        type: 'eos',
        val: 'end of stream',
      }
    )
  }

  expect(type, val) {
    const tok = this.cur() || {
      type: 'eos',
      pos: this.input.length - 1,
      lineno: this.input.split(/\n/).length,
    }

    // assert type
    if (tok.type !== type) {
      const msg = `unexpected token on line ${
        tok.lineno
      }, expect ${type} but see ${tok.type}`
      throw this.error(msg, tok.pos) // throw new Error(msg)
    }

    // assert val
    if (val && tok.val !== val) {
      const msg = `unexpected token ${type} value on line ${
        tok.lineno
      }, expect ${val} but see ${tok.val}`
      throw this.error(msg, tok.pos) // throw new Error(msg)
    }

    return tok
  }

  parse() {
    if (!this.lexer) {
      throw new Error(
        'this.lexer not found, U should init your Lexer in constructor'
      )
    }

    this.originalTokens = this.lexer.lex()
    this.tokens = this.originalTokens.slice(0)
  }
}

class SyntaxError extends Error {
  constructor(message, options) {
    super(message)
    Error.captureStackTrace(this)

    options = options || {}
    this.input = options.input
    this.filename = options.filename || DEFAULT_FILENAME
    this.pos = options.pos

    const tuple = this._pos()
    this.lineno = tuple[0]
    this.colno = tuple[1]

    const arr = [
      `File ${this.filename}, line ${this.lineno} column ${this.colno}`,
    ]
    for (
      let i = this.lineno;
      i <= Math.min(this.lineno + 2, this.lines.length);
      i++
    ) {
      const content = this.lines[i - 1].replace(/\t/, '    ') // 4 space
      arr.push(`${_padStart(i.toString(), 4, ' ')}|${content}`)

      // indicator
      if (i === this.lineno) {
        const indent = _repeat(
          ' ',
          stringWidth(content.slice(0, this.colno - 1))
        )
        arr.push(`${_repeat(' ', 4)}|${indent}^`)
      }
    }

    this.stack = arr.join('\n') + '\n\n' + this.stack
  }

  _pos() {
    this.lines = this.input.split(/\n/)
    const lens = this.lines.map(l => l.length + 1)

    let lineno = 1
    let colno = this.pos + 1 // pos 0 based

    while (colno > lens[lineno - 1]) {
      colno -= lens[lineno - 1]
      lineno++
    }

    return [lineno, colno]
  }
}

/**
 * 给其他类使用
 * SomeClass#error
 */

function error(message, pos) {
  return new SyntaxError(message, {
    input: this.input,
    filename: this.filename,
    pos,
  })
}

BaseParser.prototype.error = error

module.exports = {
  BaseLexer,
  BaseParser,
  SyntaxError,
  error,
}
```

- 定义 `FooLexer extends BaseLexer`

- Parser.constructor 里得初始化 `this.lexer = new FooLexer`
- Parser.parse 定义 parse 过程, 使用 `super.parse()` 初始化 tokens 等
