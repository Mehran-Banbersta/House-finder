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
        message="Are you sure you want to delete this house? "
        @back="closePopup"
      />
      <HouseDetail v-if="getHouseDetails" :house="getHouseDetails[0]" />

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

export default {
  name: 'HouseDetailView',
  components: {
    HouseDetail,
    CustomPopup
  },
  computed: {
    ...mapGetters(['getHouseDetails', 'getHouses'])
  },
  data() {
    return {
      showDeletePopup: true
    }
  },

  setup() {
    
  },

  mounted() {
    const houseId = this.$route.params.id
    if (houseId) {
      this.$store.dispatch('fetchHouseDetails', houseId)
    }
  },
  methods: {
    deleteHouse(id) {
      console.log(`Deleting house with ID: ${id}`)
      this.showDeletePopup = true
    },

    closePopup() {
      this.showDeletePopup = true
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
