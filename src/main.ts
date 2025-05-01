// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterScrollBehavior
} from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './views/Home.vue'
import ProductDetail from './views/ProductDetail.vue'
import CategoryPage from './views/CategoryPage.vue'
import ContactPage from './views/ContactPage.vue'

// 1) Define your routes with proper typing
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/category/:category',
    name: 'category',
    component: CategoryPage,
    props: true
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage
  }
]

// 2) Custom scroll behavior
const scrollBehavior: RouterScrollBehavior = (_to, _from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  // Always scroll to top for new navigations
  return { top: 0 }
}

// 3) Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior
})

// 4) Create Pinia store
const pinia = createPinia()

// 5) Bootstrap the app
createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
