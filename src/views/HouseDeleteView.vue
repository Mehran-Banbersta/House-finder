<!-- HouseDeleteView.vue -->
<template>
  <div class="house-detail-container">
    <router-link :to="'/'">
      <a className="back-overview">&lt; Back to overview</a>
    </router-link>
    <div class="house-detail-components">
      <CustomPopup
        v-if="showDeletePopup"
        :isVisible="showDeletePopup"
        @action="handlePopupAction"
      />
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
import CustomPopup from '../components/CustomPopup.vue'

import HouseRecommendation from '../components/HouseRecommendation.vue'

export default {
  name: 'HouseDetailView',
  components: {
    HouseDetail,
    CustomPopup,
    HouseRecommendation
  },
  computed: {
    ...mapGetters(['getHouseDetails', 'getHouses']),
    recommendedHouses() {
      return this.getRecommendedHouses()
    }
  },
  data() {
    return {
      showDeletePopup: true,
      houseIdToDelete: null
    }
  },

  mounted() {
    const houseId = this.$route.params.id
    if (houseId) {
      this.$store.dispatch('fetchHouseDetails', houseId)
      this.houseIdToDelete = houseId
    }
  },
  methods: {
    getRecommendedHouses() {
      
      if (this.getHouses && this.getHouseDetails && this.getHouseDetails.length === 1) {
        const currentHouse = this.getHouseDetails[0]
        console.log('Current House:', currentHouse)

        const recommendedHouses = this.getHouses.filter((house) => {
          const priceDifference = Math.abs(currentHouse.price - house.price)
          const sizeDifference = Math.abs(currentHouse.size - house.size)
          
          return priceDifference < 50000 && sizeDifference < 20 
        })

        console.log('Recommended Houses:', recommendedHouses)
        return recommendedHouses
      }

      return []
    },
    handlePopupAction(action) {
      //handel popups action
      if (action === 'back') {
        this.showDeletePopup = false
      } else if (action === 'delete') {
        // Handle 'delete' action
        this.deleteHouse()
      }
    },

    deleteHouse() {
      if (this.houseIdToDelete) {
        if (this.showDeletePopup) {
          this.$store.dispatch('deleteHose', this.houseIdToDelete)
          this.showDeletePopup = false
        }
      }
    }
  }
}
</script>

<style>
.house-detail-container {
  position: relative;
  max-width: 80%;
  margin: 0 auto;
  color: #111;
}

.house-detail-components {
  display: flex;
  gap: 2rem;
}
.house-detail-items {
  background-color: rgb(243, 248, 248);
  width: 70%;
}

.house-detail-items .house-detail-items-image {
  background-color: #f3f8f8;
  width: 100%;
  height: 300px;
}

.house-details-price-size-constructionYear,
.house-details-zip-city {
  display: flex;
  margin: 1rem 0;
}

.house-details-price-size-constructionYear p {
  padding-right: 1rem;
  /* width:fit-content; */
}

.house-details-recommend-item {
  background-color: #f3f8f8;
  display: flex;
}
</style>
