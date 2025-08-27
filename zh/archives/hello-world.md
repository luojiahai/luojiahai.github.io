# 你好，世界！

那段 C 语言单行代码程序会带延迟地输出 `hello, world!`。带注释的版本解释了它不寻常的语法和逻辑。

::: code-group

```c [hello.c] :line-numbers
main(c,v)char**v;{for(c[v++]=strdup("hello, world!\n\n");(!!v)[*v]&&(c--||--v&&execlp(*v,*v,v[!!v]+!!v,!v));**v=!v)write(!!*v,*v,!!**v);}
```

```c [hello-annotated.c] :line-numbers
/* 主入口，使用 K&R 风格的旧式 C 声明 */
main(c,v)char**v;{
    /*
       for 循环初始化:
       c[v++] = strdup("hello, world!\n\n");
       - c 是 argc（在这里被错误地当作计数器使用）。
       - v 是 argv（字符串数组）。
       - 把复制的字符串存放到 argv 数组的一个位置以便后续使用。
    */
    for(c[v++] = strdup("hello, world!\n\n");

        /* 循环条件:
           (!!v)[*v] &&
           ( c-- || --v && execlp(*v, *v, v[!!v] + !!v, !v) )

           (!!v)[*v] — 一种怪异的索引技巧，用来检查真值。
           c-- — 计数器减 1，直到变成 0。
           --v && execlp(...) — 当计数器减到 0 时，argv 指针减 1，
                                然后重新执行同一个二进制文件来产生延迟效果。
           延迟来源是进程重启的时间开销。
        */
        (!!v)[*v] && (c-- || --v && execlp(*v, *v, v[!!v]+!!v, !v));

        /* 循环迭代表达式:
           **v = !v — 把 argv[0] 的第一个字符置 0。
           纯属混淆技巧，对功能没有实质影响。
        */
        **v = !v
    )
        /* 循环体:
           write(!!*v, *v, !!**v);
           - 从消息中一次写出一个字节。
           - 直到 **v 变为 0（逐步推进输出）。
        */
        write(!!*v, *v, !!**v);
}
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
