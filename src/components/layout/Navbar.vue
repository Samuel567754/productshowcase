<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { SunIcon, MoonIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ShoppingBagIcon, BoltIcon, TicketIcon } from '@heroicons/vue/24/outline'
import { onClickOutside } from '@vueuse/core'

// Define incoming props
type EmitEvents = {
  (e: 'toggle-dark-mode'): void
}
const props = defineProps<{ isDarkMode: boolean }>()
const emit = defineEmits<EmitEvents>()

const router = useRouter()
const route = useRoute()

const mobileMenuOpen = ref(false)
const searchQuery = ref('')
const searchOpen = ref(false)

// Reference for mobile nav, to detect outside clicks
const mobileNavRef = ref<HTMLElement | null>(null)

// Close mobile menu when clicking outside
onMounted(() => {
  onClickOutside(mobileNavRef, () => {
    mobileMenuOpen.value = false
  })
})

/** Emit dark mode toggle event */
function toggleDarkMode() {
  emit('toggle-dark-mode')
}

/** Toggle mobile menu open state */
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

/** Toggle search bar visibility and focus input */
function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    setTimeout(() => {
      document.getElementById('search-input')?.focus()
    }, 100)
  }
}

/** Handle search submission and navigate */
function handleSearch() {
  const query = searchQuery.value.trim()
  if (query) {
    const cat = query.toLowerCase() === 'clothing' ? 'clothes' : query.toLowerCase()
    router.push({ path: `/category/${cat}`, query: { search: query } })
    searchQuery.value = ''
    searchOpen.value = false
    mobileMenuOpen.value = false
  }
}

const categories = [
  { name: 'Clothes', path: '/category/clothes', icon: BoltIcon },
  { name: 'Shoes', path: '/category/shoes', icon: ShoppingBagIcon },
  { name: 'Bags', path: '/category/bags', icon: TicketIcon }
]
</script>

<template>
  <header class="bg-white dark:bg-secondary-900 sticky top-0 z-50 shadow-sm">
    <div class="container-custom">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="flex items-center">
            <span class="text-2xl font-heading font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">AMA</span>
            <span class="ml-1 text-2xl font-heading font-light text-accent-500">BlinkzStore</span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <RouterLink
            v-for="cat in categories"
            :key="cat.name"
            :to="cat.path"
            class="flex items-center font-medium transition-colors duration-200"
            :class="route.path === cat.path ? 'router-link-exact-active text-primary-600 dark:text-primary-400' : 'text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'"
            active-class="router-link-exact-active"
            exact
          >
            <component :is="cat.icon" class="h-5 w-5 mr-1" />
            {{ cat.name }}
          </RouterLink>
          <RouterLink
            to="/contact"
            class="flex items-center font-medium transition-colors duration-200"
            :class="route.path === '/contact' ? 'router-link-exact-active text-primary-600 dark:text-primary-400' : 'text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'"
            active-class="router-link-exact-active"
            exact
          >
            <component :is="ShoppingBagIcon" class="h-5 w-5 mr-1" />
            Contact
          </RouterLink>
        </nav>

        <!-- Icons -->
        <div class="flex items-center space-x-4">
          <!-- Search Toggle -->
          <button @click="toggleSearch" class="p-1 rounded-full text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 focus:outline-none transition-colors duration-200">
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>

          <!-- Dark Mode Toggle -->
          <button @click="toggleDarkMode" class="p-1 rounded-full text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 focus:outline-none transition-colors duration-200">
            <SunIcon v-if="props.isDarkMode" class="h-6 w-6" />
            <MoonIcon v-else class="h-6 w-6" />
          </button>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="md:hidden p-1 rounded-full text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 focus:outline-none transition-colors duration-200">
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div v-if="searchOpen" class="py-3 border-t border-secondary-200 dark:border-secondary-700 animate-slide-down">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-secondary-400" />
          </div>
          <input
            id="search-input"
            v-model="searchQuery"
            type="search"
            class="input pl-10 bg-secondary-50 dark:bg-secondary-800"
            placeholder="Search for products..."
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-if="mobileMenuOpen" ref="mobileNavRef" class="md:hidden border-t border-secondary-200 dark:border-secondary-700 animate-slide-down">
        <div class="pt-2 pb-4 space-y-1">
          <RouterLink
            v-for="cat in categories"
            :key="cat.name"
            :to="cat.path"
            class="flex items-center px-4 py-2 text-base font-medium transition-colors duration-200"
            :class="route.path === cat.path ? 'bg-secondary-100 dark:bg-secondary-800 text-primary-600 dark:text-primary-400' : 'text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'"
            @click="mobileMenuOpen = false"
            active-class="router-link-exact-active"
            exact
          >
            <component :is="cat.icon" class="h-5 w-5 mr-1" />
            {{ cat.name }}
          </RouterLink>
          <RouterLink
            to="/contact"
            class="flex items-center px-4 py-2 text-base font-medium transition-colors duration-200"
            :class="route.path === '/contact' ? 'bg-secondary-100 dark:bg-secondary-800 text-primary-600 dark:text-primary-400' : 'text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'"
            @click="mobileMenuOpen = false"
            active-class="router-link-exact-active"
            exact
          >
            <component :is="ShoppingBagIcon" class="h-5 w-5 mr-1" />
            Contact
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
