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
    <span class="Badge" :class="color">
      <slot>{{ text }}</slot>
    </span>
  </a>
</template>

<style>
.Badge {
  display: inline-block;
  margin-right: 4px;
  border: 1px solid transparent;
  padding: 2px 10px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transform: translateY(-2px);
}

.Badge.small {
  padding: 0 6px;
  line-height: 18px;
  font-size: 10px;
  transform: translateY(-8px);
}

.VPDocFooter .Badge {
  display: none;
}

.vp-doc h1 > .Badge {
  margin-top: 4px;
  vertical-align: top;
}

.vp-doc h2 > .Badge {
  margin-top: 3px;
  padding: 0 8px;
  vertical-align: top;
}

.vp-doc h3 > .Badge {
  vertical-align: middle;
}

.vp-doc h4 > .Badge,
.vp-doc h5 > .Badge,
.vp-doc h6 > .Badge {
  vertical-align: middle;
  line-height: 18px;
}

.Badge.black {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.black:hover {
  border-color: var(--black);
  color: var(--black);
  background-color: var(--white);
}

.Badge.white {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.white:hover {
  border-color: var(--white);
  color: var(--white);
  background-color: var(--black);
}

.Badge.pink {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.pink:hover {
  border-color: var(--pink);
  color: var(--pink);
  background-color: var(--vp-c-bg);
}

.Badge.magenta {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.magenta:hover {
  border-color: var(--magenta);
  color: var(--magenta);
  background-color: var(--vp-c-bg);
}

.Badge.red {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.red:hover {
  border-color: var(--red);
  color: var(--red);
  background-color: var(--vp-c-bg);
}

.Badge.orange {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.orange:hover {
  border-color: var(--orange);
  color: var(--orange);
  background-color: var(--vp-c-bg);
}

.Badge.yellow {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.yellow:hover {
  border-color: var(--yellow);
  color: var(--yellow);
  background-color: var(--vp-c-bg);
}

.Badge.light-yellow {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.light-yellow:hover {
  border-color: var(--light-yellow);
  color: var(--light-yellow);
  background-color: var(--vp-c-bg);
}

.Badge.light-green {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.light-green:hover {
  border-color: var(--light-green);
  color: var(--light-green);
  background-color: var(--vp-c-bg);
}

.Badge.green {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.green:hover {
  border-color: var(--green);
  color: var(--green);
  background-color: var(--vp-c-bg);
}

.Badge.cyan {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.cyan:hover {
  border-color: var(--cyan);
  color: var(--cyan);
  background-color: var(--vp-c-bg);
}

.Badge.light-blue {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.light-blue:hover {
  border-color: var(--light-blue);
  color: var(--light-blue);
  background-color: var(--vp-c-bg);
}

.Badge.blue {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.blue:hover {
  border-color: var(--blue);
  color: var(--blue);
  background-color: var(--vp-c-bg);
}

.Badge.purple {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.purple:hover {
  border-color: var(--purple);
  color: var(--purple);
  background-color: var(--vp-c-bg);
}

.Badge.brown {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.Badge.brown:hover {
  border-color: var(--brown);
  color: var(--brown);
  background-color: var(--vp-c-bg);
}
</style>
