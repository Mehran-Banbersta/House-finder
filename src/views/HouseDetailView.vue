<template>
  <div class="house-detail-container">
    <div class="router-link">
      <router-link :to="'/'" class="back-overview">
        <a>&lt; Back to overview</a>
      </router-link>
    </div>
    <div class="house-detail-components">
      <HouseDetail v-if="getHouseDetails" :house="getHouseDetails[0]" />

      <HouseRecommendation
        v-if="recommendedHouses.length > 0"
        :recommendedHouses="recommendedHouses"
      />

      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HouseDetail from '../components/HouseDetail.vue'
import HouseRecommendation from '../components/HouseRecommendation.vue'

export default {
  name: 'HouseDetailView',
  components: {
    HouseDetail,
    HouseRecommendation
  },
  computed: {
    ...mapGetters(['getHouseDetails', 'getHouses']),
    recommendedHouses() {
      return this.getRecommendedHouses()
    }
  },
  mounted() {
    const houseId = this.$route.params.id
    this.$store.dispatch('fetchHouseDetails', houseId)
  },
  methods: {
    getRecommendedHouses() {
      if (this.getHouses && this.getHouseDetails && this.getHouseDetails.length === 1) {
        const currentHouse = this.getHouseDetails[0]
        console.log('Current House:', currentHouse)

        const recommendedHouses = this.getHouses.filter((house) => {
          const priceDifference = Math.abs(currentHouse.price - house.price)
          const sizeDifference = Math.abs(currentHouse.size - house.size)

          return priceDifference < 200000 && sizeDifference < 20
        })

        console.log('Recommended Houses:', recommendedHouses)
        return recommendedHouses
      }

      return []
    }
  }
}
</script>

<style>
.house-detail-container {
  width: 80%;
  margin: 0 auto;
}

.house-detail-components {
  display: flex;
  justify-content: space-between;
}

.house-detail-items {
  background-color: var(--background-color-2);
}

@media only screen and (max-width: 600px) {
  .house-detail-container {
    position: relative;
    max-width: 100%;
    margin: 0;
    color: #111;
  }
  .house-detail-components {
    flex-direction: column;
  }
}
</style>
