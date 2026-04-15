<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useData } from "vitepress";

const { lang } = useData();
const isZh = computed(() => lang.value.startsWith("zh"));

const TITLE = "Terminal";
const NAME = "Whatchamacallit";
const VERSION = "v3.14159";
const HEADING = "luojiahai";
const TAGLINE = computed(() => (isZh.value ? "INTJ · 计算机程序员" : "INTJ · Computer Programmer"));
const EMAIL = "luo[at]jiahai.co";

const SHOW_LOGO_FRAME = false;

const LOGO_ART = `
█ ▀ █
█ █ █
█ █ █ ▌
▌▄█ █ █
`.trim();

const BORDER_SIDES = Array(8).fill("│").join("\n");
const LOGO_FRAME_BORDER_LEFT = `╭\n${BORDER_SIDES}\n╰`;
const LOGO_FRAME_BORDER_RIGHT = `╮\n${BORDER_SIDES}\n╯`;

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
        "I'm a computer programmer building useful things. I'm deeply practicing in AI-native workflows. I live in Claude Code.",
    },
    {
      question: "What are you working on?",
      answer: "I'm working on an interesting project, check it out at http://localhost:5173.",
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
      answer: "我是一名计算机程序员，致力于构建有用的东西。我在深度实践 AI 原生工作流，常驻 Claude Code。",
    },
    {
      question: "你在做什么项目？",
      answer: "我在做一个有趣的项目，访问 http://localhost:5173 看看吧。",
    },
    {
      question: "编程之外你有什么爱好？",
      answer: "编程之外，我喜欢吃饭、做饭和逛超市。我玩微软飞行模拟器，驾驶空客。",
    },
  ],
};

const conversation = computed(() => CONVERSATION[isZh.value ? "zh" : "en"]);

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

const language = ref("");
const device = ref("");
const operatingSystem = ref("");
const browser = ref("");

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
  device.value = detectDevice(ua);
  operatingSystem.value = detectOS(ua);
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
    left: `─── `,
    name: NAME,
    version: VERSION,
    right: " " + "─".repeat(Math.max(0, fill)),
  };
});

