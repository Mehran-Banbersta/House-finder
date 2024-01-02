<!-- HouseDetail.vue -->
<template>
  <div class="house-detail-items">
    <img class="house-detail-items-image" :src="house.image" alt="House Image" />
    <div class="house-details-info">
      <div class="house-details-street-delete-btn">
        <h2>{{ house.location?.street }}</h2>

        <div class="router-links-edit-delete">
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
          <router-link
            :to="{ name: 'EditHouseView', params: { id: house.id } }"
            class="custom-link"
          >
            <font-awesome-icon class="edit-button" icon="fas fa-pen" />
          </router-link>
          <!-- delete-button -->
          <router-link
            :to="{ name: 'HouseDeleteView', params: { id: house.id } }"
            class="custom-link"
          >
            <font-awesome-icon
              class="delete-button"
              icon="fa-solid fa-trash"
              @click="deleteHouse(house.id)"
            />
          </router-link>
        </div>
      </div>

      <div class="house-details-zip-city">
        <img src="../components/icons/ic_location@3x.png" alt="House Image" width="20" />
        <h5>{{ house.location?.zip }}</h5>
        <h5>{{ house.location?.city }}</h5>
      </div>

      <div class="house-details-price-size-constructionYear">
        <div class="price-size-constructionYear">
          <img src="../components/icons/ic_price@3x.png" alt="House Image" width="20" />
          <p>${{ house.price }}</p>
        </div>
        <div class="price-size-constructionYear">
          <img src="../components/icons/ic_size@3x.png" alt="House Image" width="20" />
          <p>{{ house.size }} m2</p>
        </div>
        <div class="price-size-constructionYear">
          <img src="../components/icons/ic_construction_date@3x.png" alt="House Image" width="20" />
          <p>Built in {{ house.constructionYear }}</p>
        </div>
      </div>

      <div class="house-details-price-size-constructionYear">
        <div class="house-info-bed-bath-size-items">
          <img src="../components/icons/ic_bed@3x.png" alt="House Image" width="20" />
          <p class="bedrooms">{{ house.rooms.bedrooms }}</p>
        </div>
        <div class="house-info-bed-bath-size-items">
          <img src="../components/icons/ic_bath@3x.png" alt="House Image" width="20" />
          <p class="bathrooms">{{ house.rooms.bathrooms }}</p>
        </div>
        <div class="house-info-bed-bath-size-items">
          <img src="../components/icons/ic_garage@3x.png" alt="House Image" width="20" />
          <p class="size">{{ house.hasGarage }}</p>
        </div>
      </div>

      <div class="house-details-description">
        <p>{{ house.description }}</p>
      </div>
    </div>
    <div class="house-details-edit-container">
      <!-- Delete house -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    house: Object
  },
  methods: {
    async deleteHouse(id) {
      try {
        await this.$store.dispatch('deleteHouse', id)
      } catch (error) {
        console.error('Error deleting house:', error)
      }
    }
  }
}
</script>

<style>
.house-detail-items {
  width: 100%;
}

.house-detail-items-image {
  width: 100%;
  height: 300px;
}

.house-details-info {
  padding: 2rem;
}
.house-details-price-size-constructionYear,
.house-details-zip-city,
.price-size-constructionYear {
  display: flex;
  margin: 1rem 0;
  align-items: center;
}

.house-details-zip-city img {
  margin-right: 1rem;
  display: flex;
}

.price-size-constructionYear img {
  margin-right: 1rem;
}
.house-details-price-size-constructionYear p {
  padding-right: 1rem;
  /* width:fit-content; */
}

.house-details-edit-container {
  display: flex;
  justify-content: space-between;
}

.house-details-street-delete-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (max-width: 600px) {
}
</style>
