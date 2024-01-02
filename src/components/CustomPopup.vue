<!-- CustomPopup.vue -->
<template>
  <div v-if="isVisible" class="custom-popup">
    <div class="popup-content">
      <p>{{ message }}</p>

      <!-- close the popup -->
      <button @click="closePopup">GO BACK</button>

      <!-- delete house -->
      <button @click="deleteHouse">YES DELETE</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    message: String
  },
  methods: {
    closePopup() {
      this.$emit('action', 'back')
    },
    deleteHouse() {
      this.$emit('action', 'delete')
    }
  }
}
</script>

<style scoped>
.custom-popup {
  position: fixed;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  top: 0;
  left: 0;
  background-color: rgb(153, 150, 150);
  height: 100vh;
  width: 100vw;
  z-index: 11111;
  opacity: 0.8;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  height: 40vh;
  width: 40vw;
  background-color: rgb(236, 230, 230);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  opacity:;
}
</style>
