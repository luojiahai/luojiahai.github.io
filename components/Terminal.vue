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
    version: "v1.0.0",
    subtitle: "INTJ Personality",
    path: "~/",
  },
);

const LOGO_ART = `▐▌▀▐▌
▐▌█▐▌▌
▐▌█▐▌█
▐▄█▐▌█`;

const CONVERSATION: Record<string, { question: string; answer: string }[]> = {
  en: [
    {
      question: "Who are you?",
      answer:
        "Hi there, I'm luojiahai. This handle is the Pinyin of my name, 罗嘉海 (luó jiā hǎi). I also go by Geoffrey. I was born in Guangzhou, China, and I'm currently based in Melbourne, Australia.",
    },
    {
      question: "What do you do?",
      answer:
        "I'm a pragmatic programmer, building and maintaining full-stack software systems. I'm deep into AI-native development workflows. I live in Claude Code.",
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
        "你好，我是 luojiahai。这个网名是我名字罗嘉海的拼音。我的英文名叫 Geoffrey。我出生于中国广州，目前定居于澳大利亚墨尔本。",
    },
    {
      question: "你是做什么的？",
      answer:
        "我是一名务实的程序员，专注于构建和维护全栈软件系统。我深度参与 AI 原生开发工作流，日常在 Claude Code 中工作。",
    },
    {
      question: "编程之外你喜欢做什么？",
      answer:
        "编程之外，我喜欢吃饭、做饭和逛超市。我玩微软飞行模拟器，驾驶空客飞机。",
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
      <div class="claude-header">
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
          <div class="user-line"><span class="prompt">❯</span> {{ turn.question }}</div>
          <div class="assistant-line"><span class="bullet">●</span> {{ turn.answer }}</div>
        </div>
      </div>
      <div class="divider" />
      <div class="terminal-input">
        <span class="prompt">❯</span>
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
  gap: 4px;
  padding: 16px 16px;
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

.claude-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px 0;
}

.logo-art {
  margin: 0;
  padding: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 16px;
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
  margin: 1lh 0;
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
  gap: 8px;
  color: var(--vp-c-text-1);
}

.assistant-line {
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: var(--vp-c-text-2);
}

.bullet {
  width: 1ch;
  text-align: center;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.user-line .prompt {
  width: 1ch;
  text-align: center;
  padding-right: 0;
}

.divider {
  width: 100%;
  height: 0;
  border-top: 1px solid var(--vp-c-divider);
  margin: 2px 0;
}

.terminal-input {
  display: flex;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
}

.prompt {
  color: var(--vp-c-brand-1);
  user-select: none;
  padding-right: 4px;
}

.input-area {
  width: inherit;
  margin: 0;
  padding: 0 4px;
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
</style>
