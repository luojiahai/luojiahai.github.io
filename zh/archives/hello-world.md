# 你好，世界！

那段混淆的 C++ 程序会输出 `hello, world!`。

::: code-group

```cpp [hello.cpp] :line-numbers
#include<iostream>
int main(){for(const char* p="ifmmp-!xpsme\"\x0b";*p;)std::cout<<char(*p++-1);}
```

:::

**编译**

```shell
g++ -std=c++17 -o hello hello.cpp
```

**运行**

```shell
./hello
```
