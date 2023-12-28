<!-- HouseSearch -->
<template>
  <div class="search-input-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search a house"
      @input="updateSearchFilter"
      class="search-input"
      id="back-home"
    />
    <button v-if="searchQuery" @click="goBackHome" class="back-home-button">x</button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: this.$route.query.q || ''
    }
  },
  methods: {
    updateSearchFilter(defaultValue = '') {
      const query = (this.searchQuery || defaultValue).toString().toLowerCase()
      this.$emit('search-query-updated', query)
    },
    goBackHome() {
      this.searchQuery = '' 
      this.$emit('search-query-updated', '') 
    }
  }
}
</script>

<style>
/* Your styles here */
.search-input-container {
  display: flex;
  position: relative;
}

.back-home-button {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  outline: none;
  border-radius: 90px;
  border: none;
  background-color: var(--text-primary);
  color: var(--tertiary-color-2);
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.search-input {
  position: relative;
  border: none !important;
  width: 300px;
  height: 37px;
  border-radius:0.3rem;
  background-image: url('../components/icons/ic_search@3x.png');
  background-color: var(--tertiary-color-2);
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: 19px center;
  position: relative;
  outline: none;
  padding-left: 5rem; 
}

.search-input::placeholder {
  color: #999; 
  font-style: italic; 
}

.search-results {
  margin-top: 2rem;
}

.back-home {
}

@media only screen and (max-width: 600px) {
  .search-input {
    width: 100%;
    height: 37px;
  }
}
</style>
