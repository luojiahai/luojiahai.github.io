<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useData } from "vitepress";

const { lang } = useData();

const NAME = "luojiahai";
const VERSION = "v3.14159";
const HEADING = computed(() => (lang.value.startsWith("zh") ? "你好，世界！" : "Hello, World!"));
const TAGLINE = computed(() =>
  lang.value.startsWith("zh") ? "INTJ 性格 · Claude 用户" : "INTJ Personality · Claude User",
);
const EMAIL = "luo[at]jiahai.co";
const SHORTCUT = computed(() => (lang.value.startsWith("zh") ? "? 获取快捷方式" : "? for shortcuts"));

const LOGO_ART = `
█ ▀ █
█ █ █
█ █ █ ▌
█ █ █ █
▌▄█ █ █
`.trim();

const LOGO_FRAME_BORDER = "|".repeat(8).split("").join("\n");

type Conversation = Array<{
  question: string;
  answer: string;
}>;

const CONVERSATION: Record<string, Conversation> = {
  en: [
    {
      question: "Who are you?",
      answer:
        "Hi there, I'm luojiahai. I also go by Geoffrey. I was born in Guangzhou, China, and I'm currently based in Melbourne, Australia.",
    },
    {
      question: "What do you do?",
      answer:
        "I'm a pragmatic programmer, building useful things. I'm deep into AI-native development workflows. I live in Claude Code.",
    },
    {
      question: "What do you do outside of programming?",
      answer:
        "Outside of programming, I like eating, cooking, and grocery shopping. I play Microsoft Flight Simulator, flying Airbus.",
    },
  ],
  zh: [
    {
      question: "你是谁？",
      answer: "你好，我是罗嘉海，英文名 Geoffrey。我出生于中国广州，目前定居于澳大利亚墨尔本。",
    },
    {
      question: "你是做什么的？",
      answer: "我是一名务实的程序员，专注构建实用的东西。我深度投入 AI 原生开发工作流，常驻 Claude Code。",
    },
    {
      question: "编程之外你有什么爱好？",
      answer: "编程之外，我喜欢吃饭、做饭和逛超市。我玩微软飞行模拟器，驾驶空客。",
    },
  ],
};

const conversation = computed(() => CONVERSATION[lang.value.startsWith("zh") ? "zh" : "en"]);

const language = ref("");
const deviceOS = ref("");
const browser = ref("");
const currentTime = ref(new Date());
let timer: ReturnType<typeof setInterval>;

const pad = (n: number) => String(n).padStart(2, "0");

