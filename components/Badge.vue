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
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0 10px;
  line-height: 22px;
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
  border-color: var(--black);
  color: white;
  background-color: var(--black);
}

.Badge.white {
  border-color: var(--white);
  color: black;
  background-color: var(--white);
}

.Badge.pink {
  border-color: var(--pink);
  color: white;
  background-color: var(--pink);
}

.Badge.magenta {
  border-color: var(--magenta);
  color: white;
  background-color: var(--magenta);
}

.Badge.red {
  border-color: var(--red);
  color: white;
  background-color: var(--red);
}

.Badge.orange {
  border-color: var(--orange);
  color: white;
  background-color: var(--orange);
}

.Badge.yellow {
  border-color: var(--yellow);
  color: white;
  background-color: var(--yellow);
}

.Badge.light-yellow {
  border-color: var(--light-yellow);
  color: white;
  background-color: var(--light-yellow);
}

.Badge.light-green {
  border-color: var(--light-green);
  color: white;
  background-color: var(--light-green);
}

.Badge.green {
  border-color: var(--green);
  color: white;
  background-color: var(--green);
}

.Badge.cyan {
  border-color: var(--cyan);
  color: white;
  background-color: var(--cyan);
}

.Badge.light-blue {
  border-color: var(--light-blue);
  color: white;
  background-color: var(--light-blue);
}

.Badge.blue {
  border-color: var(--blue);
  color: white;
  background-color: var(--blue);
}

.Badge.purple {
  border-color: var(--purple);
  color: white;
  background-color: var(--purple);
}

.Badge.brown {
  border-color: var(--brown);
  color: white;
  background-color: var(--brown);
}
</style>
