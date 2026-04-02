<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";

const { Layout } = DefaultTheme;
const route = useRoute();

const WORDS = [
  "Thinking",
  "Boondoggling",
  "Choreographing",
  "Dilly-dallying",
  "Embellishing",
  "Flibbertigibbeting",
  "Hullaballooing",
  "Jitterbugging",
  "Lollygagging",
  "Pontificating",
  "Recombobulating",
  "Schlepping",
];

function startTypewriter(el: Element) {
  let wordIdx = 0;
  let charIdx = 0;
  let stopped = false;

  function tick() {
    if (stopped) return;
    const word = WORDS[wordIdx] + "...";
    if (charIdx < word.length) {
      el.innerHTML = word.slice(0, charIdx + 1) + "_█";
      charIdx++;
      setTimeout(tick, 50);
    } else {
      el.innerHTML = word;
      setTimeout(() => {
        if (stopped) return;
        const prevWord = word;
        wordIdx = (wordIdx + 1) % WORDS.length;
        const nextWord = WORDS[wordIdx] + "...";
        const maxLen = Math.max(prevWord.length, nextWord.length);
        let replaceIdx = 1;
        function replace() {
          if (stopped) return;
          if (replaceIdx < maxLen) {
            el.innerHTML =
              nextWord.slice(0, replaceIdx) +
              "_❚" +
              prevWord.slice(replaceIdx + 1);
            replaceIdx++;
            setTimeout(replace, 50);
          } else {
            charIdx = nextWord.length;
            tick();
          }
        }
        replace();
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
