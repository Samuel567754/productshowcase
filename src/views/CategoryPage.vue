<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductsByCategory, searchProducts } from '../data/products'
import ProductCard from '../components/common/ProductCard.vue'
import type { Product, ProductFilters } from '../types/product'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline'  // removed XMarkIcon

// prefix with "_" so TS won’t error if it thinks it's unused
const _route = useRoute()  

const products = ref<Product[]>([])
const loading = ref(true)
const filtersOpen = ref(false)

const filters = ref<ProductFilters>({
  category: '',
  priceRange: [0, 1000],
  sortBy: 'newest'
})

const categoryTitle = computed(() => {
  const category = (_route.params.category as string) || ''
  return category.charAt(0).toUpperCase() + category.slice(1)
})

const filteredProducts = computed(() => {
  let result = [...products.value]

  // Price filter
  if (filters.value.priceRange) {
    result = result.filter(p => {
      const price = p.onSale ? p.salePrice! : p.price
      return price >= filters.value.priceRange![0] && price <= filters.value.priceRange![1]
    })
  }

  // On-sale & in-stock filters
  if (filters.value.onSale)  result = result.filter(p => p.onSale)
  if (filters.value.inStock) result = result.filter(p => p.inStock)

  // Sorting
  switch (filters.value.sortBy) {
    case 'price-low-high':
      result.sort((a, b) => (a.onSale ? a.salePrice! : a.price) - (b.onSale ? b.salePrice! : b.price))
      break
    case 'price-high-low':
      result.sort((a, b) => (b.onSale ? b.salePrice! : b.price) - (a.onSale ? a.salePrice! : a.price))
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    default: // newest
      result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
  }

  return result
})

function toggleFilters() {
  filtersOpen.value = !filtersOpen.value
}

const minPrice = ref(0)
const maxPrice = ref(1000)
function updatePriceRange() {
  filters.value.priceRange = [minPrice.value, maxPrice.value]
}

function resetFilters() {
  filters.value = {
    category: _route.params.category as string,
    priceRange: [0, 1000],
    sortBy: 'newest'
  }
  minPrice.value = 0
  maxPrice.value = 1000
}

function loadProducts() {
  loading.value = true
  const cat = _route.params.category as string
  filters.value.category = cat

  const q = _route.query.search as string
  products.value = q ? searchProducts(q) : getProductsByCategory(cat)
  loading.value = false
}

// reload on category or search change
watch(() => _route.params.category, () => { loadProducts(); resetFilters() }, { immediate: true })
watch(() => _route.query.search, loadProducts)
onMounted(loadProducts)
</script>

<template>
  <div class="bg-white dark:bg-secondary-900">
    <!-- Banner -->
    <div class="relative pt-16 pb-32 flex items-center justify-center">
      <div class="absolute inset-0 bg-center bg-cover"
           :style="{ backgroundImage: `url(${
             categoryTitle === 'Clothes'
               ? 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg'
               : categoryTitle === 'Shoes'
                 ? 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg'
                 : 'https://images.pexels.com/photos/932401/pexels-photo-932401.jpeg'
           })` }">
        <span class="absolute inset-0 bg-black opacity-50"></span>
      </div>
      <div class="container-custom relative text-center text-white">
        <h1 class="text-5xl font-semibold mb-4">
          {{ _route.query.search ? 'Search Results' : categoryTitle }}
        </h1>
        <p v-if="_route.query.search" class="text-xl text-secondary-200">
          Results for "{{ _route.query.search }}"
        </p>
      </div>
    </div>

    <!-- Products & Filters -->
    <section class="py-12">
      <div class="container-custom flex flex-col lg:flex-row gap-8">
        <!-- Mobile toggle -->
        <div class="lg:hidden">
          <button @click="toggleFilters"
                  class="w-full flex items-center justify-center py-3 px-4 rounded-md bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200">
            <AdjustmentsHorizontalIcon class="h-5 w-5 mr-2" />
            <span>{{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}</span>
          </button>
        </div>

        <!-- Sidebar -->
        <aside :class="[
                  'lg:w-1/4 rounded-lg shadow-sm p-6 bg-white dark:bg-secondary-800',
                  filtersOpen ? 'block' : 'hidden lg:block'
               ]">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-secondary-900 dark:text-white">Filters</h3>
            <button @click="resetFilters"
                    class="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400">Reset All</button>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-secondary-900 dark:text-white">Price Range</h4>
            <div class="flex space-x-4 mb-2">
              <div class="flex-1">
                <label for="min-price" class="block text-sm text-secondary-600 mb-1">Min</label>
                <input id="min-price" type="number" v-model="minPrice" @change="updatePriceRange" min="0" class="input"/>
              </div>
              <div class="flex-1">
                <label for="max-price" class="block text-sm text-secondary-600 mb-1">Max</label>
                <input id="max-price" type="number" v-model="maxPrice" @change="updatePriceRange" min="0" class="input"/>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-secondary-900 dark:text-white">Availability</h4>
            <label class="flex items-center mb-2">
              <input type="checkbox" v-model="filters.onSale" class="h-4 w-4 rounded"/>
              <span class="ml-2 text-secondary-700 dark:text-secondary-300">On Sale</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="filters.inStock" class="h-4 w-4 rounded"/>
              <span class="ml-2 text-secondary-700 dark:text-secondary-300">In Stock</span>
            </label>
          </div>

          <!-- Sort -->
          <div>
            <h4 class="font-medium mb-2 text-secondary-900 dark:text-white">Sort By</h4>
            <select v-model="filters.sortBy" class="input">
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="lg:w-3/4">
          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>

          <div v-else-if="filteredProducts.length === 0" class="text-center py-16">
            <h3 class="text-xl font-medium text-secondary-900 dark:text-white mb-2">No products found</h3>
            <p class="text-secondary-600 dark:text-secondary-400">Try adjusting your filters or search criteria</p>
            <button @click="resetFilters" class="mt-4 btn-primary">Reset Filters</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
