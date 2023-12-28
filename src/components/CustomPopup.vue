<!-- CustomPopup.vue -->
<template>
  <div v-if="isVisible" class="custom-popup">
    <div class="popup-content">
      <p>{{ message }}</p>
      <button @click="closePopup">GO BACK</button>
      <button @click="deleteHouse">YES DELETE</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    message: String,
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.custom-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.popup-content {
  text-align: center;
}
</style>
