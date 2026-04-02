<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useData } from "vitepress";

withDefaults(
  defineProps<{
    name?: string;
    version?: string;
    subtitle?: string;
    path?: string;
  }>(),
  {
    name: "luojiahai",
    version: "v3.14159",
    subtitle: "INTJ Personality · Claude User",
    path: "/luojiahai.com/home",
  },
);

const LOGO_ART = `█ ▀ █
█ █ █
█ █ █ ▌
█ █ █ █
▌▄█ █ █`;

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
      answer:
        "你好，我是罗嘉海，英文名 Geoffrey。我出生于中国广州，目前定居于澳大利亚墨尔本。",
    },
    {
      question: "你是做什么的？",
      answer:
        "我是一名务实的程序员，专注构建实用的东西。我深度投入 AI 原生开发工作流，常驻 Claude Code。",
    },
    {
      question: "编程之外你有什么爱好？",
      answer:
        "编程之外，我喜欢吃饭、做饭和逛超市。我玩微软飞行模拟器，驾驶空客。",
    },
  ],
};

const { lang } = useData();
const conversation = computed(
  () => CONVERSATION[lang.value.startsWith("zh") ? "zh" : "en"],
);

const systemInfo = ref("");

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
  const language = navigator.language || "Unknown";
  const device = detectDevice(ua);
  const os = detectOS(ua);
  const browser = detectBrowser(ua);
  systemInfo.value = `${language} ${device} ${os} ${browser}`;
};

onMounted(() => {
  initSystemInfo();
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
      <div class="title">luojiahai@localhost</div>
    </div>
    <div class="terminal-content">
      <div class="logo">
        <pre class="logo-art">{{ LOGO_ART }}</pre>
        <div class="logo-info">
          <div>
            <span class="logo-name">{{ name }}</span>
            <span class="logo-version">{{ version }}</span>
          </div>
          <div class="logo-dim">{{ subtitle }}</div>
          <div class="logo-dim">{{ path }}</div>
        </div>
      </div>
      <div class="conversation">
        <div v-for="turn in conversation" :key="turn.question" class="turn">
          <div class="user-line">{{ turn.question }}</div>
          <div class="assistant-line">{{ turn.answer }}</div>
        </div>
      </div>
      <div class="divider" />
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
      <div class="divider" />
    </div>
    <div class="terminal-footer">
      <span>{{ systemInfo }}</span>
    </div>
  </div>
</template>

<style scoped>
.terminal-frame {
  margin: 24px -24px;
  font-family: var(--vp-font-family-mono);
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
    margin: 24px 0;
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

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  user-select: none;
}

.terminal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 0;
  font-size: 16px;
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

.logo {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px 24px;
}

.logo-art {
  margin: 0;
  padding: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
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
  justify-content: center;
  gap: 0;
  font-size: 14px;
  line-height: 1.5;
  padding-top: 2px;
}

.logo-name {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.logo-version {
  margin-left: 0.5ch;
  color: var(--vp-c-text-2);
}

.logo-dim {
  color: var(--vp-c-text-2);
}

.conversation {
  display: flex;
  flex-direction: column;
  gap: 1lh;
  margin: 1lh 4px;
  width: 100%;
  font-size: 14px;
  white-space: normal;
}

.turn {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-line {
  display: flex;
  align-items: baseline;
  color: var(--vp-c-text-1);
}

.assistant-line {
  display: flex;
  align-items: baseline;
  color: var(--vp-c-text-2);
}

.divider {
  width: 100%;
  height: 0;
  border-top: 1px solid var(--vp-c-text-2);
  margin: 0 4px;
}

.terminal-input {
  display: flex;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  margin: 4px 4px;
}

.input-area {
  width: inherit;
  margin: 0;
  color: inherit;
  background-color: inherit;
  font-family: inherit;
  font-size: 14px;
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
  padding: 8px 16px;
  font-size: 12px;
  line-height: 1.5;
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

.terminal-input::before,
.user-line::before {
  content: "❯";
  display: inline-flex;
  width: 8px;
  margin-right: 12px;
  -webkit-text-fill-color: var(--vp-c-brand-1);
}

.assistant-line::before {
  content: "●";
  display: inline-flex;
  width: 8px;
  margin-right: 12px;
  -webkit-text-fill-color: var(--vp-c-brand-1);
}
</style>
