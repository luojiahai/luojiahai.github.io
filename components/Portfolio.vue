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
      company: "REA Group (realestate.com.au)",
      description:
        "Led full-stack delivery of an LLM-powered review summary feature on realestate.com.au agent search pages, surfacing AI-generated insights from ratings and reviews to improve agent discoverability.",
      techStack: ["TypeScript", "Effect-TS", "OpenAI Agent SDK", "PostgreSQL"],
    },
    {
      name: "Agent/Agency Search, Profile, and Ratings & Reviews",
      company: "REA Group (realestate.com.au)",
      description:
        "Owned the full-stack systems powering agent and agency search, profile, and ratings & reviews on realestate.com.au. Re-platformed the search pages onto a microfrontend architecture, modernising the frontend experience.",
      techStack: ["TypeScript", "React", "GraphQL", "PostgreSQL"],
    },
    {
      name: "Customer Marketing Journey",
      company: "REA Group (realestate.com.au)",
      description:
        'Built a data pipeline consolidating customer profiles into marketable audiences and delivered a marketing preference management feature, enabling omni-channel communications to real estate agents and increasing customer engagement. Recognised with the "Real Deal" award.',
      techStack: ["TypeScript", "GraphQL", "PostgreSQL", "Kafka"],
    },
    {
      name: "Change Management Tool",
      company: "Amazon Web Services (AWS)",
      description:
        "Owned an internal change management tool enforcing structured change governance across software systems and infrastructure. Built a change automation capability, increasing change velocity and reducing manual toil.",
      techStack: ["Java", "TypeScript", "Python", "DynamoDB", "Elasticsearch", "PostgreSQL", "CDK"],
    },
  ],
  zh: [
    {
      name: "评分与评价摘要生成（LLM 驱动）",
      company: "REA 集团（realestate.com.au）",
      description:
        "主导了 realestate.com.au 经纪人搜索页面上 LLM 驱动的评价摘要功能的全栈交付，将评分与评价转化为 AI 生成的洞察，提升经纪人的可发现性。",
      techStack: ["TypeScript", "Effect-TS", "OpenAI Agent SDK", "PostgreSQL"],
    },
    {
      name: "经纪人/中介搜索、主页及评分与评价",
      company: "REA 集团（realestate.com.au）",
      description:
        "负责 realestate.com.au 上经纪人与中介的搜索、主页及评分评价功能的全栈系统。将搜索页面迁移至微前端架构，全面现代化前端体验。",
      techStack: ["TypeScript", "React", "GraphQL", "PostgreSQL"],
    },
    {
      name: "客户营销旅程",
      company: "REA 集团（realestate.com.au）",
      description:
        "构建数据管道，将客户档案整合为可触达的营销受众，并交付了营销偏好管理功能，实现对房地产经纪人的全渠道沟通，提升客户参与度。荣获公司“Real Deal”奖项。",
      techStack: ["TypeScript", "GraphQL", "PostgreSQL", "Kafka"],
    },
    {
      name: "变更管理工具",
      company: "亚马逊云科技（AWS）",
      description:
        "负责一款内部变更管理工具，对软件系统与基础设施实施结构化变更治理。构建了变更自动化能力，提升变更效率，减少人工操作成本。",
      techStack: ["Java", "TypeScript", "Python", "DynamoDB", "Elasticsearch", "PostgreSQL", "CDK"],
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
  margin: 32px auto;
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
  font-size: 14px;
  font-style: italic;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.item-description {
  margin: 4px 0 6px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.item-tech {
  font-size: 14px;
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

@media (max-width: 639px) {
  .item-header {
    flex-direction: column;
    gap: 2px;
  }

  .item-company {
    white-space: normal;
  }
}
</style>
