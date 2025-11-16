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
withDefaults(defineProps<Props>(), {
  color: "black",
});
</script>

<template>
  <a :href="href">
    <span class="link-button" :class="color">
      <span
        v-if="icon"
        class="link-button-icon"
        :style="{
          '--icon': `url('https://api.iconify.design/simple-icons/${icon}.svg')`,
        }"
      ></span>
      <slot>{{ text }}</slot>
    </span>
  </a>
</template>

<style>
.link-button {
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

.link-button-icon {
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

.link-button.black {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.black:hover {
  border-color: var(--white);
  color: var(--white);
  background-color: var(--black);
}

.link-button.white {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.white:hover {
  border-color: var(--black);
  color: var(--black);
  background-color: var(--white);
}

.link-button.pink {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.pink:hover {
  border-color: var(--pink);
  color: var(--pink);
  background-color: var(--vp-c-bg);
}

.link-button.magenta {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.magenta:hover {
  border-color: var(--magenta);
  color: var(--magenta);
  background-color: var(--vp-c-bg);
}

.link-button.red {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.red:hover {
  border-color: var(--red);
  color: var(--red);
  background-color: var(--vp-c-bg);
}

.link-button.orange {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.orange:hover {
  border-color: var(--orange);
  color: var(--orange);
  background-color: var(--vp-c-bg);
}

.link-button.yellow {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.yellow:hover {
  border-color: var(--yellow);
  color: var(--yellow);
  background-color: var(--vp-c-bg);
}

.link-button.light-yellow {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.light-yellow:hover {
  border-color: var(--light-yellow);
  color: var(--light-yellow);
  background-color: var(--vp-c-bg);
}

.link-button.light-green {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.light-green:hover {
  border-color: var(--light-green);
  color: var(--light-green);
  background-color: var(--vp-c-bg);
}

.link-button.green {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.green:hover {
  border-color: var(--green);
  color: var(--green);
  background-color: var(--vp-c-bg);
}

.link-button.cyan {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.cyan:hover {
  border-color: var(--cyan);
  color: var(--cyan);
  background-color: var(--vp-c-bg);
}

.link-button.light-blue {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.light-blue:hover {
  border-color: var(--light-blue);
  color: var(--light-blue);
  background-color: var(--vp-c-bg);
}

.link-button.blue {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.blue:hover {
  border-color: var(--blue);
  color: var(--blue);
  background-color: var(--vp-c-bg);
}

.link-button.purple {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.purple:hover {
  border-color: var(--purple);
  color: var(--purple);
  background-color: var(--vp-c-bg);
}

.link-button.brown {
  border-color: var(--line-regular);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.link-button.brown:hover {
  border-color: var(--brown);
  color: var(--brown);
  background-color: var(--vp-c-bg);
}
</style>
