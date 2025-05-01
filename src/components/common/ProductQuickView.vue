<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '../../types/product'
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const selectedImage = ref(0)
const selectedSize = ref<string>('')
const selectedColor = ref(props.product.colors?.[0] || null)

// Close when clicking outside or pressing Escape
const containerRef = ref<HTMLElement | null>(null)
const handleClickOutside = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    emit('close')
  }
}
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})

// Navigate to full product page
const viewFullProduct = () => {
  router.push({ name: 'product-detail', params: { id: props.product.id } })
  emit('close')
}

// Image carousel controls
const nextImage = () => {
  selectedImage.value =
    (selectedImage.value + 1) % props.product.images.length
}
const prevImage = () => {
  selectedImage.value =
    (selectedImage.value - 1 + props.product.images.length) %
    props.product.images.length
}

// Computed discount percent (0 if no salePrice)
const discountPercent = computed(() => {
  const { salePrice, price } = props.product
  return salePrice != null
    ? Math.round((1 - salePrice / price) * 100)
    : 0
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
    <div
      ref="containerRef"
      class="bg-white dark:bg-secondary-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
    >
      <!-- Header -->
      <div class="p-4 flex justify-between items-center border-b border-secondary-200 dark:border-secondary-700">
        <h3 class="text-lg font-medium text-secondary-900 dark:text-white">
          {{ props.product.name }}
        </h3>
        <button
          @click="emit('close')"
          class="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Body -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <!-- Images -->
        <div class="relative">
          <div class="relative overflow-hidden rounded-lg h-80">
            <img
              :src="props.product.images[selectedImage]"
              :alt="props.product.name"
              class="w-full h-full object-cover object-center"
            />

            <button
              v-if="props.product.images.length > 1"
              @click="prevImage"
              class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-secondary-800 rounded-full p-1 shadow-md opacity-70 hover:opacity-100 transition-opacity"
            >
              <ChevronLeftIcon class="w-5 h-5 text-secondary-700 dark:text-secondary-200" />
            </button>
            <button
              v-if="props.product.images.length > 1"
              @click="nextImage"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-secondary-800 rounded-full p-1 shadow-md opacity-70 hover:opacity-100 transition-opacity"
            >
              <ChevronRightIcon class="w-5 h-5 text-secondary-700 dark:text-secondary-200" />
            </button>
          </div>

          <div v-if="props.product.images.length > 1" class="flex mt-4 space-x-2 overflow-x-auto pb-2">
            <button
              v-for="(img, idx) in props.product.images"
              :key="idx"
              @click="selectedImage = idx"
              :class="[
                'w-16 h-16 rounded-md overflow-hidden border-2 transition-all',
                selectedImage === idx
                  ? 'border-primary-500 dark:border-primary-400'
                  : 'border-transparent hover:border-secondary-300 dark:hover:border-secondary-600'
              ]"
            >
              <img :src="img" :alt="`${props.product.name} thumb ${idx+1}`" class="w-full h-full object-cover object-center" />
            </button>
          </div>
        </div>

        <!-- Details -->
        <div>
          <!-- Price & Sale -->
          <div class="mb-4">
            <div v-if="props.product.onSale && props.product.salePrice != null" class="flex items-center">
              <span class="text-2xl font-bold text-secondary-900 dark:text-white">
                ${{ props.product.salePrice!.toFixed(2) }}
              </span>
              <span class="ml-2 text-sm text-secondary-500 line-through">
                ${{ props.product.price.toFixed(2) }}
              </span>
              <span class="ml-2 text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-0.5 rounded">
                {{ discountPercent }}% OFF
              </span>
            </div>
            <div v-else>
              <span class="text-2xl font-bold text-secondary-900 dark:text-white">
                ${{ props.product.price.toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-secondary-600 dark:text-secondary-300 mb-4">
            {{ props.product.description }}
          </p>

          <!-- Colors -->
          <div v-if="props.product.colors?.length" class="mb-4">
            <h4 class="text-sm font-medium text-secondary-900 dark:text-white mb-2">Colors</h4>
            <div class="flex space-x-2">
              <button
                v-for="color in props.product.colors"
                :key="color.name"
                @click="selectedColor = color"
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all',
                  selectedColor?.name === color.name
                    ? 'border-primary-500 dark:border-primary-400'
                    : 'border-transparent'
                ]"
              >
                <span
                  class="w-6 h-6 rounded-full"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                ></span>
              </button>
            </div>
          </div>

          <!-- Sizes -->
          <div v-if="props.product.sizes?.length" class="mb-4">
            <h4 class="text-sm font-medium text-secondary-900 dark:text-white mb-2">Size</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in props.product.sizes"
                :key="size"
                @click="selectedSize = size"
                :class="[
                  'px-3 py-1 border rounded-md text-sm font-medium transition-all',
                  selectedSize === size
                    ? 'bg-primary-100 border-primary-500 text-primary-800 dark:bg-primary-900 dark:border-primary-500 dark:text-primary-200'
                    : 'border-secondary-300 text-secondary-700 hover:border-secondary-400 dark:border-secondary-600 dark:text-secondary-300 dark:hover:border-secondary-500'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Contact & Actions -->
          <div class="mt-6 space-y-3">
            <h4 class="text-sm font-medium text-secondary-900 dark:text-white mb-2">
              Contact Us About This Product
            </h4>

            <a
              href="https://wa.me/1234567890?text=I'm%20interested%20in%20the%20product:%20"
              target="_blank"
              class="flex items-center justify-center w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <!-- WhatsApp SVG omitted for brevity -->
              Contact via WhatsApp
            </a>

            <a
              href="tel:+11234567890"
              class="flex items-center justify-center w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <!-- Phone SVG omitted for brevity -->
              Call Now
            </a>

            <button
              @click="viewFullProduct"
              class="flex items-center justify-center w-full py-2 px-4 border border-secondary-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 dark:bg-secondary-700 dark:text-secondary-100 dark:border-secondary-600 dark:hover:bg-secondary-600"
            >
              <ArrowTopRightOnSquareIcon class="h-5 w-5 mr-2" />
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