const logoFrameBottom = computed(() => {
  return "─".repeat(Math.max(0, numChars.value - 2));
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
  resizeObserver = new ResizeObserver(updateNumChars);
  if (terminalContent.value) {
    resizeObserver.observe(terminalContent.value);
  }
  document.fonts.ready.then(updateNumChars);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <div class="terminal-frame">
    <div class="terminal-header">
      <div class="header-title">{{ TITLE }}</div>
      <div class="header-controls">
        <span class="header-control-button minimize">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </span>
        <span class="header-control-button maximize">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.75" y="0.75" width="8.5" height="8.5" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </span>
        <span class="header-control-button close">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.75" y1="0.75" x2="9.25" y2="9.25" stroke="currentColor" stroke-width="1.5" />
            <line x1="9.25" y1="0.75" x2="0.75" y2="9.25" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </span>
      </div>
    </div>
    <div ref="terminalContent" class="terminal-content">
      <span ref="charMeasure" class="char-measure">─</span>
      <div v-if="SHOW_LOGO_FRAME" class="logo-frame" :style="{ width: logoFrameWidth }">
        <div class="logo-frame-border">{{ LOGO_FRAME_BORDER_LEFT }}</div>
        <div class="logo-inner">
          <!-- prettier-ignore -->
          <div class="logo-frame-top">
            <span>{{ logoFrameTop.left }}</span>
            <span class="logo-frame-top-name">{{ logoFrameTop.name }}</span>&nbsp;<span class="logo-frame-top-version">{{ logoFrameTop.version }}</span>
            <span>{{ logoFrameTop.right }}</span>
          </div>
          <div class="logo">
            <div class="logo-art-container">
              <div class="logo-art">{{ LOGO_ART }}</div>
            </div>
            <div class="logo-info-container">
              <div class="logo-heading">{{ HEADING }}</div>
              <div class="logo-tagline-container">
                <div class="logo-tagline">{{ TAGLINE }}</div>
                <div class="logo-tagline">{{ EMAIL }}</div>
              </div>
            </div>
            <div class="logo-spacer"></div>
          </div>
          <div class="logo-frame-bottom">{{ logoFrameBottom }}</div>
        </div>
        <div class="logo-frame-border">{{ LOGO_FRAME_BORDER_RIGHT }}</div>
      </div>
      <div v-else class="logo">
        <div class="logo-art-container">
          <div class="logo-art">{{ LOGO_ART }}</div>
        </div>
        <div class="logo-info-container">
          <div class="logo-heading">{{ HEADING }}</div>
          <div class="logo-tagline-container">
            <div class="logo-tagline">{{ TAGLINE }}</div>
            <div class="logo-tagline">{{ EMAIL }}</div>
          </div>
        </div>
        <div class="logo-spacer"></div>
      </div>
      <div class="conversation">
        <div v-for="turn in conversation" :key="turn.question" class="turn">
          <div class="user-line">{{ turn.question }}</div>
          <div class="assistant-line">{{ turn.answer }}</div>
        </div>
      </div>
      <div class="input-border">{{ "─".repeat(numChars) }}</div>
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
      <div class="input-border">{{ "─".repeat(numChars) }}</div>
    </div>
    <div class="terminal-footer">
      <span>Language: {{ language }}</span>
      <span class="separator">|</span>
      <span>Device: {{ device }}</span>
      <span class="separator">|</span>
      <span>Operating System: {{ operatingSystem }}</span>
      <span class="separator">|</span>
      <span>Browser: {{ browser }}</span>
    </div>
  </div>
</template>

<style scoped>
.terminal-frame {
  margin: 0 -24px;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-radius: 8px;
  border: 1px solid var(--vp-c-gutter);
}

.terminal-frame::-webkit-scrollbar {
  display: none;
}

@media (min-width: 640px) {
  .terminal-frame {
    margin: 0 0;
  }
}

.terminal-header {
  display: flex;
  align-items: stretch;
  padding: 0 0 0 8px;
  height: 40px;
  background-color: var(--vp-c-bg-alt);
  position: relative;
  color: var(--vp-c-text-2);
}

.header-title {
  flex: 1;
  display: flex;
  align-items: center;
}

.header-title::before {
  content: "✳";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  margin-right: 4px;
}

.header-controls {
  display: flex;
  flex-shrink: 0;
  margin-left: auto;
  align-self: stretch;
}

.header-control-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  cursor: default;
  user-select: none;
}

.header-control-button:hover {
  background-color: var(--vp-c-gutter);
}

.header-control-button.close:hover {
  background-color: var(--color-blush);
  color: color-mix(in hsl, var(--color-blush), black 50%);
}

.terminal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 8px 1lh;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.terminal-content::-webkit-scrollbar {
  display: none;
}

.logo-frame {
  display: flex;
  align-items: stretch;
}

.logo-inner {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.logo {
  display: flex;
  align-items: flex-start;
  flex: 1;
}

.logo-frame-top,
.logo-frame-bottom {
  line-height: 1;
  color: var(--vp-c-text-1);
}

.logo-frame-top-name {
  color: var(--vp-c-text-1);
}

.logo-frame-top-version {
  color: var(--vp-c-text-2);
}

.logo-frame-border {
  white-space: pre;
  margin: 0;
  padding: 0;
  line-height: 1;
  color: var(--vp-c-text-1);
}

.logo-spacer {
  flex: 1;
}

.logo-art-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 0 24px;
}

.logo-art {
  font-family: var(--cascadia-mono);
  white-space: pre;
  margin: 0;
  line-height: 1;
  color: var(--vp-c-text-1);
  letter-spacing: -1px;
}

.logo-info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  white-space: pre-wrap;
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
  gap: 0.5lh;
}

.user-line {
  display: flex;
  align-items: baseline;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-elv);
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

.input-border {
  color: var(--vp-c-border);
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

.terminal-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  font-size: 12px;
  background-color: var(--vp-c-bg-alt);
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
