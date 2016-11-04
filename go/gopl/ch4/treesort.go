package main

import "fmt"

// Tree is binary Tree
type Tree struct {
	value       int
	left, right *Tree
}

func add(t *Tree, value int) (ret *Tree) {
	if t == nil {
		ret = &Tree{value: value}
		return
	}

	if value < t.value {
		t.left = add(t.left, value)
	} else {
		t.right = add(t.right, value)
	}
	return t
}

func treeToSlice(t *Tree, values []int) []int {
	if t != nil {
		values = treeToSlice(t.left, values)
		values = append(values, t.value)
		values = treeToSlice(t.right, values)
	}
	return values
}

func sort(values []int) []int {
	var root *Tree
	for _, v := range values {
		root = add(root, v)
	}
	fmt.Println("---------------")
	fmt.Println(values[:0])
	fmt.Println("---------------")
	values = treeToSlice(root, values[:0])
	return values
}

func main() {
	s := []int{1, 20, 44, 12, 23}
	s = sort(s)
	fmt.Println(s)
}
