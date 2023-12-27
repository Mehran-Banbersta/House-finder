<template>
  <div class="house-details-recommend">
    <h4>Recommended Houses</h4>

    <HouseList
      v-for="recommendedHouse in recommendedHouses"
      :key="recommendedHouse.id"
      :house="recommendedHouse"
    />
  </div>
</template>

<script>
import HouseList from './HouseList.vue'
export default {
  props: {
    recommendedHouses: Array
  },
  components: {
    HouseList 
  }
}
</script>

<style>

.house-details-recommend  .house-item {
  padding: .4rem;
}

.house-details-recommend h4 {
  padding-bottom: 1rem;
}

.house-details-recommend {
  background-color: #f3f8f8;
 margin-left: 2rem;
}

.house-details-recommend .house-item-image{
  width: 80px;
  height: 90px;
  margin-right: .3rem;
}

.house-details-recommend img{
  width: 10px;
  height: 10px;
}
.house-details-recommend .house-items-street-edit-delete-favorite h2 {
    font-size: .7rem;
  }

  .house-details-recommend .house-info-bed-bath-size {
    font-size: 0.6rem;
    gap: 17px;
  }
  .house-details-recommend 
  .container {
    margin-left: 0.2rem;
    line-height: 1.3;
  }

  .house-details-recommend 
  .price-zip-city {
    font-size: 0.7rem;
  }

</style>
