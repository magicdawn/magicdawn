num: \d+
+: +
-: -
*: *
/: /
(: (
): )

expr
  : expr-l1

// 第一层只有 +-
expr-l1
  : expr-l2 + expr-l2
  | expr-l2 - expr-l2
  | expr-l2

// 第二层只有 */
expr-l2
  : expr-l3 * expr-l3
  | expr-l3 / expr-l3
  | expr-l3

// 第三层, 只有数字 or 括号表达式
expr-l3
  : num
  : '(' + expr + ')'