<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

type PortfolioItem = {
  name: string;
  company: string;
  description: string;
  techStack: string[];
};

const PORTFOLIO: Record<string, PortfolioItem[]> = {
  en: [
    {
      name: "Ratings & Reviews Summary Generation (LLM powered)",
      company: "REA Group",
      description:
        "Led full-stack implementation of an LLM-powered review summary agent on agent search pages, surfacing AI-generated insights from ratings and reviews to improve agent discoverability.",
      techStack: ["TypeScript", "Effect-TS", "OpenAI Agent SDK", "PostgreSQL"],
    },
    {
      name: "Agent/Agency Search, Profile & Ratings Reviews",
      company: "REA Group",
      description:
        "Managed agent and agency search, profile, and ratings & reviews pages on realestate.com.au, replatforming the search pages onto a microfrontend architecture.",
      techStack: ["TypeScript", "React", "PostgreSQL"],
    },
    {
      name: "Customer Data Management",
      company: "REA Group",
      description:
        "Designed and built an event streaming system to propagate customer profile state changes from a legacy system to downstream consumers, reducing architectural complexity and simplifying data flow.",
      techStack: ["TypeScript", "Kafka", "PostgreSQL"],
    },
    {
      name: "Customer Marketing Audience Service",
      company: "REA Group",
      description:
        "Built a data pipeline that consolidates and transforms customer profile data from a legacy system into marketable audience segments, enabling omni-channel communications via Braze and increasing customer engagement.",
      techStack: ["TypeScript", "PostgreSQL", "Braze"],
    },
  ],
  zh: [
    {
      name: "评分与评价摘要生成（LLM 驱动）",
      company: "REA 集团",
      description:
        "主导了中介搜索页面 LLM 评价摘要智能体的全栈实现，将评分与评价中的 AI 洞察呈现给用户，提升中介的可发现性。",
      techStack: ["TypeScript", "Effect-TS", "OpenAI Agent SDK", "PostgreSQL"],
    },
    {
      name: "中介搜索、档案与评价页面",
      company: "REA 集团",
      description:
        "负责维护 realestate.com.au 上的中介与机构搜索、档案及评分评价页面，并将搜索页面迁移至微前端架构。",
      techStack: ["TypeScript", "React", "PostgreSQL"],
    },
    {
      name: "客户数据管理",
      company: "REA 集团",
      description:
        "设计并构建了事件流系统，将客户画像状态变更从旧系统实时传递至下游消费者，降低了架构复杂度并简化了数据流。",
      techStack: ["TypeScript", "Kafka", "PostgreSQL"],
    },
    {
      name: "客户营销受众服务",
      company: "REA 集团",
      description:
        "构建了数据管道，将旧系统中的客户画像数据整合并转换为可营销的受众细分，通过 Braze 实现全渠道触达，提升客户参与度。",
      techStack: ["TypeScript", "PostgreSQL", "Braze"],
    },
  ],
};

const { lang } = useData();
const items = computed(() => PORTFOLIO[lang.value.startsWith("zh") ? "zh" : "en"]);
</script>

<template>
  <div class="portfolio">
    <ul class="item-list">
      <li v-for="item in items" :key="item.name" class="item">
        <div class="item-header">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-company">{{ item.company }}</span>
        </div>
        <p class="item-description">{{ item.description }}</p>
        <div class="item-tech">
          <template v-for="(tech, i) in item.techStack" :key="tech">
            <span class="tech-token">{{ tech }}</span>
            <span v-if="i < item.techStack.length - 1" class="tech-separator">·</span>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.portfolio {
  margin: 0 auto 32px;
}

.item-list {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  border-left: 2px solid var(--vp-c-brand-1);
  padding-left: 16px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.item-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
  min-width: 0;
}

.item-company {
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.item-description {
  margin: 4px 0 6px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.item-tech {
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.tech-token {
  color: var(--vp-c-brand-1);
}

.tech-separator {
  color: var(--vp-c-text-3);
}
</style>
