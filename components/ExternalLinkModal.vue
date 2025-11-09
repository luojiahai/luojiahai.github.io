<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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

const navigate = () => {
  if (url.value) {
    window.open(url.value, "_blank", "noopener,noreferrer");
  }
  closeModal();
};

const closeModal = () => {
  showModal.value = false;
};

const resetUrl = () => {
  url.value = "";
};

onMounted(() => {
  document.addEventListener("click", handleClick, true);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClick, true);
  resetUrl();
});
</script>

<template>
  <Teleport to="body">
    <div v-show="showModal" class="modal-mask" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-content">
          <h3 class="modal-title">{{ props.title }}</h3>
          <p class="modal-message">
            {{ props.message }}
          </p>
          <p class="modal-url">{{ url }}</p>
        </div>
        <hr class="modal-divider" />
        <div class="modal-footer">
          <button class="modal-button brand" @click="navigate">
            {{ props.confirmText }}
          </button>
          <button class="modal-button alt" @click="closeModal">
            {{ props.cancelText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  width: 300px;
  background-color: var(--vp-c-bg-elv);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-border);
}

.modal-content {
  padding: 20px 30px 16px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.modal-message {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.modal-url {
  padding: 8px 12px;
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
}

.modal-divider {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 0;
}

.modal-footer {
  padding: 16px 30px 20px;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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
