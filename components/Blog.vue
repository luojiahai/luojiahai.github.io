<script setup lang="ts">
type Post = {
  title: string;
  url: string;
  description: string;
  date: string;
  tags?: string[];
};

defineProps<{
  posts: Post[];
}>();
</script>

<template>
  <div class="blog">
    <ul class="item-list">
      <li v-for="post in posts" :key="post.url" class="item">
        <a :href="post.url" class="item-link">
          <div class="item-header">
            <span class="item-title">{{ post.title }}</span>
            <span class="item-date">{{ post.date }}</span>
          </div>
          <p class="item-description">{{ post.description }}</p>
          <div v-if="post.tags?.length" class="item-tags">
            <template v-for="(tag, i) in post.tags" :key="tag">
              <span class="tag-token">{{ tag }}</span>
              <span v-if="i < post.tags.length - 1" class="tag-separator">·</span>
            </template>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blog {
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
}

.item-link {
  display: block;
  text-decoration: none;
  color: inherit;
  padding-left: 16px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.item-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
  min-width: 0;
}

.item-date {
  font-style: italic;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

@media (max-width: 639px) {
  .item-header {
    flex-direction: column;
    gap: 2px;
  }

  .item-date {
    white-space: normal;
  }
}

.item-link:hover {
  background-color: var(--vp-c-brand-soft);
}

.item-link:hover .item-title {
  color: var(--vp-c-brand-1);
}

.item-description {
  margin: 4px 0 6px;
  color: var(--vp-c-text-2);
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.tag-token {
  color: var(--vp-c-brand-1);
}

.tag-separator {
  color: var(--vp-c-text-3);
}
</style>
