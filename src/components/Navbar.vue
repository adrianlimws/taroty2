<template>
  <nav class="py-4 relative">
    <div class="flex justify-between items-center mx-auto px-4 py-2">
      <!-- Mobile menu button -->
      <button @click="isOpen = !isOpen" class="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Logo -->
      <div class="text-2xl font-bold text-gray-800">Taroty</div>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex space-x-4 items-center">
        <li v-for="item in navItems" :key="item.path">
          <router-link :to="item.path" class="px-4 py-2 text-gray-700 hover:text-gray-900"
            :class="{ 'font-bold': $route.path === item.path }">
            {{ item.name }}
          </router-link>
        </li>
      </ul>

      <!-- GitHub link -->
      <a href="https://github.com/adrianlimws" target="_blank" rel="noopener noreferrer"
        class="text-gray-700 hover:text-gray-900 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </div>

    <!-- Mobile Navigation -->
    <div v-show="isOpen" class="md:hidden">
      <ul class="px-2 pt-2 pb-3 space-y-1">
        <li v-for="item in navItems" :key="item.path">
          <router-link :to="item.path"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            :class="{ 'bg-gray-100 font-bold': $route.path === item.path }" @click="isOpen = false">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const navItems = [
  { name: 'Single Card', path: '/' },
  { name: '12 Card Spread', path: '/spread' },
  { name: 'Browse cards', path: '/browse' },
]
</script>