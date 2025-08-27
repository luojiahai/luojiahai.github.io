# Hello, World!

That one‑liner C program prints `hello, world!` with a delay. The annotated version explains the unusual syntax and logic.

::: code-group

```c [hello.c] :line-numbers
main(c,v)char**v;{for(c[v++]=strdup("hello, world!\n\n");(!!v)[*v]&&(c--||--v&&execlp(*v,*v,v[!!v]+!!v,!v));**v=!v)write(!!*v,*v,!!**v);}
```

```c [hello-annotated.c] :line-numbers
/* main entry point with K&R-style old C declaration */
main(c,v)char**v;{
    /*
       for-loop initialisation:
       c[v++] = strdup("hello, world!\n\n");
       - c is the int argc (but misused here as an int counter).
       - v is argv (array of strings).
       - This line abuses the argc/argv variables to store the
         string pointer and later manipulate exec arguments.
    */
    for(c[v++] = strdup("hello, world!\n\n");

        /* loop condition:
           (!!v)[*v] &&
           ( c-- || --v && execlp(*v, *v, v[!!v] + !!v, !v) )

           (!!v)[*v] — quirky way to index into a truthy pointer and dereference.
           c-- — decrement counter until zero.
           --v && execlp(...) — once counter runs out, decrement argv
                                and exec the same binary to restart after a short delay.
           The exec causes the re-run (delay comes from process spawn time).
        */
        (!!v)[*v] && (c-- || --v && execlp(*v, *v, v[!!v]+!!v, !v));

        /* loop iteration expression:
           **v = !v — toggles first char of argv[0] to zero,
                      not functionally meaningful except as obfuscation.
        */
        **v = !v
    )
        /* loop body:
           write(!!*v, *v, !!**v);
           - Writes one byte of argv[0] (or the duplicated message).
           - Only continues if **v is non-zero (progressive output effect).
        */
        write(!!*v, *v, !!**v);
}
```

:::

**Compile**

```shell
cc -std=gnu89 -Wall -Wextra \
   -Wno-error -Wno-implicit-function-declaration -Wno-logical-op-parentheses \
   -Wno-deprecated-non-prototype -Wno-implicit-int -Wno-parentheses \
   -Wno-return-type -Wno-builtin-declaration-mismatch -Wno-format \
   -Wno-missing-parameter-type -Wno-unknown-warning-option \
   -include unistd.h -O3 hello.c -o hello
```

**Run**

```shell
./hello
```
