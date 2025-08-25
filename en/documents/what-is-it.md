# What is it?

It is my personal site, statically generated using [VitePress](https://vitepress.dev/) and hosted on [GitHub Pages](https://docs.github.com/en/pages). The homepage includes my professional profile and résumé. This site does not host a blog or portfolio.

On the homepage, you will find this one‑liner C program:

::: code-group

```c [hello.c] :line-numbers
main(c,v)char**v;{for(c[v++]=strdup("hello, world!\n\n");(!!v)[*v]&&(c--||--v&&execlp(*v,*v,v[!!v]+!!v,!v));**v=!v)write(!!*v,*v,!!**v);}
```

```makefile [Makefile] :line-numbers
auto:
    cc -std=gnu89 -Wall -Wextra -Wno-error -Wno-implicit-function-declaration -Wno-logical-op-parentheses -Wno-deprecated-non-prototype -Wno-implicit-int -Wno-parentheses -Wno-return-type -Wno-builtin-declaration-mismatch -Wno-format -Wno-missing-parameter-type -Wno-unknown-warning-option   -include unistd.h -O3 hello.c -o hello
```

:::

It prints `hello, world!`, but does so with delay.

## Who am I?

I am Geoffrey (anglicized). My handle is `luojiahai`, which is derived from the Pinyin of my name, 罗嘉海 (luó jiā hǎi), and I use it consistently across usernames, emails, and social networks, essentially everywhere on the Internet.

## What I do?

I am currently a Senior Software Engineer at [REA Group](https://www.rea-group.com/) (ASX:REA), the company that operates [realestate.com.au](https://www.realestate.com.au/), one of Australia's leading property websites. I highly recommend working here for its great people‑driven culture and impactful products.

Previously, I was a Software Development Engineer at [Amazon Web Services (AWS)](https://aws.amazon.com/), one of the major US tech companies. I appreciated the scale, technical challenges, and talented colleagues, but I found that the culture and management style were toxic and incompatible with how I work best.
