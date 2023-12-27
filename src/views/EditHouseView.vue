<!-- EditHouseView.vue -->
<template>
  <div class="house-edit-container">
    <div class="router-link">
      <router-link :to="'/'">
        <a className="back-overview">&lt; Back to overview</a>
      </router-link>
    </div>
    <div class="house-edit-components">
      <EditHouseForm
        v-if="getHouseDetails && getHouseDetails.length > 0"
        :house="getHouseDetails[0]"
        :id="getHouseDetails[0].id"
      />

      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditHouseForm from '../components/EditHouseForm.vue'

export default {
  name: 'EditHouseView',
  components: {
    EditHouseForm
  },

  data() {
    return {
      editedHouse: { ...this.house },
      deleteCurrentImage: false,
      newImage: null 
    }
  },
  computed: {
    ...mapGetters(['getHouseDetails'])
  },
  mounted() {
    console.log('result mounted in  EditHouseView.vue ', this.$route.params)
    const houseId = this.$route.params.id || 'defaultId'
    console.log('House ID:', houseId)
    this.$store.dispatch('fetchHouseDetails', houseId)
  }
}
</script>

<style>
.house-edit-container {
  width: 80%;
  margin: 0 auto;
}
</style>
