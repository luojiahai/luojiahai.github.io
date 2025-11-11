<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const weatherData = ref("");
const loading = ref(true);
const error = ref<string | null>(null);

const weatherLocation = computed(() => {
  const params = new URLSearchParams(window.location.search);
  return params.get("location") || "";
});

const fetchWeather = async (): Promise<void> => {
  try {
    loading.value = true;
    error.value = null;

    const url = weatherLocation.value
      ? `https://wttr.in/${weatherLocation.value}?lang=en`
      : "https://wttr.in/?lang=en";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    weatherData.value = html.toLowerCase().replace(/<a[^>]*>.*?<\/a>/gi, "");
  } catch (e) {
    error.value =
      e instanceof Error ? e.message : "Failed to fetch weather data";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWeather);
</script>

<template>
  <div class="weather-container">
    <div v-if="loading" class="weather-loading">loading weather...</div>
    <div v-else-if="error" class="weather-error">error: {{ error }}</div>
    <div v-else v-html="weatherData"></div>
  </div>
</template>

<style scoped>
.weather-container {
  padding: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

.weather-loading {
  color: var(--vp-c-text-2);
}

.weather-error {
  color: var(--vp-c-danger-1);
}
</style>
