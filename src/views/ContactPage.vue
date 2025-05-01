<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-96"
      style="background-image: url('https://plus.unsplash.com/premium_photo-1681487748082-839c7c0ee0c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q09OVEFDVHxlbnwwfHwwfHx8MA%3D%3D');"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div
        class="container-custom relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
      >
        <h1 class="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Discover Your Style
        </h1>
        <p class="text-xl mb-6 drop-shadow-md">
          Elevate your wardrobe with our latest collection of clothes, shoes, and accessories.
        </p>
        <button @click="scrollToForm" class="btn-primary px-8 py-3 text-lg flex items-center">
          Get In Touch
          <ArrowRightIcon class="ml-2 w-5 h-5" />
        </button>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-12 bg-white dark:bg-secondary-900">
      <div ref="contactForm" class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h2
            class="text-4xl font-bold text-center text-secondary-900 dark:text-white mb-3"
          >
            Get In Touch
          </h2>
          <p class="text-center text-secondary-600 dark:text-secondary-400 mb-12">
            We'd love to hear from you. Please fill out the form below or reach out through our contact information.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <!-- Contact Form -->
            <div class="lg:col-span-3 bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6">
              <div v-if="formSubmitted" class="text-center py-12">
                <div
                  class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-green-600 dark:text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-medium text-secondary-900 dark:text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p class="text-secondary-600 dark:text-secondary-400 mb-6">
                  Thank you for contacting us. We will get back to you as soon as possible.
                </p>
                <button @click="resetForm" class="btn-primary">
                  Send Another Message
                </button>
              </div>

              <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name & Email -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <!-- Phone & Product Interest -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="phone"
                      class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="input"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                  <div>
                    <label
                      for="product"
                      class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                    >
                      Product Interest
                    </label>
                    <select id="product" v-model="form.productInterest" class="input">
                      <option value="clothes">Clothes</option>
                      <option value="shoes">Shoes</option>
                      <option value="bags">Bags</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <!-- Subject -->
                <div>
                  <label
                    for="subject"
                    class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    required
                    class="input"
                    placeholder="How can we help you?"
                  />
                </div>

                <!-- Message -->
                <div>
                  <label
                    for="message"
                    class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="4"
                    required
                    class="input"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div>
                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full flex items-center justify-center btn-primary py-3"
                  >
                    <span v-if="loading">
                      <svg
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        />
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                    <span v-else>
                      Send Message
                      <ArrowRightIcon class="ml-2 -mr-1 w-4 h-4" />
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <!-- Contact Info & Social -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Contact Information -->
              <div class="bg-secondary-50 dark:bg-secondary-800 rounded-lg shadow-md p-6">
                <h3
                  class="text-lg font-semibold text-secondary-900 dark:text-white mb-4"
                >
                  Contact Information
                </h3>
                <ul class="space-y-4">
                  <li class="flex">
                    <PhoneIcon
                      class="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm font-medium text-secondary-900 dark:text-white">
                        Phone
                      </p>
                      <a
                        href="tel:+11234567890"
                        class="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        +1 (123) 456-7890
                      </a>
                    </div>
                  </li>
                  <li class="flex">
                    <EnvelopeIcon
                      class="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm font-medium text-secondary-900 dark:text-white">
                        Email
                      </p>
                      <a
                        href="mailto:info@luxestyle.com"
                        class="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        info@luxestyle.com
                      </a>
                    </div>
                  </li>
                  <li class="flex">
                    <MapPinIcon
                      class="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm font-medium text-secondary-900 dark:text-white">
                        Address
                      </p>
                      <p class="text-secondary-600 dark:text-secondary-400">
                        123 Fashion Street<br />
                        Style City, 12345<br />
                        United States
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Social & Hours -->
              <div class="bg-accent-500 text-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-3">Connect With Us</h3>
                <p class="mb-4">
                  Follow us on social media for the latest updates, promotions, and fashion inspiration.
                </p>
                <div class="flex space-x-4">
                  <!-- Social Icons... -->
                  <a href="#" class="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors">
                    <!-- Facebook Icon -->
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <!-- Instagram Icon -->
                  <a href="#" class="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <!-- Twitter Icon -->
                  <a href="#" class="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                  <!-- WhatsApp Icon -->
                  <a href="#" class="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.670.150-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.150-1.255-.463-2.390-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.130-.606.134-.133.298-.347.446-.520.149-.174.198-.298.298-.497.099-.198.050-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.500-.669-.510-.173-.008-.371-.010-.570-.010-.198 0-.520.074-.792.372-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.200 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.360.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347"
                      />
                    </svg>
                  </a>
                </div>
                <div class="mt-6 pt-6 border-t border-white border-opacity-20">
                  <h4 class="font-medium mb-2">Business Hours</h4>
                  <ul class="space-y-1 text-sm">
                    <li class="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 8:00 PM</span>
                    </li>
                    <li class="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </li>
                    <li class="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  productInterest: string
}

const form = ref<FormData>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  productInterest: 'clothes',
})
const formSubmitted = ref(false)
const loading = ref(false)
// template ref for scroll
const contactForm = ref<HTMLElement | null>(null)

const handleSubmit = () => {
  loading.value = true
  setTimeout(() => {
    formSubmitted.value = true
    loading.value = false
  }, 1500)
}

const resetForm = () => {
  formSubmitted.value = false
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    productInterest: 'clothes',
  }
}

const scrollToForm = () => {
  contactForm.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.container-custom {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
