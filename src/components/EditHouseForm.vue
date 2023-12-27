<template>
  <div>
    <div class="house-edit-items">
      <div class="house-edit">
        <h2>Edit listing</h2>
        <!-- Update form -->
        <form @submit.prevent="updateHouse" class="form">
          <!-- Street name -->
          <div className="div-1">
            <label for="street">Street name</label>
            <input
              id="street"
              className="create-house-input"
              type="text"
              v-model="editedHouse.location.street"
            />
          </div>
          <!-- House number -->
          <div className="div-2">
            <div class="house-number">
              <label for="houseNumber">House number</label>
              <input
                id="houseNumber"
                className="create-house-input"
                type="text"
                v-model="editedHouse.location.houseNumber"
              />
            </div>

            <div class="addition">
              <label for="houseNumberAddition">Addition(optional)</label>
              <input
                id="houseNumberAddition"
                className="create-house-input"
                type="text"
                v-model="editedHouse.location.houseNumberAddition"
              />
            </div>
          </div>
          <!--  -->
          <div class="house-number">
            <label for="zip">Postal code</label>
            <input
              id="zip"
              className="create-house-input"
              type="text"
              v-model="editedHouse.location.zip"
            />
          </div>
          <!--  -->
          <div class="house-number">
            <label for="city">City</label>
            <input
              id="city"
              className="create-house-input"
              type="text"
              v-model="editedHouse.location.city"
            />
          </div>
          <!-- upload-photo -->
          <div class="upload-photo">
            <!-- Image Upload -->
            <label>
              Current Image:
              <img class="current-image" :src="editedHouse.image" alt="Current House Image" />
            </label>
            <label>
              Delete Current Image:
              <input type="checkbox" v-model="deleteCurrentImage" />
            </label>
            <label>
              Upload New Image:
              <input type="file" accept="image/*" @change="handleImageUpload" />
            </label>
            <!-- Display an error message if the selected file is not valid -->
            <p v-if="fileTypeError" class="error-message">{{ fileTypeError }}</p>
          </div>
          <!-- Display the uploaded image -->
          <img v-if="uploadedImageUrl" :src="uploadedImageUrl" alt="Uploaded House Image" />
          <!--  -->
          <div class="house-number">
            <label for="price">Price</label>
            <input
              id="price"
              className="create-house-input"
              type="text"
              v-model="editedHouse.price"
            />
          </div>
          <!--  -->
          <div className="div-2">
            <div class="house-number">
              <label for="size">Size</label>
              <input
                id="size"
                className="create-house-input"
                type="text"
                v-model="editedHouse.size"
              />
            </div>
            <!--garage-->
            <div class="addition">
              <label for="hasGarage">Garage</label>
              <select className="garage-option" id="hasGarage" name="garage">
                <option value="no">No Garage</option>
                <option value="attached">Attached Garage</option>
                <option value="detached">Detached Garage</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <!--  -->
          <div className="div-2">
            <div class="house-number">
              <label for="bedrooms">Bedrooms</label>
              <input
                id="bedrooms"
                className="create-house-input"
                type="text"
                v-model="editedHouse.rooms.bedrooms"
              />
            </div>
            <!--  -->
            <div class="addition">
              <label for="bathrooms">Bathrooms</label>
              <input
                id="bathrooms"
                className="create-house-input"
                type="text"
                v-model="editedHouse.rooms.bathrooms"
              />
            </div>
          </div>
          <!--  -->
          <div className="div-1">
            <label for="createdAt">Construction date</label>
            <input
              id="createdAt"
              className="create-house-input"
              type="text"
              v-model="editedHouse.createdAt"
            />
          </div>
          <!--  -->
          <div className="description">
            <label for="description">Description</label>
            <textarea
              id="description"
              class="create-house-textarea"
              v-model="editedHouse.description"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    house: Object,
    id: String
  },
  data() {
    return {
      editedHouse: { ...this.house },
      deleteCurrentImage: false
    }
  },
  methods: {
    ...mapActions(['updateHouse']), // Add other actions if needed
    updateHouse() {
      if (!this.id) {
        console.error('House ID is missing. Unable to update.')
        return
      }

      console.log('ID:', this.id)
      console.log('Edited House:', this.editedHouse)

      const formData = new FormData()

      formData.append('street', this.editedHouse.location.street)
      formData.append('city', this.editedHouse.location.city)
      formData.append('zip', this.editedHouse.location.zip)
      formData.append('price', this.editedHouse.price)
      formData.append('size', this.editedHouse.size)
      formData.append('constructionYear', this.editedHouse.constructionYear)
      formData.append('bedrooms', this.editedHouse.rooms.bedrooms)
      formData.append('bathrooms', this.editedHouse.rooms.bathrooms)
      formData.append('hasGarage', this.editedHouse.hasGarage)
      formData.append('description', this.editedHouse.description)

      if (this.deleteCurrentImage) {
        formData.append('deleteCurrentImage', true)
      }

      if (this.newImage) {
        formData.append('newImage', this.newImage)
      }

      console.log('FormData just before API call:', formData)

      this.$store.dispatch('updateHouse', { id: this.id, formData })
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

.current-image {
  display: block;
  margin-top: 10px;
  max-width: 200px;
  max-height: 200px;
}

.house-edit h2 {
  margin-bottom: 1rem;
}

.form {
  position: relative;
  z-index: 222;
  max-width: 80%;
  margin: 0 auto;
}

a.back-overview {
  text-decoration: none !important;
  color: #111;
  margin: 2rem 0;
}

label {
  padding-bottom: 0.5rem;
}
input.create-house-input,
select {
  height: 30px;
  width: 331px;
  margin-bottom: 0.3rem;
  background-color: #ffffff;
  color: #111;
  border-radius: 0.4rem;
  border: none !important;
}

textarea {
  margin-bottom: 1rem;
  width: 331px;
  height: 120px;
  border: none;
  border-radius: 0.4rem;
}

.description,
.house-number,
.addition,
.upload-photo {
  display: flex;
  flex-direction: column;
}
.addition {
  margin-left: 2rem;
}
.div-2 {
  display: flex;
}
.div-2 input,
select {
  width: 150px;
}

.post-btn {
  width: 120px;
  height: 35px;
  border-radius: 0.4rem;
}

#description {
padding: .5rem;
}
</style>
