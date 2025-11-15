<script setup lang="ts">
interface ResumeData {
  sections: {
    experience: string;
    skills: string;
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
  skills: Array<{
    category: string;
    items: string;
  }>;
  education: Array<{
    name: string;
    location: string;
    programs: Array<{
      degree: string;
      period: string;
    }>;
  }>;
}

interface Props {
  data: ResumeData;
}
defineProps<Props>();
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
          <span class="experience-name"
            ><strong>{{ experience.name }}</strong></span
          >
          <span class="separator">|</span>
          <span class="experience-location">{{ experience.location }}</span>
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
            <span class="separator">|</span>
            <span class="position-period">{{ position.period }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <h2 class="section-title">{{ data.sections.skills }}</h2>
    <ul class="skills-list">
      <li v-for="skill in data.skills" :key="skill.category">
        <strong>{{ skill.category }}</strong
        >: {{ skill.items }}
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
          <span class="institution-name"
            ><strong>{{ institution.name }}</strong></span
          >
          <span class="separator">|</span>
          <span class="institution-location">{{ institution.location }}</span>
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

.section-title {
  margin-top: 24px;
  padding-top: 20px;
}

.experience-list,
.education-list {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  .separator {
    display: unset;
    color: var(--vp-c-divider);
  }

  .experience-list,
  .skills-list,
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
    gap: 8px;
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
</style>
