<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
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

const confirmNavigation = () => {
  if (url.value) {
    window.open(url.value, "_blank", "noopener,noreferrer");
  }
  closeModal();
};

const closeModal = () => {
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
  <Teleport to="body">
    <Transition name="modal">
      <div v-show="showModal" class="modal-mask" @click.self="closeModal">
        <div class="modal-container">
          <h3 class="modal-title">{{ props.title }}</h3>
          <p class="modal-message">
            {{ props.message }}
          </p>
          <p class="modal-url">{{ url }}</p>
          <div class="modal-footer">
            <button class="modal-button" @click="closeModal">
              {{ props.cancelText }}
            </button>
            <button class="modal-button" @click="confirmNavigation">
              {{ props.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
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
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vp-c-bg-elv);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
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
  background-color: var(--vp-c-gray-3);
  border-radius: 4px;
  color: var(--vp-c-text-1);
  font-size: 12px;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
}

.modal-footer {
  margin: 8px 0 0 0;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.modal-button {
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1 1 auto;
}

@media (max-width: 639px) {
  .modal-button {
    flex: 1 1 100%;
  }
}

.modal-button {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.modal-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
