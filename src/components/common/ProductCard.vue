<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '../../types/product'
import ProductQuickView from './ProductQuickView.vue'

// Declare props with full type inference
const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const showQuickView = ref(false)

/**
 * Open the quick-view modal without triggering the
 * parent click (navigation).
 */
function openQuickView(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  showQuickView.value = true
}

/** Close the quick-view modal. */
function closeQuickView() {
  showQuickView.value = false
}

/** Navigate to the product detail page. */
function navigateToProduct() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div class="card group cursor-pointer" @click="navigateToProduct">
    <!-- Product Image & Quick View Button -->
    <div class="relative overflow-hidden">
      <img
        :src="props.product.images[0]"
        :alt="props.product.name"
        class="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      <!-- Quick View overlay -->
      <div
        class="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-20"
      >
        <button
          @click="openQuickView"
          class="opacity-0 group-hover:opacity-100 bg-white dark:bg-secondary-800 text-secondary-800 dark:text-white py-2 px-4 rounded-md font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          Quick View
        </button>
      </div>

      <!-- Category badge -->
      <div class="absolute top-2 left-2">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200"
        >
          {{ props.product.category }}
        </span>
      </div>

      <!-- Sale badge -->
      <div v-if="props.product.onSale" class="absolute top-2 right-2">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        >
          Sale
        </span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="text-lg font-medium text-secondary-900 dark:text-white">
        {{ props.product.name }}
      </h3>

      <!-- Price display with sale fallback -->
      <div class="mt-1 flex items-center">
        <template v-if="props.product.onSale">
          <span class="text-lg font-bold text-secondary-900 dark:text-white">
            ${{ (props.product.salePrice ?? props.product.price).toFixed(2) }}
          </span>
          <span class="ml-2 text-sm text-secondary-500 line-through">
            ${{ props.product.price.toFixed(2) }}
          </span>
        </template>
        <template v-else>
          <span class="text-lg font-bold text-secondary-900 dark:text-white">
            ${{ props.product.price.toFixed(2) }}
          </span>
        </template>
      </div>

      <!-- Star Rating -->
      <div class="mt-1 flex items-center">
        <div class="flex">
          <template v-for="i in 5" :key="i">
            <svg
              :class="i <= Math.round(props.product.rating) ? 'text-accent-500' : 'text-secondary-300'"
              class="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </template>
        </div>
        <span class="ml-1 text-xs text-secondary-500 dark:text-secondary-400">
          ({{ props.product.reviewCount }})
        </span>
      </div>

      <!-- Available Colors -->
      <div v-if="props.product.colors?.length" class="mt-3 flex space-x-1">
        <div
          v-for="color in props.product.colors"
          :key="color.name"
          class="w-4 h-4 rounded-full border border-secondary-300 dark:border-secondary-600"
          :style="{ backgroundColor: color.hex }"
          :title="color.name"
        />
      </div>
    </div>

    <!-- Quick View Modal -->
    <ProductQuickView
      v-if="showQuickView"
      :product="props.product"
      @close="closeQuickView"
    />
  </div>
</template>
