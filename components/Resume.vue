<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

type Resume = {
  sections: {
    experience: string;
    education: string;
  };
  experience: Array<{
    name: string;
    location: string;
    positions: Array<{
      title: string;
      period: string;
    }>;
  }>;
  education: Array<{
    name: string;
    location: string;
    programs: Array<{
      degree: string;
      period: string;
    }>;
  }>;
};

const RESUME: Record<string, Resume> = {
  en: {
    sections: {
      experience: "Experience",
      education: "Education",
    },
    experience: [
      {
        name: "REA Group",
        location: "Melbourne, Victoria, Australia",
        positions: [
          { title: "Senior Software Engineer", period: "2025 - Present" },
          { title: "Software Engineer", period: "2024 - 2025" },
        ],
      },
      {
        name: "Amazon Web Services (AWS)",
        location: "Sydney, New South Wales, Australia",
        positions: [
          { title: "Software Development Engineer", period: "2021 - 2024" },
        ],
      },
      {
        name: "Deloitte",
        location: "Melbourne, Victoria, Australia",
        positions: [
          { title: "Software Development Consultant", period: "2020 - 2021" },
        ],
      },
      {
        name: "The University of Melbourne",
        location: "Melbourne, Victoria, Australia",
        positions: [{ title: "Teaching Assistant", period: "2018 - 2020" }],
      },
    ],
    education: [
      {
        name: "The University of Melbourne",
        location: "Melbourne, Victoria, Australia",
        programs: [
          {
            degree: "Master of Science (Computer Science)",
            period: "2018 - 2020",
          },
          { degree: "Bachelor of Science", period: "2015 - 2018" },
        ],
      },
      {
        name: "Peking University",
        location: "Beijing, China",
        programs: [
          {
            degree: "Summer School International Program",
            period: "Summer 2016",
          },
        ],
      },
    ],
  },
  zh: {
    sections: {
      experience: "工作经历",
      education: "教育背景",
    },
    experience: [
      {
        name: "REA 集团",
        location: "澳大利亚墨尔本",
        positions: [
          { title: "高级软件工程师", period: "2025 - present" },
          { title: "软件工程师", period: "2024 - 2025" },
        ],
      },
      {
        name: "亚马逊云科技（AWS）",
        location: "澳大利亚悉尼",
        positions: [{ title: "软件开发工程师", period: "2021 - 2024" }],
      },
      {
        name: "德勤",
        location: "澳大利亚墨尔本",
        positions: [{ title: "软件开发顾问", period: "2020 - 2021" }],
      },
      {
        name: "墨尔本大学",
        location: "澳大利亚墨尔本",
        positions: [{ title: "教学助理", period: "2018 - 2020" }],
      },
    ],
    education: [
      {
        name: "墨尔本大学",
        location: "澳大利亚墨尔本",
        programs: [
          { degree: "理学硕士（计算机科学）", period: "2018 - 2020" },
          { degree: "理学学士", period: "2015 - 2018" },
        ],
      },
      {
        name: "北京大学",
        location: "中国北京",
        programs: [{ degree: "暑期学校国际课程", period: "2016 夏" }],
      },
    ],
  },
};

const { lang } = useData();
const data = computed(() => RESUME[lang.value.startsWith("zh") ? "zh" : "en"]);
</script>

<template>
  <div class="resume">
    <h2 class="section-title">{{ data.sections.experience }}</h2>
    <ul class="experience-list">
      <li
        v-for="experience in data.experience"
        :key="experience.name"
        class="experience-item"
      >
        <div class="experience-header">
          <span class="experience-name">{{ experience.name }}</span>
          <span class="separator">|</span>
          <span class="experience-location">{{ experience.location }}</span>
        </div>
        <ul class="positions-list">
          <li
            v-for="position in experience.positions"
            :key="position.title"
            class="position-item"
          >
            <span class="position-title">{{ position.title }}</span>
            <span class="separator">|</span>
            <span class="position-period">{{ position.period }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <h2 class="section-title">{{ data.sections.education }}</h2>
    <ul class="education-list">
      <li
        v-for="institution in data.education"
        :key="institution.name"
        class="institution-item"
      >
        <div class="institution-header">
          <span class="institution-name">{{ institution.name }}</span>
          <span class="separator">|</span>
          <span class="institution-location">{{ institution.location }}</span>
        </div>
        <ul class="programs-list">
          <li
            v-for="program in institution.programs"
            :key="program.degree"
            class="program-item"
          >
            <span class="program-degree">{{ program.degree }}</span>
            <span class="separator">|</span>
            <span class="program-period">{{ program.period }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.resume {
  margin: 0 auto 32px;
}

.separator {
  display: none;
}

.experience-list,
.education-list {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.experience-header,
.institution-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.experience-name,
.institution-name {
  flex: 1;
  min-width: 0;
  font-weight: bold;
}

.experience-location,
.institution-location {
  flex: 1;
  min-width: 0;
  text-align: right;
}

.positions-list,
.programs-list {
  list-style-type: none;
  padding-left: 0;
  color: var(--vp-c-text-2);
}

.position-item,
.program-item {
  display: flex;
  justify-content: space-between;
}

.position-period,
.program-period {
  white-space: nowrap;
}

@media (max-width: 639px) {
  .separator {
    display: unset;
    color: var(--vp-c-divider);
  }

  .experience-list,
  .education-list {
    white-space: nowrap;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .experience-header,
  .institution-header {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
  }

  .experience-name,
  .institution-name {
    flex: none;
  }

  .experience-location,
  .institution-location {
    text-align: left;
  }

  .position-item,
  .program-item {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
  }
}

.experience-name::before,
.institution-name::before {
  font-family: var(--vp-font-family-mono);
  content: "❯";
  display: inline-flex;
  width: 8px;
  margin-right: 12px;
}

.position-title::before,
.program-degree::before {
  font-family: var(--vp-font-family-mono);
  content: "●";
  display: inline-flex;
  width: 8px;
  margin-right: 12px;
}
</style>
