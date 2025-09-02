# Hello, World!

That obfuscated C++ program prints `hello, world!`.

::: code-group

```cpp [hello.cpp] :line-numbers
#include<iostream>
int main(){static char s[]={104,101,108,108,111,44,32,119,111,114,108,100,33,10,0};for(char*p=s;*p;)std::cout<<*p++;}
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
