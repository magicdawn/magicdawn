# basic-types

## enum

```typescript
enum Color {
  Red = 1,
  Green,
  Blue = 2,
}
let colorName: string = Color[2]

// { '1': 'Red', '2': 'Blue', Red: 1, Green: 2, Blue: 2 }
console.log(Color)

// Blue
console.log(colorName)
```

自动

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2]

// { '1': 'Red', '2': 'Green', '3': 'Blue', Red: 1, Green: 2, Blue: 3 }
// Green
```

## any

- any 可以 call method not exists
- Object 类型, 不能调用不存在的方法
