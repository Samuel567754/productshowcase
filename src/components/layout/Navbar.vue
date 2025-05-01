<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { SunIcon, MoonIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

// Define incoming props
type EmitEvents = {
  (e: 'toggle-dark-mode'): void
}
const props = defineProps<{ isDarkMode: boolean }>()
const emit = defineEmits<EmitEvents>()

const router = useRouter()
const mobileMenuOpen = ref(false)
const searchQuery = ref('')
const searchOpen = ref(false)

const categories = [
  { name: 'Clothes', path: '/category/clothes' },
  { name: 'Shoes', path: '/category/shoes' },
  { name: 'Bags', path: '/category/bags' }
]

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
    // Normalize category path
    const cat = query.toLowerCase() === 'clothing' ? 'clothes' : query.toLowerCase()
    router.push({ path: `/category/${cat}`, query: { search: query } })
    searchQuery.value = ''
    searchOpen.value = false
  }
}
</script>

<template>
  <header class="bg-white dark:bg-secondary-900 sticky top-0 z-50 shadow-sm">
    <div class="container-custom">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-heading font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">LUXE</span>
            <span class="ml-1 text-2xl font-heading font-light text-accent-500">Style</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="category in categories"
            :key="category.name"
            :to="category.path"
            class="font-medium text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {{ category.name }}
          </router-link>
          <router-link
            to="/contact"
            class="font-medium text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200"
          >
            Contact
          </router-link>
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
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-secondary-200 dark:border-secondary-700 animate-slide-down">
        <div class="pt-2 pb-4 space-y-1">
          <router-link
            v-for="category in categories"
            :key="category.name"
            :to="category.path"
            class="block px-4 py-2 text-base font-medium text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800 transition-colors duration-200"
            @click="mobileMenuOpen = false"
          >
            {{ category.name }}
          </router-link>
          <router-link
            to="/contact"
            class="block px-4 py-2 text-base font-medium text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800 transition-colors duration-200"
            @click="mobileMenuOpen = false"
          >
            Contact
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
