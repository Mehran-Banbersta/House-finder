<template>
  <div class="sorting-buttons-container">
    <button
      @click="toggleDropdown('price')"
      class="price-sorting-button"
      :class="{ active: showPriceDropdown }"
    >
      Price
    </button>
    <button
      @click="toggleDropdown('size')"
      class="size-sorting-button"
      :class="{ active: showSizeDropdown }"
    >
      Size
    </button>

    <!-- Price Dropdown -->
    <div class="drop-down">
      <div v-if="showPriceDropdown" class="dropdown-price">
        <!-- Price options go here -->
        <!-- Price Dropdown -->
        <div @click="selectSortingOption('price', 1, 300000)">€0 - €300,000</div>
        <div @click="selectSortingOption('price', 300000, 600000)">€300,000 - €600,000</div>
        <div @click="selectSortingOption('price', 600000, 900000)">€600,000 - €900,000</div>
        <div @click="selectSortingOption('price', 900000, 1000000)">€900,000 - €1,000,000</div>
        <div @click="selectSortingOption('price', 1000000, 1300000)">€1,000,000 - €1,300,000</div>
        <div @click="selectSortingOption('price', 1300000, 1600000)">€1,300,000 - €1,600,000</div>
        <div @click="selectSortingOption('price', 1600000, 1900000)">€1,600,000 - €1,900,000</div>
      </div>

      <!-- Size Dropdown -->
      <div v-if="showSizeDropdown" class="dropdown-size">
        <!-- Size options go here -->
        <div @click="selectSortingOption('size', 1, 100)">0 m2 - 100 m2</div>
        <div @click="selectSortingOption('size', 100, 150)">100 m2 - 150 m2</div>
        <div @click="selectSortingOption('size', 150, 200)">150 m2 - 200 m2</div>
        <div @click="selectSortingOption('size', 200, 300)">200 m2 - 300 m2</div>
        <div @click="selectSortingOption('size', 300, 400)">300 m2 - 400 m2</div>
        <div @click="selectSortingOption('size', 400, 500)">400 m2 - 500 m2</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPriceDropdown: false,
      showSizeDropdown: false
    }
  },
  methods: {
    toggleDropdown(option) {
      if (option === 'price') {
        this.showPriceDropdown = !this.showPriceDropdown
        this.showSizeDropdown = false
      } else if (option === 'size') {
        this.showSizeDropdown = !this.showSizeDropdown
        this.showPriceDropdown = false
      }
    },
    selectSortingOption(option, min, max) {
      if (!min || !max) {
        alert('Please select both minimum and maximum values for the price range.')
        return
      }

      this.$emit('sortBy', { option, min, max })
      this.showPriceDropdown = false
      this.showSizeDropdown = false
    }
  }
}
</script>
<style>
.sorting-buttons-container {
  width: 260px;
}
.sorting-buttons-container button {
  height: 35px;
  width: 50%;
  border: none;
  cursor: pointer;
}

.drop-down {
  position: fixed;
  z-index: 11;
  width: 260px;
}

.price-sorting-button {
  background-color: var(--primary-color);
  border-radius: 0.3rem 0 0 0.3rem;
  color: var(--background-color-2);
  font-size: var(--font-size-buttons-desktop);
}

.size-sorting-button:hover,
.price-sorting-button:hover {
  background-color: var(--secondary-color);
}

.size-sorting-button {
  background-color: var(--tertiary-color-2);
  border-radius: 0 0.3rem 0.3rem 0;
  color: var(--background-color-2);
  font-size: var(--font-size-buttons-desktop);
}

.dropdown-size,
.dropdown-price {
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-price div,
.dropdown-size div {
  padding: 12px 16px;
  display: block;
  cursor: pointer;
  font-size: 0.9rem;
}

.dropdown-price div:hover,
.dropdown-size div:hover {
  background-color: var(--primary-color);
  color: white;
}

.price-sorting-button.active,
.size-sorting-button.active {
  background-color: var(--secondary-color);
}

@media only screen and (max-width: 600px) {
  .sorting-buttons-container {
    width: 100%;
  }

  .dropdown-size {
    position: absolute;
    left: 16rem;
    width: 260px;
  }

  .price-sorting-button,
  .size-sorting-button {
    font-size: var(--font-size-buttons-mobile);
  }
}
</style>
