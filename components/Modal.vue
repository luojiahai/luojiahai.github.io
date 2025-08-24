<script setup lang="ts">
import { ref } from "vue";
const showModal = ref(false);
defineProps({
  buttonText: {
    type: String,
    default: "Show Modal",
  },
  modalContent: {
    type: String,
    default: "Hello from the modal!",
  },
  modalCloseButtonText: {
    type: String,
    default: "Close",
  },
});
</script>

<template>
  <button class="modal-button" @click="showModal = true">
    {{ buttonText }}
  </button>

  <Teleport to="body">
    <Transition name="modal">
      <div v-show="showModal" class="modal-mask">
        <div class="modal-container">
          <p>{{ modalContent }}</p>
          <div class="modal-footer">
            <button class="modal-button" @click="showModal = false">
              {{ modalCloseButtonText }}
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
  background-color: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-footer {
  margin-top: 8px;
  text-align: right;
}

.modal-button {
  padding: 0px 20px;
  line-height: 38px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
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
