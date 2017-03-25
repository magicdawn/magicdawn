'use strict'

class ListNode {
  constructor(val, next) {
    this.val = val
    this.next = next
  }

  print() {
    let ret = []
    let cur = this
    while (cur) {
      ret.push(cur.val)
      cur = cur.next
    }
    const str = ret.join(' -> ')
    console.log(str)
  }

  reverse() {
    let head = this
    let fi = this

    while (fi.next) {
      const next = fi.next
      fi.next = fi.next.next
      next.next = head
      head = next
    }

    return head
  }

  reverse2() {
    // last
    if (!this.next) {
      return this
    }

    // reverse left
    const result = this.next.reverse2()

    // append self to end
    this.next.next = this
    this.next = null

    return result
  }
}

ListNode.make = function() {
  let l = new ListNode('0')
  let i = 0
  while (i < 9) {
    l = new ListNode(++i, l)
  }
  return l
}

ListNode.make().print()
ListNode.make().reverse().print()
ListNode.make().reverse2().print()