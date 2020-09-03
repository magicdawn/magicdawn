# explicit

## 资料

- https://www.cnblogs.com/rednodel/p/9299251.html

## 解释
```cpp
class CxString  // 使用关键字explicit的类声明, 显示转换  
{  
public:  
    char *_pstr;  
    int _size;  
    explicit CxString(int size)  
    {  
        _size = size;  
        // 代码同上, 省略...  
    }  
    CxString(const char *p)  
    {  
        // 代码同上, 省略...  
    }  
};  

CxString string1(24);     // 这样是OK的  
CxString string2 = 10;    // 这样是不行的, 因为explicit关键字取消了隐式转换
```

- 默认情况下, 如果类的构造函数只有一个 int 参数, 默认可以将 int 值赋给这个类型的变量, 使用隐式转换(构造函数)
- 标记为 `explicit` 则必须显示调用调用, 隐式转换被禁用掉了

