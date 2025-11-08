<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Modal from "./Modal.vue";

const props = defineProps<{
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}>();

const showModal = ref(false);
const url = ref("");

const handleClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const anchor = target.closest("a");

  if (!anchor) return;

  const href = anchor.getAttribute("href");
  if (href && href.includes("://")) {
    e.preventDefault();
    e.stopPropagation();
    url.value = href;
    showModal.value = true;
  }
};

const handleConfirm = () => {
  if (url.value) {
    window.open(url.value, "_blank", "noopener,noreferrer");
  }
  handleCancel();
};

const handleCancel = () => {
  showModal.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClick, true);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClick, true);
});
</script>

<template>
  <Modal :show="showModal" @close="handleCancel">
    <template #title>{{ props.title }}</template>
    <template #content>
      <p class="modal-message">
        {{ props.message }}
      </p>
      <p class="modal-url">{{ url }}</p>
    </template>
    <template #footer>
      <button class="modal-button brand" @click="handleConfirm">
        {{ props.confirmText }}
      </button>
      <button class="modal-button alt" @click="handleCancel">
        {{ props.cancelText }}
      </button>
    </template>
  </Modal>
</template>

<style scoped>
.modal-message {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.modal-url {
  padding: 8px 12px;
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
}

.modal-button {
  padding: 6px 16px;
  border: 1px solid;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  flex: 1;
}

@media (max-width: 639px) {
  .modal-button {
    flex: 1 1 100%;
  }
}

.modal-button.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-c-yellow-1);
}

.modal-button.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.modal-button.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-c-yellow-2);
}

.modal-button.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}
</style>
