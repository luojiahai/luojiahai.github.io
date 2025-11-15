<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const TOTAL_FRAMES = 10;
const COLORS = [
  "var(--red)",
  "var(--yellow)",
  "var(--green)",
  "var(--blue)",
  "var(--magenta)",
  "var(--cyan)",
  "var(--white)",
] as const;

const currentFrame = ref(0);
const currentColorIndex = ref(0);
const originalFrames = ref<string[]>([]);
const flippedFrames = ref<string[]>([]);

let animationInterval: number | undefined;

const frames = computed(() => originalFrames.value);

const currentColor = computed(() => COLORS[currentColorIndex.value]);

const getRandomColorIndex = (exclude: number): number => {
  let index: number;
  do {
    index = Math.floor(Math.random() * COLORS.length);
  } while (index === exclude && COLORS.length > 1);
  return index;
};

const loadFrames = async (): Promise<void> => {
  const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
    fetch(`/parrot/${i}.txt`)
      .then((res) => res.text())
      .catch((err) => {
        console.error(`Failed to load frame ${i}:`, err);
        return "";
      }),
  );

  const loadedFrames = await Promise.all(promises);
  originalFrames.value = loadedFrames;
  flippedFrames.value = loadedFrames.map((frame) =>
    frame.split("").reverse().join(""),
  );
};

const tick = (): void => {
  currentFrame.value = (currentFrame.value + 1) % TOTAL_FRAMES;
  currentColorIndex.value = getRandomColorIndex(currentColorIndex.value);
};

const startAnimation = (): void => {
  if (animationInterval !== undefined) return;
  animationInterval = window.setInterval(tick, 70);
};

const stopAnimation = (): void => {
  if (animationInterval !== undefined) {
    clearInterval(animationInterval);
    animationInterval = undefined;
  }
};

onMounted(async () => {
  await loadFrames();
  startAnimation();
});

onUnmounted(() => {
  stopAnimation();
});
</script>

<template>
  <div class="parrot">
    <pre class="parrot-frame" :style="{ color: currentColor }">{{
      frames[currentFrame]
    }}</pre>
  </div>
</template>

<style scoped>
.parrot {
  padding: 16px;
}

.parrot-frame {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.2;
  margin: 0;
  white-space: pre;
}
</style>
