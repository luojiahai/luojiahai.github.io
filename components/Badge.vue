<script setup lang="ts">
interface Props {
  logo?: string;
  text?: string;
  type?: "pink" | "light-blue" | "green" | "yellow" | "red";
}
withDefaults(defineProps<Props>(), {
  type: "pink",
});
</script>

<template>
  <span class="Badge" :class="type">
    <span class="logo">{{ logo }}</span>
    <span class="text">{{ text }}</span>
  </span>
</template>

<style>
.Badge {
  font-family: "Cascadia Mono", monospace !important;
  display: inline-flex;
  margin-right: 2px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(-2px);
}

.logo {
  display: flex;
  align-items: center;
  line-height: 24px;
  padding: 0 6px;
}

.text {
  display: flex;
  align-items: center;
  line-height: 24px;
  padding: 0 8px;
}

.Badge.small .logo {
  padding: 0 4px;
  line-height: 18px;
  font-size: 10px;
  transform: translateY(-8px);
}

.Badge.small .text {
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

.Badge.pink .logo {
  color: var(--Pi5);
  background-color: rgba(var(--Pi5_rgb), 0.32);
}

.Badge.pink .text {
  color: var(--Pi5);
  background-color: rgba(var(--Pi5_rgb), 0.16);
}

.Badge.light-blue .logo {
  color: var(--Lb5);
  background-color: rgba(var(--Lb5_rgb), 0.32);
}

.Badge.light-blue .text {
  color: var(--Lb5);
  background-color: rgba(var(--Lb5_rgb), 0.16);
}

.Badge.green .logo {
  color: var(--Gr5);
  background-color: rgba(var(--Gr5_rgb), 0.32);
}

.Badge.green .text {
  color: var(--Gr5);
  background-color: rgba(var(--Gr5_rgb), 0.16);
}

.Badge.yellow .logo {
  color: var(--Ye5);
  background-color: rgba(var(--Ye5_rgb), 0.32);
}

.Badge.yellow .text {
  color: var(--Ye5);
  background-color: rgba(var(--Ye5_rgb), 0.16);
}

.Badge.red .logo {
  color: var(--Re5);
  background-color: rgba(var(--Re5_rgb), 0.32);
}

.Badge.red .text {
  color: var(--Re5);
  background-color: rgba(var(--Re5_rgb), 0.16);
}
</style>
