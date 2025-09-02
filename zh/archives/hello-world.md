# 你好，世界！

那段混淆的 C++ 程序会输出 `hello, world!`。

::: code-group

```cpp [hello.cpp] :line-numbers
#include<iostream>
int main(){static char s[]={104,101,108,108,111,44,32,119,111,114,108,100,33,10,0};for(char*p=s;*p;)std::cout<<*p++;}
```

:::

**编译**

```shell
cc -std=gnu89 -Wall -Wextra \
   -Wno-error -Wno-implicit-function-declaration -Wno-logical-op-parentheses \
   -Wno-deprecated-non-prototype -Wno-implicit-int -Wno-parentheses \
   -Wno-return-type -Wno-builtin-declaration-mismatch -Wno-format \
   -Wno-missing-parameter-type -Wno-unknown-warning-option \
   -include unistd.h -O3 hello.c -o hello
```

**运行**

```shell
./hello
```
