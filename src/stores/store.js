// store.js
import { createStore } from 'vuex'
import axios from 'axios'

const apiKeyCode = import.meta.env.VITE_APP_API_KEY
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export default createStore({
  state: {
    houses: [],
    houseDetails: null,
    housesInFavorites: []
  },
  mutations: {
    setHouses(state, houses) {
      state.houses = houses
    },
    setHouseDetails(state, details) {
      state.houseDetails = details
    },

    addToFavorites(state, house) {
     
      state.housesInFavorites.push(house)
    },
    removeFromFavorites(state, houseId) {
      state.housesInFavorites = state.housesInFavorites.filter((house) => house.id !== houseId)
    },
    deleteHouse(state, houseId) {
      state.houses = state.houses.filter((house) => house.id !== houseId)
    }
  },
  actions: {
    async loadHouses({ commit, state }) {
  
      if (state.houses.length > 0) {
        return state.houses
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/api/houses`, {
          headers: {
            'X-Api-Key': apiKeyCode
          }
        })

        const housesData = response.data
        commit('setHouses', housesData)
        return housesData
      } catch (error) {
        console.error('Error loading houses:', error)
        throw error
      }
    },
    // fetchHouseDetails
    async fetchHouseDetails({ commit }, houseId) {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/houses/${houseId}`, {
          headers: {
            'X-Api-Key': apiKeyCode
          }
        })
        const houseDetails = response.data
        commit('setHouseDetails', houseDetails)
      } catch (error) {
        console.error('Error fetching house details:', error)
      }
    },
    addToFavorite({ commit }, house) {
      commit('addToFavorites', house)
    },

    removeFromFavorite({ commit }, houseId) {
      commit('removeFromFavorites', houseId)
    },
    // deleteHouse
    async deleteHouse({ commit }, houseId) {
      console.log(`Deleting house with ID: ${houseId}`)
      try {
        await axios.delete(`${apiBaseUrl}/api/houses/${houseId}`, {
          headers: {
            'X-Api-Key': apiKeyCode
          }
        })
        commit('deleteHouse', houseId)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('House not found:', error.response.data)
         
        } else {
          console.error('Error deleting house:', error)
          throw error
        }
      }
    },

    // createHouse
    async createHouse({ commit }, formData) {
      try {
        const response = await axios.post(`${apiBaseUrl}/api/houses`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Api-Key': apiKeyCode
          }
        })

      
        const houseDetails = response.data

        
        commit('setHouseDetails', houseDetails)

        return response 
      } catch (error) {
        console.error('Error creating house:', error)
        throw error
      }
    },

    // updateHouse for  list update
    async updateHouse({ commit }, { id, formData }) {
      try {
        console.log('Updating house with ID:', id)
        console.log('API URL:', `${apiBaseUrl}/api/houses/${id}`)
        console.log('Headers:', { 'X-Api-Key': apiKeyCode })
        console.log('FormData:', formData)

        const response = await axios.put(`${apiBaseUrl}/api/houses/${id}`, formData, {
          headers: {
            'X-Api-Key': apiKeyCode
          }
        })

        console.log('House updated successfully:', response.data)
        commit('updateHouseDetails', response.data)
      } catch (error) {
        console.error('Error updating house:', error)
        console.log('Full response:', error.response)
        throw error 
      }
    }
  },
  getters: {
    getHouseDetails: (state) => state.houseDetails,
    getHouses: (state) => state.houses,
    getFavoriteHouses: (state) => state.housesInFavorites
  }
})
