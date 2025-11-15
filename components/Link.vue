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
  icon?: string;
  href?: string;
}
const props = withDefaults(defineProps<Props>(), {
  color: "black",
});
</script>

<template>
  <a :href="href">
    <span class="link" :class="color">
      <span
        v-if="icon"
        class="link-icon"
        :style="{
          '--icon': `url('https://api.iconify.design/simple-icons/${icon}.svg')`,
        }"
      ></span>
      <slot>{{ text }}</slot>
    </span>
  </a>
</template>

<style>
.link {
  display: inline-block;
  margin-top: 4px;
  margin-right: 4px;
  border: 1px solid transparent;
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transform: translateY(-4px);
}

.link-icon {
  display: inline-block;
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 8px;
  width: 14px;
  height: 14px;
  background: currentColor;
  color: currentColor;
  flex-shrink: 0;
  -webkit-mask-image: var(--icon);
  mask-image: var(--icon);
  mask-size: 100% 100%;
}

.link.black {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.black:hover {
  border-color: var(--white);
  color: var(--white);
  background-color: var(--black);
}

.link.white {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.white:hover {
  border-color: var(--black);
  color: var(--black);
  background-color: var(--white);
}

.link.pink {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.pink:hover {
  border-color: var(--pink);
  color: var(--pink);
  background-color: var(--vp-c-bg);
}

.link.magenta {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.magenta:hover {
  border-color: var(--magenta);
  color: var(--magenta);
  background-color: var(--vp-c-bg);
}

.link.red {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.red:hover {
  border-color: var(--red);
  color: var(--red);
  background-color: var(--vp-c-bg);
}

.link.orange {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.orange:hover {
  border-color: var(--orange);
  color: var(--orange);
  background-color: var(--vp-c-bg);
}

.link.yellow {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.yellow:hover {
  border-color: var(--yellow);
  color: var(--yellow);
  background-color: var(--vp-c-bg);
}

.link.light-yellow {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.light-yellow:hover {
  border-color: var(--light-yellow);
  color: var(--light-yellow);
  background-color: var(--vp-c-bg);
}

.link.light-green {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.light-green:hover {
  border-color: var(--light-green);
  color: var(--light-green);
  background-color: var(--vp-c-bg);
}

.link.green {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.green:hover {
  border-color: var(--green);
  color: var(--green);
  background-color: var(--vp-c-bg);
}

.link.cyan {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.cyan:hover {
  border-color: var(--cyan);
  color: var(--cyan);
  background-color: var(--vp-c-bg);
}

.link.light-blue {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.light-blue:hover {
  border-color: var(--light-blue);
  color: var(--light-blue);
  background-color: var(--vp-c-bg);
}

.link.blue {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.blue:hover {
  border-color: var(--blue);
  color: var(--blue);
  background-color: var(--vp-c-bg);
}

.link.purple {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.purple:hover {
  border-color: var(--purple);
  color: var(--purple);
  background-color: var(--vp-c-bg);
}

.link.brown {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link.brown:hover {
  border-color: var(--brown);
  color: var(--brown);
  background-color: var(--vp-c-bg);
}
</style>
