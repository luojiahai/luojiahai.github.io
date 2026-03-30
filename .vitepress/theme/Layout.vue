<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";

const { Layout } = DefaultTheme;
const route = useRoute();

const WORDS = [
  "Thinking",
  "Pondering",
  "Considering",
  "Analyzing",
  "Cogitating",
  "Deliberating",
  "Contemplating",
  "Flibbertigibbeting",
  "Ruminating",
  "Synthesizing",
];

function startTypewriter(el: Element) {
  let wordIdx = 0;
  let charIdx = 0;
  let stopped = false;

  function tick() {
    if (stopped) return;
    const word = " " + WORDS[wordIdx] + "...";
    if (charIdx < word.length) {
      el.textContent = word.slice(0, charIdx + 1) + "_";
      charIdx++;
      setTimeout(tick, 50);
    } else {
      el.textContent = word;
      setTimeout(() => {
        if (stopped) return;
        wordIdx = (wordIdx + 1) % WORDS.length;
        charIdx = 0;
        tick();
      }, 2000);
    }
  }

  tick();
  return () => {
    stopped = true;
  };
}

onMounted(() => {
  let cleanup: (() => void) | null = null;

  watch(
    () => route.path,
    () => {
      if (cleanup) cleanup();
      nextTick(() => {
        const el = document.querySelector(".VPHome .VPHero .thinking");
        if (!el) return;
        cleanup = startTypewriter(el);
      });
    },
    { immediate: true },
  );
});
</script>

<template>
  <Layout />
</template>
