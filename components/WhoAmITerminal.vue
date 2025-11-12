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

const detectDevice = (ua: string): string => {
  if (ua.includes("Mobile")) return "mobile";
  if (ua.includes("Tablet") || ua.includes("iPad")) return "tablet";
  return "desktop";
};

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
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return `${year}-${month}-${day} ${hours12}:${minutes}:${seconds} ${ampm} ${utcOffset} ${timezone}`;
});

const fetchWeather = async (): Promise<void> => {
  try {
    const response = await fetch("https://wttr.in/?format=%l:+%t+%C+%c\n");
    if (!response.ok) throw new Error(`http error! status: ${response.status}`);
    weatherData.value = (await response.text()).trim();
  } catch {
    weatherData.value = "weather unavailable";
  } finally {
    weatherLoading.value = false;
  }
};

const initSystemInfo = (): void => {
  const ua = navigator.userAgent;
  const language = navigator.language || "unknown";
  const device = detectDevice(ua);
  const os = detectOS(ua);
  const browser = detectBrowser(ua);
  systemInfo.value = `${language} ${device} ${os} ${browser}`;
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
  <div class="terminal-frame">
    <div class="terminal-header">
      <div class="controls">
        <span class="control-button close">×</span>
        <span class="control-button minimize">−</span>
        <span class="control-button maximize">+</span>
      </div>
      <div class="title">luojiahai@localhost:/</div>
    </div>
    <div class="terminal-content">
      <slot />
    </div>
    <div class="terminal-footer">
      <span>{{ formattedDateTime.toLocaleLowerCase() }}</span>
      <span class="separator">|</span>
      <span>{{
        weatherLoading ? "loading..." : weatherData.toLocaleLowerCase()
      }}</span>
      <span class="separator">|</span>
      <span>{{ systemInfo.toLocaleLowerCase() }}</span>
    </div>
  </div>
</template>

<style scoped>
.terminal-frame {
  margin: 1rem -1.5rem;
  font-family: var(--vp-font-family-mono);
  line-height: 1.5;
  color: var(--vp-c-text-1);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.terminal-frame::-webkit-scrollbar {
  display: none;
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  background-color: var(--vp-c-bg-elv);
  position: relative;
}

.controls {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.control-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.75rem;
  height: 0.75rem;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.7);
  user-select: none;
  border-radius: 50% !important;
}

.control-button.close {
  background-color: var(--red);
}

.control-button.minimize {
  background-color: var(--yellow);
}

.control-button.maximize {
  background-color: var(--green);
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  user-select: none;
}

.terminal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  background-color: var(--vp-code-block-bg);
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.terminal-content::-webkit-scrollbar {
  display: none;
}

.terminal-footer {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  font-size: 11px;
  line-height: 1.5;
  background-color: var(--vp-c-bg-elv);
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.terminal-footer::-webkit-scrollbar {
  display: none;
}

.separator {
  padding: 0 0.375rem;
  color: var(--vp-c-divider);
  user-select: none;
}

@media (min-width: 640px) {
  .terminal-frame {
    margin: 1rem 0rem;
    border-radius: 0.75rem !important;
  }
}
</style>
