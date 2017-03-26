'use strict'
/* global ListNode */

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function(l1, l2) {
  // l1 = l1.reverse()
  // l2 = l2.reverse()

  let prev = 0
  const arr = []
  while (l1 || l2 || prev) {
    const val1 = (l1 && l1.val) || 0
    const val2 = (l2 && l2.val) || 0
    const val = val1 + val2 + prev
    const cur = val % 10
    prev = Math.floor(val / 10)
    arr.push(cur)
    l1 = l1 && l1.next
    l2 = l2 && l2.next
  }
  return ListNode.fromArray(arr)
}

ListNode.prototype.reverse = function() {
  let l = this
  if (!l || !l.next) return l
  const result = l.next.reverse()
  l.next.next = l
  l.next = null
  return result
}

ListNode.fromArray = function(arr) {
  let head
  for (let i = arr.length - 1; i >= 0; i--) {
    const val = arr[i]
    const node = new ListNode(val)
    node.next = head
    head = node
  }
  return head
}

ListNode.prototype.print = function() {
  const arr = []
  let cur = this
  while (cur) {
    arr.push(cur.val)
    cur = cur.next
  }
  const str = arr.join(' -> ')
  console.log(str)
}

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// const l1 = ListNode.fromArray([2, 4, 3])
// const l2 = ListNode.fromArray([5, 6, 4])

const l1 = ListNode.fromArray([5])
const l2 = ListNode.fromArray([5])

const result = addTwoNumbers(l1, l2)
result.print()