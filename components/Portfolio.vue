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
        "Delivered an LLM-powered review summary feature on real estate agent search pages, leading the full-stack implementation from design to production, surfacing AI-generated insights from ratings and reviews to improve agent discoverability.",
      techStack: ["TypeScript", "Effect-TS", "OpenAI Agent SDK", "PostgreSQL"],
    },
    {
      name: "Agent/Agency Search, Profile, and Ratings & Reviews",
      company: "REA Group",
      description:
        "Managed the full-stack systems that power agent and agency search, profile, and ratings & reviews pages on realestate.com.au. Re-platformed the search pages onto a microfrontend architecture, modernising the frontend experience.",
      techStack: ["TypeScript", "React", "GraphQL", "PostgreSQL"],
    },
    {
      name: "Customer Marketing Journey",
      company: "REA Group",
      description: "Built a unified customer marketing service that consolidates customer profiles into marketable audiences, enabling omni-channel communications to real estate agents in the marketing platform, increasing customer engagement.",
      techStack: ["TypeScript", "GraphQL", "PostgreSQL", "Braze"],
    },
    {
      name: "Change Management Tool",
      company: "AWS",
      description: "Managed the change management tool that enables internal teams to define, review, schedule, and execute changes across software systems and infrastructure, enforcing structured change governance, increasing change velocity and reducing manual toil.",
      techStack: ["Java", "TypeScript", "Python", "DynamoDB", "Elasticsearch", "PostgreSQL", "CDK"],
    },
  ],
  zh: [
    {
      name: "评分与评价摘要生成（LLM 驱动）",
      company: "REA 集团",
      description:
        "在房产中介搜索页面上交付了 LLM 驱动的评价摘要功能，主导从设计到上线的全栈实现，将评分与评价中的 AI 生成洞察呈现给用户，提升中介的可发现性。",
      techStack: ["TypeScript", "Effect-TS", "OpenAI Agent SDK", "PostgreSQL"],
    },
    {
      name: "中介搜索、档案与评价页面",
      company: "REA 集团",
      description:
        "负责 realestate.com.au 上的中介与机构搜索、档案及评分评价页面的全栈系统。将搜索页面重构为微前端架构，提升并现代化了前端用户体验。",
      techStack: ["TypeScript", "React", "GraphQL", "PostgreSQL"],
    },
    {
      name: "客户营销旅程",
      company: "REA 集团",
      description:
        "构建了统一的客户营销服务，将客户画像整合为可营销的受众群体，在营销平台上为房产中介提供全渠道触达能力，提升客户参与度。",
      techStack: ["TypeScript", "PostgreSQL", "Braze"],
    },
    {
    name: "变更管理工具",
    company: "AWS",
    description: "负责变更管理工具的维护与迭代，支持内部团队对软件系统和基础设施的变更进行定义、审核、调度与执行。通过实施规范化的变更治理，提高变更效率并减少人工操作负担。",
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
