<template>
  <div
    v-if="searchQuery && filteredHouses.length === 0 && !isSelectingResult"
    class="no-search-results-found"
  >
    <div class="no-search-results-found-message-img">
      <img width="260px" height="140px" src="../components/icons/img_empty_houses@3x.png" alt="" />
      <p>No result found</p>
      <p>Please try another keyword!</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  searchQuery: String,
  filteredHouses: Array,
  isSelectingResult: Boolean
  }
}
</script>

<style>
.no-search-results-found-message-img {
  text-align: center;
}

.no-search-results-found-message-img p {
  color: var(--text-secondary);
  font-size: var(--font-size-empty-state-desktop);
}

.no-search-results-found-message-img img {
  padding-bottom: 2rem;
}
</style>
