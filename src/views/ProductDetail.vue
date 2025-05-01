<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById, getRelatedProducts } from '../data/products'
import ProductCard from '../components/common/ProductCard.vue'
import type { Product } from '../types/product'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline'

// Route and router
const route = useRoute()
const router = useRouter()

// Reactive state
const product = ref<Product | null>(null)
const relatedProducts = ref<Product[]>([])
const selectedImage = ref(0)
const selectedColor = ref<string | null>(null)
const selectedSize = ref<string | null>(null)
const quantity = ref(1)

// Social sharing URLs
const whatsappShareUrl = computed(() => {
  if (!product.value) return ''
  const text = `Check out this ${product.value.name} on LUXE Style: ${window.location.href}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})

const emailShareUrl = computed(() => {
  if (!product.value) return ''
  const subject = `Check out this ${product.value.name} on LUXE Style`
  const body = `I found this amazing product and thought you might like it: ${window.location.href}`
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

// Fetch product and related data on mount
onMounted(() => {
  const productId = route.params.id as string
  const fetched = getProductById(productId)
  if (!fetched) {
    router.push('/')
    return
  }
  product.value = fetched

  // Initialize defaults
  if (fetched.colors?.length) {
    selectedColor.value = fetched.colors[0].name
  }
  if (fetched.sizes?.length) {
    selectedSize.value = fetched.sizes[0]
  }

  relatedProducts.value = getRelatedProducts(fetched)
})

// Image selection
function selectImage(index: number) {
  selectedImage.value = index
}
function nextImage() {
  if (!product.value) return
  selectedImage.value = (selectedImage.value + 1) % product.value.images.length
}
function prevImage() {
  if (!product.value) return
  selectedImage.value = (selectedImage.value - 1 + product.value.images.length) % product.value.images.length
}

// Quantity controls
function incrementQuantity() {
  quantity.value++
}
function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}
</script>

<template>
  <div v-if="product" class="py-12 bg-white dark:bg-secondary-900">
    <div class="container-custom">
      <!-- Breadcrumbs -->
      <nav class="mb-8">
        <ol class="flex text-sm">
          <li>
            <router-link to="/" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
              Home
            </router-link>
          </li>
          <li class="mx-2 text-secondary-400">/</li>
          <li>
            <router-link :to="`/category/${product.category}`" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
              {{ product.category.charAt(0).toUpperCase() + product.category.slice(1) }}
            </router-link>
          </li>
          <li class="mx-2 text-secondary-400">/</li>
          <li class="text-secondary-900 dark:text-white font-medium">{{ product.name }}</li>
        </ol>
      </nav>

      <!-- Product Details -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div>
          <div class="relative rounded-lg overflow-hidden bg-secondary-100 dark:bg-secondary-800 mb-4">
            <img
              :src="product.images[selectedImage]"
              :alt="product.name"
              class="w-full h-auto object-contain aspect-square"
            />
            <button v-if="product.images.length > 1" @click="prevImage" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-secondary-800 rounded-full p-2 shadow-md opacity-80 hover:opacity-100 transition-opacity">
              <ChevronLeftIcon class="h-5 w-5 text-secondary-700 dark:text-secondary-200" />
            </button>
            <button v-if="product.images.length > 1" @click="nextImage" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-secondary-800 rounded-full p-2 shadow-md opacity-80 hover:opacity-100 transition-opacity">
              <ChevronRightIcon class="h-5 w-5 text-secondary-700 dark:text-secondary-200" />
            </button>
            <div v-if="product.onSale" class="absolute top-2 right-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                Sale
              </span>
            </div>
          </div>
          <div v-if="product.images.length > 1" class="flex space-x-2 overflow-x-auto">
            <button v-for="(image, index) in product.images" :key="index" @click="selectImage(index)" :class="[
                'w-20 h-20 rounded-md overflow-hidden border-2 transition-all',
                selectedImage === index
                  ? 'border-primary-500 dark:border-primary-400'
                  : 'border-transparent hover:border-secondary-300 dark:hover:border-secondary-600'
              ]">
              <img :src="image" :alt="`${product.name} view ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-3xl font-bold text-secondary-900 dark:text-white mb-2">{{ product.name }}</h1>
          <div class="flex items-center mb-4">
            <div class="flex">
              <template v-for="i in 5" :key="i">
                <svg :class="i <= Math.round(product.rating) ? 'text-accent-500' : 'text-secondary-300'" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </template>
            </div>
            <span class="ml-2 text-sm text-secondary-600 dark:text-secondary-400">{{ product.rating }} ({{ product.reviewCount }} reviews)</span>
          </div>

          <div class="mb-6">
            <template v-if="product.onSale">
              <span class="text-3xl font-bold text-secondary-900 dark:text-white">${{ product.salePrice!.toFixed(2) }}</span>
              <span class="ml-2 text-lg text-secondary-500 line-through">${{ product.price.toFixed(2) }}</span>
              <span class="ml-2 text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-0.5 rounded">{{ Math.round((1 - (product.salePrice! / product.price)) * 100) }}% OFF</span>
            </template>
            <template v-else>
              <span class="text-3xl font-bold text-secondary-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
            </template>
          </div>

          <p class="text-secondary-700 dark:text-secondary-300 mb-8">{{ product.description }}</p>

          <div v-if="product.colors?.length" class="mb-6">
            <h3 class="text-sm font-medium text-secondary-900 dark:text-white mb-3">Color</h3>
            <div class="flex space-x-2">
              <button v-for="color in product.colors" :key="color.name" @click="selectedColor = color.name" :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                  selectedColor === color.name
                    ? 'border-primary-500 dark:border-primary-400'
                    : 'border-secondary-300 dark:border-secondary-600'
                ]" :title="color.name">
                <span class="w-8 h-8 rounded-full" :style="{ backgroundColor: color.hex }"></span>
              </button>
            </div>
          </div>

          <div v-if="product.sizes?.length" class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-medium text-secondary-900 dark:text-white">Size</h3>
              <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">Size guide</a>
            </div>
            <div class="flex flex-wrap gap-2">
              <button v-for="size in product.sizes" :key="size" @click="selectedSize = size" :class="[
                  'px-4 py-2 border rounded-md text-sm font-medium transition-colors',
                  selectedSize === size
                    ? 'bg-primary-100 border-primary-500 text-primary-800 dark:bg-primary-900 dark:border-primary-500 dark:text-primary-200'
                    : 'border-secondary-300 text-secondary-700 hover:border-secondary-400 dark:border-secondary-600 dark:text-secondary-300 dark:hover:border-secondary-500'
                ]">{{ size }}</button>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-sm font-medium text-secondary-900 dark:text-white mb-3">Quantity</h3>
            <div class="flex">
              <button @click="decrementQuantity" class="w-10 h-10 flex items-center justify-center border border-r-0 border-secondary-300 rounded-l-md dark:border-secondary-600">
                <span class="text-secondary-600 dark:text-secondary-400">−</span>
              </button>
              <input type="number" v-model="quantity" min="1" class="w-16 h-10 text-center border-y border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white" />
              <button @click="incrementQuantity" class="w-10 h-10 flex items-center justify-center border border-l-0 border-secondary-300 rounded-r-md dark:border-secondary-600">
                <span class="text-secondary-600 dark:text-secondary-400">+</span>
              </button>
            </div>
          </div>

          <div class="space-y-3 mb-8">
            <h3 class="text-sm font-medium text-secondary-900 dark:text-white mb-3">Contact Us About This Product</h3>
            <!-- WhatsApp Share Button -->
  <a
    :href="whatsappShareUrl"
    target="_blank"
    class="flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    aria-label="Contact via WhatsApp"
  >
    <svg
      class="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    Contact via WhatsApp
  </a>

  <!-- Phone Call Button -->
  <a
    href="tel:+11234567890"
    class="flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    aria-label="Call now"
  >
    <PhoneIcon class="h-5 w-5 mr-2" aria-hidden="true" />
    Call Now
  </a>
          </div>

          <div class="flex space-x-4 mt-6">
            <a :href="whatsappShareUrl" target="_blank" class="flex items-center text-sm text-secondary-600 hover:text-green-600 dark:text-secondary-400 dark:hover:text-green-500 transition-colors">
              <ChevronRightIcon class="w-5 h-5 mr-1" />
              Share on WhatsApp
            </a>
            <a :href="emailShareUrl" class="flex items-center text-sm text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-500 transition-colors">
              <ChevronRightIcon class="w-5 h-5 mr-1" />
              Share via Email
            </a>
          </div>
        </div>
      </div>

      <!-- Product Features -->
      <div v-if="product.features?.length" class="mt-16">
        <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Product Features</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg p-6">
          <li v-for="feature in product.features" :key="feature" class="flex items-start">
            <svg class="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 дение..." clip-rule="evenodd"/></svg>
            <span class="text-secondary-700 dark:text-secondary-300">{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length" class="mt-16">
        <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-6">You May Also Like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="rp in relatedProducts" :key="rp.id" :product="rp" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-32 text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
    <p class="text-secondary-600 dark:text-secondary-400">Loading product...</p>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
