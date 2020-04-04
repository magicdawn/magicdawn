class JadeStyleLexer {
  constructor(input, filename) {
    this.originalInput = input.replace(/\r\n|\r/g, '\n')
    this.input = this.originalInput
    this.filename = filename

    this.lineno = 1
    this.cursor = 0

    this.assertExpression = this.assertExpression.bind(this)
    this.assertCode = this.assertCode.bind(this)
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
    debug('captures = %j', captures)
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

  error(message, pos) {
    return new RactSyntaxError(message, {
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

class Lexer extends JadeStyleLexer {
  constructor(...args) {
    super(...args)
  }

  // num: \d+
  // +: +
  // -: -
  // *: *
  // /: /
  // (: (
  // ): )
  next() {
    return (
      this.eos() || this.num() || this.operator() || this.brace() || this.fail()
    )
  }

  num() {
    const tok = this.scan(/^\d+/, 'num')
    tok.val = Number(tok.val)
    return tok
  }

  operator() {
    return this.scan(/^[+-*/]/, 'operator')
  }

  brace() {
    return this.scan(/^[()]/, 'brace')
  }
}

const Parser = (module.exports = class Parser {
  constructor(input, filename, included) {
    this.input = input
    this.filename = filename
    this.lexer = new Lexer(input, filename)
  }

  consume(n) {
    this.tokens = this.tokens.slice(n)
  }

  cur() {
    return this.tokens[0]
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
    this.originalTokens = this.lexer.lex()
    this.tokens = this.originalTokens.slice(0)
    this.file = new nodes.File(this.filename)

    while (this.tokens.length) {
      const n = this.parseExpr()
    }

    return this.file
  }

  // expr
  //   : expr-l1
  //
  // // 第一层只有 +-
  // expr-l1
  //   : expr-l2 + expr-l2
  //   | expr-l2 - expr-l2
  //   | expr-l2
  //
  // // 第二层只有 */
  // expr-l2
  //   : expr-l3 * expr-l3
  //   | expr-l3 / expr-l3
  //   | expr-l3
  //
  // // 第三层, 只有数字 or 括号表达式
  // expr-l3
  //   : num
  //   : '(' + expr + ')'
  parseExpr() {
    return this.parseExprL1()
  }
  parseExprL1() {
    const left = this.parseExprL2()

    // TODO: fix this
    // TODO: fix this
    // TODO: fix this
    if (
      this.cur().type === 'operator' &&
      ['+', '-'].includes(this.cur().type)
    ) {
      this.consume(1)
      const right = this.parseExprL2()
    }
    throw new Error('unexpected')
  }
  parseExprL2() {
    const left = this.parseExprL3()

    if (
      this.cur().type === 'operator' &&
      ['*', '/'].includes(this.cur().type)
    ) {
      this.consume(1)
      const right = this.parseExprL3()
    }

    throw new Error('unexpected')
  }
  parseExprL3() {
    const ret = {
      type: 'expr-l3',
      val: '',
    }

    if (this.cur().type === 'num') {
      ret.val = this.cur().val
      this.consume(1)
      return ret
    }

    if (this.cur().type === 'brace') {
      // ret.nodes =
    }
  }
})
