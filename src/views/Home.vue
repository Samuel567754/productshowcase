<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductCard from '../components/common/ProductCard.vue';
import { getFeaturedProducts, getProductsByCategory } from '../data/products';
import type { Product } from '../types/product';

const featuredProducts = ref<Product[]>([]);
const newArrivals = ref<Product[]>([]);

onMounted(() => {
  featuredProducts.value = getFeaturedProducts();
  
  // Get a mix of products for new arrivals section
  const clothes = getProductsByCategory('clothes').filter(p => p.new).slice(0, 2);
  const shoes = getProductsByCategory('shoes').filter(p => p.new).slice(0, 2);
  const bags = getProductsByCategory('bags').filter(p => p.new).slice(0, 2);
  
  newArrivals.value = [...clothes, ...shoes, ...bags];
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-secondary-900 text-white overflow-hidden">
      <div class="absolute inset-0 opacity-50">
        <img
          src="https://images.pexels.com/photos/5273063/pexels-photo-5273063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Fashion hero"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <div class="relative container-custom py-24 md:py-32 flex flex-col items-center text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
          Elevate Your Style
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mb-8 animate-slide-up" style="animation-delay: 0.1s">
          Discover our premium collection of clothes, shoes, and bags designed for the modern individual.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 animate-slide-up" style="animation-delay: 0.2s">
          <router-link
            to="/category/clothes"
            class="btn-accent px-8 py-3 text-base"
          >
            Shop Now
          </router-link>
          <router-link
            to="/contact"
            class="btn-secondary px-8 py-3 text-base"
          >
            Contact Us
          </router-link>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-secondary-50 dark:bg-secondary-800">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Clothes -->
          <router-link to="/category/clothes" class="group">
            <div class="relative overflow-hidden rounded-lg aspect-[3/4] shadow-md">
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Clothes"
                class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                <div>
                  <h3 class="text-white text-2xl font-bold mb-2">Clothes</h3>
                  <p class="text-secondary-200 mb-3">Premium apparel for every occasion</p>
                  <span class="inline-block text-white font-medium border-b border-white">
                    Shop Collection
                  </span>
                </div>
              </div>
            </div>
          </router-link>

          <!-- Shoes -->
          <router-link to="/category/shoes" class="group">
            <div class="relative overflow-hidden rounded-lg aspect-[3/4] shadow-md">
              <img
                src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Shoes"
                class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                <div>
                  <h3 class="text-white text-2xl font-bold mb-2">Shoes</h3>
                  <p class="text-secondary-200 mb-3">Stylish footwear for every step</p>
                  <span class="inline-block text-white font-medium border-b border-white">
                    Shop Collection
                  </span>
                </div>
              </div>
            </div>
          </router-link>

          <!-- Bags -->
          <router-link to="/category/bags" class="group">
            <div class="relative overflow-hidden rounded-lg aspect-[3/4] shadow-md">
              <img
                src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Bags"
                class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                <div>
                  <h3 class="text-white text-2xl font-bold mb-2">Bags</h3>
                  <p class="text-secondary-200 mb-3">Premium bags for every lifestyle</p>
                  <span class="inline-block text-white font-medium border-b border-white">
                    Shop Collection
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 bg-white dark:bg-secondary-900">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-4">Featured Products</h2>
        <p class="text-secondary-600 dark:text-secondary-400 text-center max-w-2xl mx-auto mb-12">Discover our handpicked selection of premium products designed to elevate your style.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in featuredProducts.slice(0, 4)" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="text-center mt-10">
          <router-link 
            to="/category/clothes" 
            class="btn-primary px-6 py-2.5"
          >
            View All Products
          </router-link>
        </div>
      </div>
    </section>

    <!-- Promotion Banner -->
    <section class="relative py-24 bg-accent-500 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <img
          src="https://images.pexels.com/photos/5624980/pexels-photo-5624980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Promotional background"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <div class="relative container-custom">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">New Season Arrivals</h2>
          <p class="text-xl text-white/90 mb-8">Discover our latest collection and stay ahead of the trends.</p>
          <router-link 
            to="/category/clothes?new=true" 
            class="inline-block bg-white text-accent-600 px-8 py-3 rounded-md font-semibold hover:bg-accent-50 transition-colors duration-300"
          >
            Shop New Arrivals
          </router-link>
        </div>
      </div>
    </section>

    <!-- New Arrivals Section -->
    <section class="py-16 bg-secondary-50 dark:bg-secondary-800">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-4">New Arrivals</h2>
        <p class="text-secondary-600 dark:text-secondary-400 text-center max-w-2xl mx-auto mb-12">Fresh additions to our collections that you'll love.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in newArrivals" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </section>

    <!-- About/Why Choose Us Section -->
    <section class="py-16 bg-white dark:bg-secondary-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">Why Choose LUXE Style?</h2>
            <p class="text-secondary-600 dark:text-secondary-400 mb-8">
              At LUXE Style, we believe that fashion is more than just clothing – it's an expression of who you are. We curate high-quality products that combine timeless elegance with contemporary designs.
            </p>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-primary-600 dark:text-primary-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-secondary-900 dark:text-white">Premium Quality</h3>
                  <p class="mt-1 text-secondary-600 dark:text-secondary-400">We source only the finest materials and partner with skilled artisans who take pride in their craft.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-primary-600 dark:text-primary-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-secondary-900 dark:text-white">Personalized Service</h3>
                  <p class="mt-1 text-secondary-600 dark:text-secondary-400">We're always available to help you find the perfect item and answer any questions you may have.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-primary-600 dark:text-primary-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-secondary-900 dark:text-white">Curated Collections</h3>
                  <p class="mt-1 text-secondary-600 dark:text-secondary-400">Each item is carefully selected to ensure it meets our standards for style, quality, and sustainability.</p>
                </div>
              </div>
            </div>
            
            <div class="mt-8">
              <router-link to="/contact" class="btn-primary">
                Contact Us
              </router-link>
            </div>
          </div>
          
          <div class="relative">
            <img 
              src="https://images.pexels.com/photos/4968390/pexels-photo-4968390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Our story" 
              class="rounded-lg shadow-xl w-full h-auto"
            />
            <div class="absolute -bottom-6 -left-6 w-36 h-36 bg-accent-500 rounded-lg flex items-center justify-center text-white p-4 shadow-lg">
              <div class="text-center">
                <span class="block text-3xl font-bold">15+</span>
                <span class="block text-sm">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>