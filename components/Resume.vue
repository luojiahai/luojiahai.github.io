<script setup lang="ts">
interface Props {
  locale?: "en" | "zh";
}

const props = withDefaults(defineProps<Props>(), {
  locale: "en",
});

const content = {
  en: {
    sections: {
      experience: "experience",
      skills: "skills",
      education: "education",
    },
    experience: [
      {
        name: "rea group",
        location: "melbourne, vic, australia",
        positions: [
          { title: "senior software engineer", period: "2025 - present" },
          { title: "software engineer", period: "2024 - 2025" },
        ],
      },
      {
        name: "amazon web services (aws)",
        location: "sydney, nsw, australia",
        positions: [
          { title: "software development engineer", period: "2021 - 2024" },
        ],
      },
      {
        name: "deloitte",
        location: "melbourne, vic, australia",
        positions: [
          { title: "software development consultant", period: "2020 - 2021" },
        ],
      },
      {
        name: "the university of melbourne",
        location: "melbourne, vic, australia",
        positions: [{ title: "teaching assistant", period: "2018 - 2020" }],
      },
    ],
    skills: [
      {
        category: "programming languages",
        items: "python, typescript, java, c",
      },
      {
        category: "technologies",
        items:
          "amazon web services (aws), docker, kafka, graphql, postgresql, react",
      },
    ],
    education: [
      {
        name: "the university of melbourne",
        location: "melbourne, vic, australia",
        programs: [
          {
            degree: "master of science (computer science)",
            period: "2018 - 2020",
          },
          { degree: "bachelor of science", period: "2015 - 2018" },
        ],
      },
      {
        name: "peking university",
        location: "beijing, china",
        programs: [
          {
            degree:
              "pkussi (peking university summer school international) program",
            period: "summer 2016",
          },
        ],
      },
    ],
  },
  zh: {
    sections: {
      experience: "工作经历",
      skills: "专业技能",
      education: "教育背景",
    },
    experience: [
      {
        name: "rea 集团",
        location: "澳大利亚墨尔本",
        positions: [
          { title: "高级软件工程师", period: "2025 - present" },
          { title: "软件工程师", period: "2024 - 2025" },
        ],
      },
      {
        name: "亚马逊云科技（aws）",
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
    skills: [
      { category: "编程语言", items: "python, typescript, java, c" },
      {
        category: "应用技术",
        items:
          "amazon web services (aws), docker, kafka, graphql, postgresql, react",
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
        programs: [{ degree: "北京大学暑期学校国际课程", period: "2016 夏" }],
      },
    ],
  },
};

const currentContent = content[props.locale];
</script>

<template>
  <div class="resume">
    <h2 class="section-title">{{ currentContent.sections.experience }}</h2>
    <ul class="experience-list">
      <li
        v-for="experience in currentContent.experience"
        :key="experience.name"
        class="experience-item"
      >
        <div class="experience-header">
          <span class="experience-name"
            ><strong>{{ experience.name }}</strong></span
          >
          <span class="experience-location"
            ><strong>{{ experience.location }}</strong></span
          >
        </div>
        <ul class="positions-list">
          <li
            v-for="position in experience.positions"
            :key="position.title"
            class="position-item"
          >
            <span class="position-title"
              ><em>{{ position.title }}</em></span
            >
            <span class="position-period">{{ position.period }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <h2 class="section-title">{{ currentContent.sections.skills }}</h2>
    <ul class="skills-list">
      <li v-for="skill in currentContent.skills" :key="skill.category">
        <strong>{{ skill.category }}</strong
        >: {{ skill.items }}
      </li>
    </ul>
    <h2 class="section-title">{{ currentContent.sections.education }}</h2>
    <ul class="education-list">
      <li
        v-for="institution in currentContent.education"
        :key="institution.name"
        class="institution-item"
      >
        <div class="institution-header">
          <span class="institution-name"
            ><strong>{{ institution.name }}</strong></span
          >
          <span class="institution-location"
            ><strong>{{ institution.location }}</strong></span
          >
        </div>
        <ul class="programs-list">
          <li
            v-for="program in institution.programs"
            :key="program.degree"
            class="program-item"
          >
            <span class="program-degree"
              ><em>{{ program.degree }}</em></span
            >
            <span class="program-period">{{ program.period }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.resume {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
}

.experience-list,
.education-list {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skills-list {
  list-style-type: none;
  padding-left: 0;
}

.experience-header,
.institution-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
}

.experience-name,
.institution-name {
  flex: 1;
  min-width: 0;
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
  .experience-header,
  .institution-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .experience-location,
  .institution-location {
    text-align: left;
  }

  .position-item,
  .program-item {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
