<!-- FavoriteHousesView.vue -->

<script></script>
<template>
  <div class="house-favorite-container">
    <div class="router-link">
      <router-link :to="'/'">
        <a className="back-overview">&lt; Back to overview</a>
      </router-link>
    </div>
    <h4>Favorite Houses</h4>

    <div v-if="housesInFavorites.length">
      <p>{{ favoriteHousesCount }} Favorite Houses in your list!</p>
      <HouseList
        v-for="(house, index) in housesInFavorites"
        :key="index"
        :house="house"
        :showIcons="false"
        HouseList
      />
    </div>
    <div v-else>
      <h1>No items in favorites now</h1>
    </div>
  </div>
</template>

<script>
import HouseList from '../components/HouseList.vue'
export default {
  components: {
    HouseList 
  },
  // ... existing code ...
  name: 'housesInFavorites',
  computed: {
    favoriteHousesCount() {
      return this.$store.state.housesInFavorites.length
    },
    housesInFavorites() {
      return this.$store.state.housesInFavorites
    }
  },
  methods: {
    removeFromFavorites(houseId) {
      this.$store.dispatch('removeFromFavorite', houseId)
    }
  }
}
</script>
<!-- ... existing code ... -->
<style>
.house-favorite-container-item {
  background-color: aliceblue;
  margin-top: 1rem;
  display: flex;
  padding: 1rem;
}

.house-favorite-container h4 {
  margin-bottom: 1rem;
}

.favorite-image {
  padding-right: 1rem;
}

.house-info-bed-bath-size-item {
  display: flex;
}

.house-favorite-street-price h2,
.house-favorite-street-price h4,
.house-favorite-city-zip {
  padding-bottom: 1rem;
}

.house-favorite-edit-container {
  position: absolute;
  right: 1rem;
}
</style>
