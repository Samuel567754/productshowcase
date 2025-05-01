<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '../../types/product'
import ProductQuickView from './ProductQuickView.vue'
import { PhoneIcon } from '@heroicons/vue/24/solid'


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

// Hard-coded WhatsApp share URL for +233249998055
const whatsappShareUrl = ref('https://wa.me/233249998055')

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
          @click.stop="openQuickView"
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

      <div class = "flex justify-between items-center mt-2">
      
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

     <!-- Contact Buttons: icon only -->
  <div class="mt-4 flex space-x-4">
    <!-- WhatsApp Icon Button -->
    <a
      :href="whatsappShareUrl"
      target="_blank"
      @click.stop
      class="flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      aria-label="Contact via WhatsApp"
    >
      <svg
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </svg>
    </a>

    <!-- Call Icon Button -->
    <a
      href="tel:+233249998055"
      @click.stop
      class="flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      aria-label="Call now"
    >
      <PhoneIcon class="w-6 h-6" aria-hidden="true" />
    </a>
  </div>
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

