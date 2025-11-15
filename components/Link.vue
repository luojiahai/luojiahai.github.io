<script setup lang="ts">
interface Props {
  text?: string;
  color?:
    | "black"
    | "white"
    | "pink"
    | "magenta"
    | "red"
    | "orange"
    | "yellow"
    | "light-yellow"
    | "light-green"
    | "green"
    | "cyan"
    | "light-blue"
    | "blue"
    | "purple"
    | "brown";
  href?: string;
}
withDefaults(defineProps<Props>(), {
  color: "black",
  href: "",
});
</script>

<template>
  <a :href="href">
    <span class="Link" :class="color">
      <slot>{{ text }}</slot>
    </span>
  </a>
</template>

<style>
.Link {
  display: inline-block;
  margin-right: 4px;
  border: 1px solid transparent;
  padding: 4px 10px;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transform: translateY(-2px);
}

.Link.small {
  padding: 2px 6px;
  line-height: 18px;
  font-size: 10px;
  transform: translateY(-8px);
}

.VPDocFooter .Link {
  display: none;
}

.vp-doc h1 > .Link {
  margin-top: 4px;
  vertical-align: top;
}

.vp-doc h2 > .Link {
  margin-top: 3px;
  padding: 0 8px;
  vertical-align: top;
}

.vp-doc h3 > .Link {
  vertical-align: middle;
}

.vp-doc h4 > .Link,
.vp-doc h5 > .Link,
.vp-doc h6 > .Link {
  vertical-align: middle;
  line-height: 18px;
}

.Link.black {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.black:hover {
  border-color: var(--black);
  color: var(--black);
  background-color: var(--white);
}

.Link.white {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.white:hover {
  border-color: var(--white);
  color: var(--white);
  background-color: var(--black);
}

.Link.pink {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.pink:hover {
  border-color: var(--pink);
  color: var(--pink);
  background-color: var(--vp-c-bg);
}

.Link.magenta {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.magenta:hover {
  border-color: var(--magenta);
  color: var(--magenta);
  background-color: var(--vp-c-bg);
}

.Link.red {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.red:hover {
  border-color: var(--red);
  color: var(--red);
  background-color: var(--vp-c-bg);
}

.Link.orange {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.orange:hover {
  border-color: var(--orange);
  color: var(--orange);
  background-color: var(--vp-c-bg);
}

.Link.yellow {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.yellow:hover {
  border-color: var(--yellow);
  color: var(--yellow);
  background-color: var(--vp-c-bg);
}

.Link.light-yellow {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.light-yellow:hover {
  border-color: var(--light-yellow);
  color: var(--light-yellow);
  background-color: var(--vp-c-bg);
}

.Link.light-green {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.light-green:hover {
  border-color: var(--light-green);
  color: var(--light-green);
  background-color: var(--vp-c-bg);
}

.Link.green {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.green:hover {
  border-color: var(--green);
  color: var(--green);
  background-color: var(--vp-c-bg);
}

.Link.cyan {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.cyan:hover {
  border-color: var(--cyan);
  color: var(--cyan);
  background-color: var(--vp-c-bg);
}

.Link.light-blue {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.light-blue:hover {
  border-color: var(--light-blue);
  color: var(--light-blue);
  background-color: var(--vp-c-bg);
}

.Link.blue {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.blue:hover {
  border-color: var(--blue);
  color: var(--blue);
  background-color: var(--vp-c-bg);
}

.Link.purple {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.purple:hover {
  border-color: var(--purple);
  color: var(--purple);
  background-color: var(--vp-c-bg);
}

.Link.brown {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Link.brown:hover {
  border-color: var(--brown);
  color: var(--brown);
  background-color: var(--vp-c-bg);
}
</style>
