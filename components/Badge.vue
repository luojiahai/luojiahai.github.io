<script setup lang="ts">
interface Props {
  label?: string;
  text?: string;
  type?: "pink" | "light-blue" | "green" | "yellow" | "red";
}
withDefaults(defineProps<Props>(), {
  type: "pink",
});
</script>

<template>
  <span class="Badge" :class="type">
    <span class="label">{{ label }}</span>
    <span class="text">{{ text }}</span>
  </span>
</template>

<style>
.Badge {
  display: inline-flex;
  margin-right: 2px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
}

.Badge.small {
  line-height: 18px;
  font-size: 10px;
}

.Badge .label,
.Badge .text {
  display: flex;
  padding: 0 6px;
}

.Badge.small .label,
.Badge.small .text {
  padding: 0 4px;
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

.Badge.pink .label {
  color: var(--Pi5);
  background-color: rgba(var(--Pi5_rgb), 0.32);
}

.Badge.pink .text {
  color: var(--Pi5);
  background-color: rgba(var(--Pi5_rgb), 0.16);
}

.Badge.light-blue .label {
  color: var(--Lb5);
  background-color: rgba(var(--Lb5_rgb), 0.32);
}

.Badge.light-blue .text {
  color: var(--Lb5);
  background-color: rgba(var(--Lb5_rgb), 0.16);
}

.Badge.green .label {
  color: var(--Gr5);
  background-color: rgba(var(--Gr5_rgb), 0.32);
}

.Badge.green .text {
  color: var(--Gr5);
  background-color: rgba(var(--Gr5_rgb), 0.16);
}

.Badge.yellow .label {
  color: var(--Ye5);
  background-color: rgba(var(--Ye5_rgb), 0.32);
}

.Badge.yellow .text {
  color: var(--Ye5);
  background-color: rgba(var(--Ye5_rgb), 0.16);
}

.Badge.red .label {
  color: var(--Re5);
  background-color: rgba(var(--Re5_rgb), 0.32);
}

.Badge.red .text {
  color: var(--Re5);
  background-color: rgba(var(--Re5_rgb), 0.16);
}
</style>
