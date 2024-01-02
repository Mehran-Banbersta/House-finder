<template>
  <div class="back-overview-container">
    <router-link :to="'/'" class="back-overview-items">
      <img src="./icons/ic_back_grey@3x.png" height="15px" alt="back-overview-image">
      <a>Back to overview</a>
    </router-link>
  </div>
</template>

<script></script>

<style>
.back-overview-container {
  padding: 1rem 0;
}

.back-overview-container > a {
  color: var(--text-secondary);
}

.back-overview-items {
  display: flex;
  align-items: center;
  gap: .4rem;
}
</style>
