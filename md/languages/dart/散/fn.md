语法为 类 C, `类型 变量`, ts / kotlin 是 `变量: 类型`

```dart
int function_name(type1 arg1, type2 arg2, [type3? arg3]) {
  //
}
```

## 可选的命名参数

```dart
//设置[bold]和[hidden]标志
void enableFlags({bool bold, bool hidden}) {
    // ...
}

enableFlags(bold: true, hidden: false)
```

```dart
Future.delayed(Duration(seconds: 2),(){
   return "hi world!";
}).then((data){
   print(data);
});

// Duration 的构造函数
const Duration(
  {int days = 0,
  int hours = 0,
  int minutes = 0,
  int seconds = 0,
  int milliseconds = 0,
  int microseconds = 0})
  : this._microseconds(microseconds +
        microsecondsPerMillisecond * milliseconds +
        microsecondsPerSecond * seconds +
        microsecondsPerMinute * minutes +
        microsecondsPerHour * hours +
        microsecondsPerDay * days);
```

## 匿名函数 Anonymouse function

```dart
() {
  print('hello');
}
```

### async function

```dart
Future test() async {
  await a_future
}
```

- 同 ts 一样, async function 返回值必须是 `Future` (Promise in ts)
