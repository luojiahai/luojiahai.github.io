# Hello, World!

That obfuscated C++ program prints `hello, world!`.

::: code-group

```cpp [hello.cpp] :line-numbers
#include<iostream>
int main(){for(const char* p="ifmmp-!xpsme\"\x0b";*p;)std::cout<<char(*p++-1);}
```

:::

**Compile**

```shell
g++ -std=c++17 -o hello hello.cpp
```

**Run**

```shell
./hello
```
