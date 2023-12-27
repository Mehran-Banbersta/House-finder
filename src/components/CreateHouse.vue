<!-- create house -->

<template>
  <div class="create-house-container">
    <form @submit.prevent="createPost" class="form">
      <router-link :to="'/'">
        <a class="back-overview">&lt; Back to overview</a>
      </router-link>

      <h2 className="create-house-heading">Create new listing</h2>
      <!-- Street name -->
      <div class="div-1">
        <label for="street">Street name</label>
        <input
          id="street"
          class="create-house-input"
          type="text"
          placeholder="Enter the street name"
          v-model="formData.street"
        />
      </div>
      <!-- House number -->
      <div class="div-2">
        <div class="house-number">
          <label for="houseNumber">House number</label>
          <input
            id="houseNumber"
            class="create-house-input"
            type="text"
            placeholder="Enter the House number"
            v-model="formData.houseNumber"
          />
        </div>

        <div class="addition">
          <label for="houseNumberAddition">Addition(optional)</label>
          <input
            id="houseNumberAddition"
            class="create-house-input"
            type="text"
            placeholder="e.g A "
            v-model="formData.houseNumberAddition"
          />
        </div>
      </div>
      <!--  -->
      <div class="house-number">
        <label for="zip">Postal code</label>
        <input
          id="zip"
          class="create-house-input"
          type="text"
          placeholder="e.g. 1000 AA"
          v-model="formData.zip"
        />
      </div>
      <!--  -->
      <div class="house-number">
        <label for="city">City</label>
        <input
          id="city"
          class="create-house-input"
          type="text"
          placeholder="E.g. Utrecht"
          v-model="formData.city"
        />
      </div>
      <!-- upload-photo -->
      <div class="upload-photo">
        <label for="image">Upload picture(PNG or JPG)</label>
        <input
          id="image"
          class="create-house-input"
          type="file"
          accept=".jpeg, .png, .jpg"
          @change="handleFileUpload"
        />
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
          class="create-house-input"
          type="text"
          placeholder="E.g. $150.000"
          v-model="formData.price"
        />
      </div>
      <!--  -->
      <div class="div-2">
        <div class="house-number">
          <label for="size">Size</label>
          <input
            id="size"
            class="create-house-input"
            type="text"
            placeholder="e.g. 60m2"
            v-model="formData.size"
          />
        </div>
        <!--garage-->
        <div class="addition">
          <label for="hasGarage">Garage</label>
          <select class="garage-option" id="hasGarage" name="garage">
            <option value="no">No Garage</option>
            <option value="attached">Attached Garage</option>
            <option value="detached">Detached Garage</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <!--  -->
      <div class="div-2">
        <div class="house-number">
          <label for="bedrooms">Bedrooms</label>
          <input
            id="bedrooms"
            class="create-house-input"
            type="text"
            placeholder="Enter amount"
            v-model="formData.rooms.bedrooms"
          />
        </div>
        <!--  -->
        <div class="addition">
          <label for="bathrooms">Bathrooms</label>
          <input
            id="bathrooms"
            class="create-house-input"
            type="text"
            placeholder="Enter amount "
            v-model="formData.rooms.bathrooms"
          />
        </div>
      </div>
      <!--  -->
      <div className="div-1">
        <label for="createdAt">Construction date</label>
        <input
          id="createdAt"
          class="create-house-input"
          type="text"
          placeholder="e.g 1990"
          v-model="formData.createdAt"
        />
      </div>
      <!--  -->
      <div class="div-1">
        <label for="description">Description</label>
        <textarea
          id="description"
          class="create-house-textarea"
          placeholder="Enter description"
          v-model="formData.description"
        ></textarea>
      </div>
      <!--  -->
      <div v-if="showSuccessMessage">
        <p class="success-message">{{ successMessage }}</p>
      </div>
      <!--  -->
      <button v-if="!showSuccessMessage" class="post-btn">Post</button>
    </form>
    <!-- -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const apiKeyCode = import.meta.env.VITE_APP_API_KEY
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import axios from 'axios'
import { ErrorTypes } from 'vue-router'

export default {
  name: 'CreatePost',
  data() {
    return {
      showSuccessMessage: false,
      successMessage: 'House created successfully!',
      formData: {
        street: '',
        houseNumber: '',
        houseNumberAddition: '',
        zip: '',
        city: '',
        price: '',
        size: '',
        hasGarage: false, 
        rooms: {
          bedrooms: '',
          bathrooms: ''
        },
        constructionYear: '',
        description: '',
        image: null
      },
      fileTypeError: null,
      uploadedImageUrl: '',
      houseDetails: {} 
    }
  },
  methods: {
    ...mapActions(['createHouse']),
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return
      console.log(file)
      const allowedTypes = ['image/jpeg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        this.fileTypeError = 'Please upload a valid PNG or JPG image.'
        this.uploadedImageUrl = '' 
      } else {
        this.fileTypeError = null
        this.uploadedImageUrl = '' 
        const reader = new FileReader()
        reader.onload = () => {
          this.uploadedImageUrl = reader.result
        }
        reader.readAsDataURL(file)
      }
    },

    async createPost() {
    
      try {
        const formData = new FormData()
        formData.append('image', this.formData.image)
        console.log(formData)
        
        formData.append('price', this.formData.price)
        formData.append('bedrooms', this.formData.rooms.bedrooms)
        formData.append('bathrooms', this.formData.rooms.bathrooms)
        formData.append('size', this.formData.size)
        formData.append('streetName', this.formData.street)
        formData.append('houseNumber', this.formData.houseNumber)
        formData.append('numberAddition', this.formData.houseNumberAddition)
        formData.append('zip', this.formData.zip)
        formData.append('city', this.formData.city)
        formData.append('constructionYear', this.formData.createdAt)
        formData.append('hasGarage', this.formData.hasGarage === 'no' ? false : true)
        formData.append('description', this.formData.description)

        const response = await this.$store.dispatch('createHouse', formData)

        if (response && response.data) {
          this.houseDetails = response.data 
          console.log('House created:', this.houseDetails)
        
          this.uploadedImageUrl = this.houseDetails.image
        
          this.showSuccessMessage = true
          this.successMessage = 'House created'
        } else {
          console.error('Error creating house. Response:', response)
        }
      } catch (error) {
        console.error('Error creating house:', error)
        if (error.response) {
          console.log('Detailed error:', error.response)
        }
      }
    },
    async uploadImage(houseId, formData) {
      const fd = new formData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      try {
      
        const response = await axios.post(`${apiBaseUrl}/api/houses/${houseId}/upload`, fd, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'X-Api-Key': apiKeyCode
          }
        })

        console.log('Image uploaded successfully:', response.data)
        
      } catch (error) {
        console.error('Error uploading image:', error)
        throw ErrorTypes
      }
    }
  }
}
</script>

<style>

.create-house-container {
  position: relative;
  height: 120vh;
  background-image: linear-gradient(135deg, rgb(155, 155, 155) 20%, transparent 70%);
  background-size: cover;
  background-clip: content-box, border-box;
}


.create-house-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-size: cover;

  mix-blend-mode: multiply;
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

.div-1,
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

.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
</style>
