<!-- HomeView.vue -->
<template>
  <div class="house-container">
    <div class="home-header">
      <div class="top-nav">
        <h1>Houses</h1>
        <router-link :to="'/create-house'">
          <button class="create-btn">+ Create house</button>
        </router-link>
      </div>
      <div class="bottom-nav">
        <HouseSearch @search-query-updated="handleSearchQueryUpdated" />
        <SortingButtons @sortBy="handleSortBy" />
      </div>
      <div class="sorting-buttons-message">
        <p v-if="sortByOption === 'size' && filteredHousesCount > 0" class="results-count">
          {{ filteredHousesCount }} result{{ filteredHousesCount !== 1 ? 's' : '' }} in your size
          range ({{ sortByMin }}m2 - {{ sortByMax }}m2)
        </p>
        <p v-if="sortByOption === 'price' && filteredHousesCount > 0" class="results-count">
          {{ filteredHousesCount }} result{{ filteredHousesCount !== 1 ? 's' : '' }} in your price
          range (€{{ sortByMin }} - €{{ sortByMax }})
        </p>
        <p v-if="sortByOption === 'size' && filteredHousesCount === 0" class="no-results-message">
          No houses found in the size range ({{ sortByMin }}m2 - {{ sortByMax }}m2).
        </p>
        <p v-if="sortByOption === 'price' && filteredHousesCount === 0" class="no-results-message">
          No houses found in the price range (€{{ sortByMin }} - €{{ sortByMax }}).
        </p>
      </div>
    </div>

    <!-- search-results-message -->
    <p
      v-if="searchQuery && filteredHouses.length > 0 && !isSelectingResult"
      class="search-results-message"
    >
      {{ filteredHousesCount }} result{{ filteredHousesCount !== 1 ? 's' : '' }} found in your
      search
    </p>

    <!-- no-search-results-found -->
    <NoSearchResult
      :searchQuery="searchQuery"
      :filteredHouses="filteredHouses"
      :isSelectingResult="isSelectingResult"
    />
    <!-- Render the search results or houses if available -->

    <div v-if="searchResult">
      <div class="search-result">
        <HouseList :house="searchResult" @addToFavorite="addToFavorite(searchResult)" />
      </div>
    </div>

    <div v-else-if="houses.length > 0 || filteredHouses.length > 0">
      <div class="house-items">
        <HouseList
          v-for="house in filteredHouses.length > 0 ? filteredHouses : houses"
          :key="house.id"
          :house="house"
          @addToFavorite="addToFavorite(house)"
        />
      </div>
    </div>

    <div v-else>
      <p>No houses loaded yet. Click the button to load houses.</p>
    </div>
  </div>
</template>

<script>
import HouseList from '../components/HouseList.vue'
import SortingButtons from '../components/SortingButtons.vue'
import HouseSearch from '../components/HouseSearch.vue'
import NoSearchResult from '@/components/NoSearchResult.vue'

import { mapState } from 'vuex'
import { ref } from 'vue'
export const noHousesEvent = ref(null)

export default {
  components: {
    HouseList,
    SortingButtons,
    HouseSearch,
    NoSearchResult
  },

  computed: {
    ...mapState(['houses', 'housesInFavorites']),
    filteredHousesCount() {
      return this.filteredHouses.length
    }
  },

  data() {
    return {
      sortByOption: '',
      sortByMin: 0,
      sortByMax: 0,
      searchResult: null,
      searchQuery: '',
      filteredHouses: []
    }
  },

  methods: {
    addToFavorite(house) {
      console.log('Favorite result received in HomeView:', house)
      this.$store.dispatch('addToFavorite', house)
    },
    handleSortBy(sortOption) {
      console.log('Sort option:', this.sortByOption)
      console.log('Sort min:', this.sortByMin)
      console.log('Sort max:', this.sortByMax)
      console.log('Handling sort by...')
      this.sortByOption = sortOption.option
      this.sortByMin = sortOption.min
      this.sortByMax = sortOption.max

      const housesInSelectedRange = this.filteredHousesCount > 0
      if (!housesInSelectedRange) {
        noHousesEvent.value = `Sorry, there are no houses in the range ${sortOption.min} - ${sortOption.max}.`
      }
      this.updateFilteredHouses()
    },
    handleSearchQueryUpdated(query) {
      this.searchQuery = query
      this.updateFilteredHouses()
    },
    updateFilteredHouses() {
      console.log('Updating filtered houses...')
      console.log('Sort By Option:', this.sortByOption)
      console.log('Sort By Min:', this.sortByMin)
      console.log('Sort By Max:', this.sortByMax)
      if (this.searchQuery) {
        this.filteredHouses = this.houses.filter((house) => {
          return (
            house.location.street.toLowerCase().includes(this.searchQuery) ||
            house.location.city.toLowerCase().includes(this.searchQuery) ||
            house.size.toString().includes(this.searchQuery) ||
            house.price.toString().includes(this.searchQuery) ||
            house.location.zip.toLowerCase().includes(this.searchQuery)
          )
        })
      } else {
        this.filteredHouses = this.houses.filter((house) => {
          if (this.sortByOption === 'price') {
            const isInRange = house.price >= this.sortByMin && house.price <= this.sortByMax
            console.log('Price Range Check:', isInRange)
            return isInRange
          } else if (this.sortByOption === 'size') {
            const isInRange = house.size >= this.sortByMin && house.size <= this.sortByMax
            console.log('Size Range Check:', isInRange)
            return isInRange
          } else {
            return true
          }
        })
      }
    }
  },

  mounted() {
    if (!this.searchResult) {
      this.$store.dispatch('loadHouses')
    }
  }
}
</script>
<style>
.top-nav h1 {
  font-size: var(--font-size-h1-desktop);
}

.no-search-results-found {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 17rem;
}

.sorting-buttons-message {
  font-size: var(--font-size-listing-information-desktop);
  margin-bottom: 1rem;
}

.top-nav {
  margin: 1.2rem 0;
}

.bottom-nav {
  margin-bottom: 2rem;
}

.top-nav,
.bottom-nav {
  display: flex;
  justify-content: space-between;
}
/* Your styles here */
.house-container,
.house-favorite-container {
  position: relative;
  max-width: 80%;
  margin: 0 auto;
  color: var(--text-primary);
}

.create-btn {
  width: 180px;
  height: 35px;
  border-radius: 0.4rem;
  font-size: var(--font-size-buttons-desktop);
}

@media only screen and (max-width: 600px) {
  .bottom-nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1rem;
    gap: 1rem;
  }

  .house-container,
  .house-favorite-container {
    position: relative;
    max-width: 90%;
  }

  .create-btn {
    font-size: var(--font-size-buttons-mobile);
  }
}
</style>
