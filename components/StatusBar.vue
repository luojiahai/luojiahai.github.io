<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const currentTime = ref(new Date());
const weatherData = ref("");
const weatherLoading = ref(true);
const systemInfo = ref("");

let timeInterval: number | undefined;

const BROWSER_PATTERNS = [
  { pattern: /Firefox\/([\d.]+)/, name: "firefox" },
  { pattern: /Edg\/([\d.]+)/, name: "edge" },
  { pattern: /Chrome\/([\d.]+)/, name: "chrome", exclude: /Edg\// },
  {
    pattern: /Version\/([\d.]+)/,
    name: "safari",
    check: /Safari\/(?!.*Chrome)/,
  },
  { pattern: /(?:Opera|OPR)\/([\d.]+)/, name: "opera" },
] as const;

const OS_PATTERNS = [
  { pattern: /Win/, name: "windows" },
  { pattern: /Mac/, name: "macos" },
  { pattern: /Linux/, name: "linux" },
  { pattern: /Android/, name: "android" },
  { pattern: /iPhone|iPad|iOS/, name: "ios" },
] as const;

const pad = (n: number): string => String(n).padStart(2, "0");

const detectBrowser = (ua: string): string => {
  for (const item of BROWSER_PATTERNS) {
    const { pattern, name } = item;
    const exclude = "exclude" in item ? item.exclude : undefined;
    const check = "check" in item ? item.check : undefined;

    if (exclude?.test(ua)) continue;
    if (check && !check.test(ua)) continue;
    const match = ua.match(pattern);
    if (match) return `${name} ${match[1] || ""}`.trim();
  }
  return "unknown browser";
};

const detectOS = (ua: string): string => {
  for (const { pattern, name } of OS_PATTERNS) {
    if (pattern.test(ua)) return name;
  }
  return "unknown os";
};

const timeZoneInfo = (() => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return tz.toLowerCase();
})();

const formattedDateTime = computed(() => {
  const date = currentTime.value;
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? "pm" : "am";
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const offset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const offsetMinutes = Math.abs(offset) % 60;
  const sign = offset >= 0 ? "+" : "-";
  const utcOffset =
    offsetMinutes > 0
      ? `utc${sign}${offsetHours}:${pad(offsetMinutes)}`
      : `utc${sign}${offsetHours}`;

  return `${year}-${month}-${day} ${hours12}:${minutes}:${seconds} ${ampm} ${utcOffset} ${timeZoneInfo}`;
});

const fetchWeather = async (): Promise<void> => {
  try {
    const response = await fetch("https://wttr.in/?format=3");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    weatherData.value = (await response.text()).trim().toLowerCase();
  } catch {
    weatherData.value = "weather unavailable";
  } finally {
    weatherLoading.value = false;
  }
};

const initSystemInfo = (): void => {
  const ua = navigator.userAgent;
  const os = detectOS(ua);
  const browser = detectBrowser(ua);
  systemInfo.value = `${os} ${browser}`;
};

onMounted(() => {
  initSystemInfo();
  fetchWeather();
  timeInterval = window.setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (timeInterval !== undefined) {
    clearInterval(timeInterval);
  }
});
</script>

<template>
  <div class="status-bar">
    <span class="status-item">{{ formattedDateTime }}</span>
    <span class="status-separator">|</span>
    <span class="status-item">{{
      weatherLoading ? "loading..." : weatherData
    }}</span>
    <span class="status-separator">|</span>
    <span class="status-item">{{ systemInfo }}</span>
  </div>
</template>

<style scoped>
.status-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 1rem 1.5rem;
  margin: 1rem -1.5rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.5;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  overflow-x: auto;
  white-space: nowrap;
}

.status-item {
  display: inline-block;
}

.status-separator {
  color: var(--vp-c-divider);
  user-select: none;
  display: none;
}

@media (min-width: 640px) {
  .status-bar {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .status-separator {
    display: inline;
  }
}
</style>
