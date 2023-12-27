<!-- HouseList.vue -->
<template>
  <div class="house-item">
    <router-link :to="{ name: 'HouseDetailView', params: { id: house.id } }" class="custom-link">
      <img class="house-item-image" :src="house.image" alt="House Image" />
    </router-link>
    <div class="container">
      <div class="house-items-street-edit-delete-favorite">
        <h3>{{ house.location ? house.location.street : 'Unknown Street' }}</h3>
        <div class="edit-container">
          <!--  addToFavorite -->
          <div v-if="showIcons">
            <font-awesome-icon
              @click="addToFavorite(house)"
              class="favorite-icon"
              :class="{ 'favorite-icon': true, favorited: isInFavorite(house) }"
              icon="far fa-heart"
            ></font-awesome-icon>
          </div>
          <!-- edit-button -->
          <!-- Show edit button only if showIcons prop is true -->
          <router-link
            v-if="showIcons"
            :to="{ name: 'EditHouseView', params: { id: house.id } }"
            class="custom-link"
          >
            <font-awesome-icon class="edit-button" icon="fas fa-pen" />
          </router-link>
          <!-- delete icon -->

          <!-- Show delete icon only if showIcons prop is true -->
          <router-lin>
            v-if="showIcons"
            :to="{ name: 'HouseDeleteView', params: { id: house.id } }"
            class="custom-link"
          >
            <font-awesome-icon class="delete-button" icon="fa-solid fa-trash" />
          </router-lin>

          <!-- pen icon -->
        </div>
      </div>
      <div className="price-zip-city">
        <h4 class="house-items-price">€{{ house.price }}</h4>
        <p class="city-zip">
          {{ house.location ? `${house.location.zip} ${house.location.city}` : 'Unknown City/ZIP' }}
        </p>
      </div>

      <div class="house-info-bed-bath-size">
        <div class="house-info-bed-bath-size-items">
          <img src="../components/icons/ic_bed@3x.png" alt="House Image" width="20" />
          <p class="bedrooms">{{ house.rooms ? house.rooms.bedrooms : 'Unknown Bedrooms' }}</p>
        </div>
        <div class="house-info-bed-bath-size-items">
          <img src="../components/icons/ic_bath@3x.png" alt="House Image" width="20" />
          <p class="bathrooms">{{ house.rooms ? house.rooms.bathrooms : 'Unknown Bathrooms' }}</p>
        </div>
        <div class="house-info-bed-bath-size-items">
          <img src="../components/icons/ic_size@3x.png" alt="House Image" width="20" />
          <p class="size">{{ house.size ? `${house.size} m2` : 'Unknown Size' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    house: Object,
    showIcons: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      favorited: false
    }
  },
  methods: {
    addToFavorite(house) {
      this.$store.dispatch('addToFavorite', house)
      console.log('Added to favorites from heart icon', house)
      this.favorited = !this.favorited
    },
    isInFavorite() {
      return this.favorited
    }
  }
}
</script>

<style>
.custom-link {
  color: var(--text-primary);
  text-decoration: none;
}
.house-items {
  max-width: 100%;
}

.search-btn-controller {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
}
.house-item {
  display: flex;
  margin-bottom: 1.3rem;
  background-color: var(--background-color-2);
  position: relative;
  border-radius: 0.5rem;
  padding: 1rem;
}

.house-item h2 {
  font-size: var(--font-size-h2-desktop);
}

h2.house-items-price {
  color: var(--secondary-color);
}

.house-items-street-edit-delete-favorite {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.house-item-image {
  margin-right: 1rem;
  border-radius: 0.5rem;
  width: 160px;
  height: 160px;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.house-item-image:hover {
  transform: scale(1.05);
}

.container {
  margin-left: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 2;
  width: 100%;
}

.house-info-bed-bath-size {
  display: flex;
  justify-content: flex-start;
  gap: 28px;
}
.house-info-bed-bath-size-items {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.house-info-bed-bath-size-items p {
  color: var(--secondary-color);
}

.edit-container {
  display: flex;
  align-items: center;
}

.create-btn {
  width: 9rem;
  border-radius: 0.4rem;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  height: 2rem;
  cursor: pointer;
  font-size: var(--font-size-buttons-mobile);
  transition: background-color 0.5s ease;
}

.create-btn:hover {
  background-color: var(--secondary-color);
  transform: 1s;
}

.edit-button {
  color: var(--primary-color);
}
.edit-button,
.delete-button,
.favorite-icon {
  margin-left: 0.8rem;
  transform: scale(1);
  transition: transform 0.25s ease;
  width: 14px; 
  height: 15px;
  cursor: pointer;
}

.city-zip {
  color: var(--tertiary-color-2);
}

.edit-button:hover,
.favorite-icon:hover,
.delete-button:hover {
  transform: scale(1.2);
}

.favorited {
  color: var(--primary-color);
}

@media only screen and (max-width: 600px) {
  .house-items-street-edit-delete-favorite h2 {
    font-size: 1.1rem;
  }

  .house-item-image {
    width: 120px;
    height: 120px;
  }

  .container {
    margin-left: 0.2rem;
    line-height: 1.7;
  }

  .house-info-bed-bath-size {
    font-size: 0.8rem;
    gap: 18px;
  }
}
</style>