const dateTime = computed(() => {
  const date = currentTime.value;
  const offset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const offsetMinutes = Math.abs(offset) % 60;
  const sign = offset >= 0 ? "+" : "-";
  const utcOffset = offsetMinutes > 0 ? `UTC${sign}${offsetHours}:${pad(offsetMinutes)}` : `UTC${sign}${offsetHours}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return `${date.toLocaleString()} ${utcOffset} ${timezone}`;
});

const BROWSER_PATTERNS = [
  { pattern: /Firefox\/([\d.]+)/, name: "Firefox" },
  { pattern: /Edg\/([\d.]+)/, name: "Edge" },
  { pattern: /Chrome\/([\d.]+)/, name: "Chrome", exclude: /Edg\// },
  {
    pattern: /Version\/([\d.]+)/,
    name: "Safari",
    check: /Safari\/(?!.*Chrome)/,
  },
  { pattern: /(?:Opera|OPR)\/([\d.]+)/, name: "Opera" },
] as const;

const OS_PATTERNS = [
  { pattern: /Win/, name: "Windows" },
  { pattern: /iPhone|iPad|iOS/, name: "iOS" },
  { pattern: /Mac/, name: "macOS" },
  { pattern: /Android/, name: "Android" },
  { pattern: /Linux/, name: "Linux" },
] as const;

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
  return "Unknown Browser";
};

const detectOS = (ua: string): string => {
  for (const { pattern, name } of OS_PATTERNS) {
    if (pattern.test(ua)) return name;
  }
  return "Unknown OS";
};

const detectDevice = (ua: string): string => {
  if (ua.includes("Mobile")) return "Mobile";
  if (ua.includes("Tablet") || ua.includes("iPad")) return "Tablet";
  return "Desktop";
};

const initSystemInfo = (): void => {
  const ua = navigator.userAgent;
  language.value = navigator.language || "Unknown";
  deviceOS.value = `${detectDevice(ua)} ${detectOS(ua)}`;
  browser.value = detectBrowser(ua);
};

const terminalContent = ref<HTMLElement | null>(null);
const charMeasure = ref<HTMLElement | null>(null);
const charWidth = ref(0);
const numChars = ref(80);
let resizeObserver: ResizeObserver | null = null;

const logoFrameTop = computed(() => {
  const label = ` ${NAME} ${VERSION} `;
  const fill = numChars.value - 5 - label.length;
  return {
    left: `╭───` + " ",
    name: NAME,
    version: VERSION,
    right: " " + "─".repeat(Math.max(0, fill)) + "╮",
  };
});

const logoFrameBottom = computed(() => {
  return "╰" + "─".repeat(Math.max(0, numChars.value - 2)) + "╯";
});

const logoFrameWidth = computed(() => (charWidth.value > 0 ? `${numChars.value * charWidth.value}px` : "100%"));

const updateNumChars = () => {
  if (!terminalContent.value || !charMeasure.value) return;
  const measured = charMeasure.value.getBoundingClientRect().width;
  if (measured > 0) {
    charWidth.value = measured;
    numChars.value = Math.floor(terminalContent.value.clientWidth / measured) - 2; // subtract 2 to prevent overflow
  }
};

onMounted(() => {
  initSystemInfo();
  timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
  resizeObserver = new ResizeObserver(updateNumChars);
  if (terminalContent.value) {
    resizeObserver.observe(terminalContent.value);
  }
  document.fonts.ready.then(updateNumChars);
});

onUnmounted(() => {
  clearInterval(timer);
  resizeObserver?.disconnect();
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
      <div class="title">✳ localhost (node)</div>
    </div>
    <div ref="terminalContent" class="terminal-content">
      <span ref="charMeasure" class="char-measure">─</span>
      <!-- prettier-ignore -->
      <div class="logo-frame-top">
        <span>{{ logoFrameTop.left }}</span>
        <span class="logo-frame-top-name">{{ logoFrameTop.name }}</span>&nbsp;<span class="logo-frame-top-version">{{ logoFrameTop.version }}</span>
        <span>{{ logoFrameTop.right }}</span>
      </div>
      <div class="logo" :style="{ width: logoFrameWidth }">
        <pre class="logo-frame-border">{{ LOGO_FRAME_BORDER }}</pre>
        <pre class="logo-art">{{ LOGO_ART }}</pre>
        <div class="logo-info">
          <span class="logo-heading">{{ HEADING }}</span>
          <div class="logo-tagline">{{ TAGLINE }}</div>
          <div class="logo-tagline">{{ EMAIL }}</div>
        </div>
        <div class="logo-spacer"></div>
        <pre class="logo-frame-border">{{ LOGO_FRAME_BORDER }}</pre>
      </div>
      <div class="logo-frame-bottom">{{ logoFrameBottom }}</div>
      <div class="conversation">
        <div v-for="turn in conversation" :key="turn.question" class="turn">
          <div class="user-line">{{ turn.question }}</div>
          <div class="assistant-line">{{ turn.answer }}</div>
        </div>
      </div>
      <div class="divider">{{ "─".repeat(numChars) }}</div>
      <div class="terminal-input">
        <textarea
          id="terminal-input-area"
          class="input-area"
          rows="1"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          inputmode="text"
          @keydown.enter.prevent
          @keydown.tab.prevent
        ></textarea>
      </div>
      <div class="divider">{{ "─".repeat(numChars) }}</div>
      <span class="shortcut">{{ SHORTCUT }}</span>
    </div>
    <div class="terminal-footer">
      <span>{{ dateTime }}</span>
      <span class="separator">|</span>
      <span>{{ language }}</span>
      <span class="separator">|</span>
      <span>{{ deviceOS }}</span>
      <span class="separator">|</span>
      <span>{{ browser }}</span>
    </div>
  </div>
</template>

<style scoped>
.terminal-frame {
  margin: 48px -24px;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-radius: 8px;
}

.terminal-frame::-webkit-scrollbar {
  display: none;
}

@media (min-width: 640px) {
  .terminal-frame {
    margin: 48px 0;
  }
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  background-color: var(--vp-c-bg-elv);
  position: relative;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--vp-c-text-2);
}

.controls {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.control-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  font-size: 12px;
  border-radius: 50% !important;
  color: var(--vp-c-bg-soft);
  user-select: none;
}

.control-button.close {
  background-color: var(--color-blush);
}

.control-button.minimize {
  background-color: var(--color-egg);
}

.control-button.maximize {
  background-color: var(--color-olive);
}

.terminal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 8px 1lh;
  line-height: 1.3;
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

.logo {
  display: flex;
  align-items: flex-start;
}

.logo-frame-top,
.logo-frame-bottom {
  color: var(--vp-c-brand-1);
  line-height: 1;
}

.logo-frame-top-name {
  color: var(--vp-c-brand-1);
}

.logo-frame-top-version {
  color: var(--vp-c-text-2);
}

.logo-frame-border {
  margin: 0;
  padding: 0;
  line-height: 1;
  color: var(--vp-c-brand-1);
  background: transparent;
  border: none;
  white-space: pre;
  flex-shrink: 0;
}

.logo-spacer {
  flex: 1;
}

.logo-art {
  margin: 24px 24px 0;
  font-family: var(--vp-font-family-mono);
  line-height: 1;
  color: var(--vp-c-brand-1);
  background: transparent;
  border: none;
  white-space: pre;
  flex-shrink: 0;
}

.logo-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  margin-top: 24px;
  white-space: pre-wrap;
  line-height: 1.5;
}

.logo-heading {
  color: var(--vp-c-text-1);
}

.logo-tagline {
  color: var(--vp-c-text-2);
}

.conversation {
  display: flex;
  flex-direction: column;
  gap: 1lh;
  margin: 1lh 0;
  width: 100%;
  white-space: normal;
}

.turn {
  display: flex;
  flex-direction: column;
  gap: 1lh;
}

.user-line {
  display: flex;
  align-items: baseline;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-gutter);
}

.assistant-line {
  display: flex;
  align-items: baseline;
  color: var(--vp-c-text-2);
}

.char-measure {
  position: absolute;
  visibility: hidden;
  pointer-events: none;
}

.divider {
  color: var(--vp-c-text-3);
  line-height: 1;
}

.terminal-input {
  display: flex;
  width: 100%;
}

.input-area {
  font-size: inherit;
  width: inherit;
  margin: 0;
  color: inherit;
  background-color: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  resize: none;
  white-space: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.shortcut {
  color: var(--vp-c-text-2);
  padding: 0 20px;
}

.terminal-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 12px;
  background-color: var(--vp-c-bg-elv);
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.terminal-footer::-webkit-scrollbar {
  display: none;
}

.separator {
  color: var(--vp-c-divider);
  user-select: none;
}

.terminal-input::before,
.user-line::before {
  content: "❯";
  display: inline-flex;
  width: 8px;
  margin-right: 12px;
}

.assistant-line::before {
  content: "●";
  display: inline-flex;
  width: 8px;
  margin-right: 12px;
}
</style>
