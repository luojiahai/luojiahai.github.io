<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

interface WhoAreYouData {
  ip: string;
  city: string;
  region: string;
  country: string;
  location: string;
  timezone: string;
  isp: string;
  browser: string;
  browserVersion: string;
  os: string;
  device: string;
  screenResolution: string;
  language: string;
  userAgent: string;
}

interface InfoSection {
  title: string;
  items: Array<{ label: string; value: string }>;
}

const whoAreYouData = ref<WhoAreYouData | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const BROWSER_PATTERNS = [
  { pattern: /Firefox\/([\d.]+)/, name: "firefox" },
  { pattern: /Edg\/([\d.]+)/, name: "edge" },
  {
    pattern: /Chrome\/([\d.]+)/,
    name: "chrome",
    exclude: (ua: string) => ua.includes("Edg/"),
  },
  {
    pattern: /Version\/([\d.]+)/,
    name: "safari",
    check: (ua: string) => ua.includes("Safari/") && !ua.includes("Chrome/"),
  },
  {
    pattern: /(?:Opera|OPR)\/([\d.]+)/,
    name: "opera",
    check: (ua: string) => ua.includes("Opera/") || ua.includes("OPR/"),
  },
];

const OS_PATTERNS = [
  { check: "Win", name: "windows" },
  { check: "Mac", name: "macos" },
  { check: "Linux", name: "linux" },
  { check: "Android", name: "android" },
  {
    check: (ua: string) =>
      ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad"),
    name: "ios",
  },
];

const detectBrowser = (ua: string) => {
  for (const browser of BROWSER_PATTERNS) {
    const exclude = "exclude" in browser ? browser.exclude : undefined;
    const check = "check" in browser ? browser.check : undefined;

    if (exclude?.(ua)) continue;
    if (check && !check(ua)) continue;
    const match = ua.match(browser.pattern);
    if (match) return { name: browser.name, version: match[1] || "unknown" };
  }
  return { name: "unknown", version: "unknown" };
};

const detectOS = (ua: string) => {
  for (const { check, name } of OS_PATTERNS) {
    if (typeof check === "string" ? ua.includes(check) : check(ua)) {
      return name;
    }
  }
  return "unknown";
};

const detectDevice = (ua: string) => {
  if (ua.includes("Mobile")) return "mobile";
  if (ua.includes("Tablet") || ua.includes("iPad")) return "tablet";
  return "desktop";
};

const sections = computed<InfoSection[]>(() => {
  if (!whoAreYouData.value) return [];

  const d = whoAreYouData.value;
  return [
    {
      title: "location",
      items: [
        { label: "city", value: d.city },
        { label: "region", value: d.region },
        { label: "country", value: d.country },
        { label: "coordinates", value: d.location },
        { label: "timezone", value: d.timezone },
      ],
    },
    {
      title: "network information",
      items: [
        { label: "ip address", value: d.ip },
        { label: "isp", value: d.isp },
      ],
    },
    {
      title: "system information",
      items: [
        { label: "browser", value: `${d.browser} ${d.browserVersion}` },
        { label: "operating system", value: d.os },
        { label: "device type", value: d.device },
        { label: "screen resolution", value: d.screenResolution },
        { label: "language", value: d.language },
      ],
    },
  ];
});

const fetchWhoAreYou = async () => {
  try {
    loading.value = true;
    error.value = null;

    const ua = navigator.userAgent;
    const browser = detectBrowser(ua);
    const [response] = await Promise.all([
      fetch("https://ipapi.co/json/"),
      new Promise((resolve) => setTimeout(resolve, 0)),
    ]);

    if (!response.ok) {
      throw new Error(`http error! status: ${response.status}`);
    }

    const data = await response.json();

    whoAreYouData.value = {
      ip: data.ip || "unknown",
      city: data.city || "unknown",
      region: data.region || "unknown",
      country: data.country_name || "unknown",
      location: `${data.latitude || "?"}, ${data.longitude || "?"}`,
      timezone: data.timezone || "unknown",
      isp: data.org || "unknown",
      browser: browser.name,
      browserVersion: browser.version,
      os: detectOS(ua),
      device: detectDevice(ua),
      screenResolution: `${window.screen.width} x ${window.screen.height}`,
      language: navigator.language || "unknown",
      userAgent: ua,
    };
  } catch (e) {
    error.value = e instanceof Error ? e.message : "failed to fetch data";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWhoAreYou);
</script>

<template>
  <div class="whoareyou-container">
    <div v-if="loading" class="whoareyou-loading">loading whoareyou...</div>
    <div v-else-if="error" class="whoareyou-error">error: {{ error }}</div>
    <div v-else-if="whoAreYouData" class="whoareyou-data">
      <div
        v-for="section in sections"
        :key="section.title"
        class="info-section"
      >
        <h3>{{ section.title }}</h3>
        <div v-for="item in section.items" :key="item.label" class="info-item">
          <span class="label">{{ item.label.toLowerCase() }}:</span>
          <span class="value">{{ item.value.toLowerCase() }}</span>
        </div>
      </div>

      <div class="info-section">
        <h3>user agent</h3>
        <div class="user-agent">
          {{ whoAreYouData.userAgent.toLowerCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.whoareyou-container {
  padding: 1rem;
  font-family: var(--vp-font-family-base);
}

.whoareyou-loading,
.whoareyou-error {
  padding: 1rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.whoareyou-error {
  color: var(--vp-c-danger-1);
}

.whoareyou-data {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-section {
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-soft);
}

.info-section h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 0.5rem;
}

.label {
  font-size: 0.875rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
  flex: 0 0 auto;
  white-space: nowrap;
}

.value {
  font-size: 0.875rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  text-align: left;
  flex: 1;
  word-break: break-word;
}

.user-agent {
  padding: 0.75rem;
  background-color: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  word-break: break-all;
  line-height: 1.5;
}
</style>
