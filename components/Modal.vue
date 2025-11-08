<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const handleMaskClick = () => {
  emit("close");
};
</script>

<template>
  <Teleport to="body">
    <div v-show="show" class="modal-mask" @click.self="handleMaskClick">
      <div class="modal-container">
        <div v-if="$slots.title" class="modal-title-section">
          <h3>
            <slot name="title" />
          </h3>
        </div>
        <div v-if="$slots.content" class="modal-content-section">
          <slot name="content" />
        </div>
        <hr v-if="$slots.footer" class="modal-divider" />
        <div v-if="$slots.footer" class="modal-footer-section">
          <slot name="footer" />
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

.modal-title-section {
  padding: 20px 30px 8px;
}

.modal-title-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.modal-content-section {
  padding: 0 30px 16px;
}

.modal-divider {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 0;
}

.modal-footer-section {
  padding: 16px 30px 20px;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
