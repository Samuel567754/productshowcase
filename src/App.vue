<script setup lang="ts">
import { ref, watch } from 'vue'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import ContactFab from './components/common/ContactFab.vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Initialize from saved preference
const savedDarkMode = localStorage.getItem('darkMode') === 'true'
if (savedDarkMode) {
  isDarkMode.value = true
  document.documentElement.classList.add('dark')
}

// Persist whenever it changes
watch(isDarkMode, newVal => {
  localStorage.setItem('darkMode', newVal.toString())
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar @toggle-dark-mode="toggleDarkMode" :is-dark-mode="isDarkMode" />

    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <ContactFab />
    <Footer />
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
