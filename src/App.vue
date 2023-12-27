<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="logo-home-about">
          <RouterLink to="/">
            <img src="../public/ic_mobile_navigarion_home_active@3x.png" alt="" width="40" />
          </RouterLink>
          <RouterLink class="custom-link" to="/">Home</RouterLink>
          <RouterLink class="custom-link" to="/about">About</RouterLink>
        </div>
        <div>
          <RouterLink class="custom-link" to="/favorites">
            <font-awesome-icon icon="far fa-heart"
          /></RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
header {
  background-color: var(--background-color-2);
  position: sticky;
  top: 0;
  z-index: 2222;
}
nav {
  max-width: 80%;
  margin: 0 auto;
  font-size: var(--font-size-menu-active-desktop);
  padding: 1rem 0;
  display: flex;
  align-items: center;
  color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-home-about {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a.router-link-exact-active {
  color: var(--primary-color);
  text-decoration: none;
  list-style-type: none;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  text-decoration: none;
}

nav a:hover {
  scale: 1.1;
}

nav a:first-of-type {
  border: 0;
}

@media only screen and (max-width: 600px) {


  nav {
    max-width: 100%;
    font-size: var(--font-size-menu-active-desktop);
  }
}
</style>
