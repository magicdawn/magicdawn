const {BaseLexer, BaseParser} = require('./base')

class Lexer extends BaseLexer {
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
    const tok = this.scan(/^ *?(\d+) *?/, 'num')
    if (tok) {
      tok.val = Number(tok.val)
    }
    return tok
  }

  operator() {
    return this.scan(/^ *?([\+\-\*\/]) *?/, 'operator')
  }

  brace() {
    return this.scan(/^ *?([\(\)]) *?/, 'brace')
  }
}

class Parser extends BaseParser {
  constructor(input, filename) {
    super(input, filename)
    this.lexer = new Lexer(input, filename)
  }

  parse() {
    super.parse()
    const expr = this.parseExpr()
    return expr
  }

  // expr
  //   : expr-l1
  //
  // // 第一层只有 +-
  // expr-l1
  //   : expr-l2 (+|- expr-l2)*
  //
  // // 第二层只有 */
  // expr-l2
  //   : expr-l3 (*|/ expr-l3)*
  //
  // // 第三层, 只有数字 or 括号表达式
  // expr-l3
  //   : num
  //   : '(' + expr-l1 + ')'
  parseExpr() {
    return this.parseExprL1()
  }

  parseExprL1() {
    const ret = {
      type: 'expr-l1',
      nodes: [],
    }
    const left = this.parseExprL2()
    ret.nodes.push(left)

    const hasRight = () =>
      this.cur().type === 'operator' && ['+', '-'].includes(this.cur().val)

    while (hasRight()) {
      // op
      const operator = this.cur()
      ret.nodes.push(operator)
      this.consume(1)

      // right
      const right = this.parseExprL2()
      ret.nodes.push(right)
    }

    return ret
  }

  parseExprL2() {
    const ret = {
      type: 'expr-l2',
      nodes: [],
    }
    const left = this.parseExprL3()
    ret.nodes.push(left)

    const hasRight = () =>
      this.cur().type === 'operator' && ['*', '/'].includes(this.cur().val)

    while (hasRight()) {
      // op
      const operator = this.cur()
      ret.nodes.push(operator)
      this.consume(1)

      // right
      const right = this.parseExprL3()
      ret.nodes.push(right)
    }

    return ret
  }

  parseExprL3() {
    const ret = {
      type: 'expr-l3',
      val: '',
      nodes: [],
    }

    if (this.cur().type === 'num') {
      ret.type = 'num'
      ret.val = this.cur().val
      this.consume(1)
      return ret
    }

    if (this.cur().type === 'brace') {
      this.expect('brace', '(')
      this.consume(1)

      const exprInBrace = this.parseExprL1()

      this.expect('brace', ')')
      this.consume(1)

      return exprInBrace
    }

    throw this.error('expect num or brace', this.cur().pos)
  }
}

module.exports = {Lexer, Parser}
