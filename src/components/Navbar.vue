<template>
  <header class="bg-white">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-2xl font-bold text-indigo-600">
            Taroty
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden sm:flex sm:space-x-8">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path"
            class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200" :class="[
              $route.path === item.path
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
            ]">
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open main menu</span>
            <!-- Menu icon -->
            <svg v-if="!isOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close icon -->
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-show="isOpen" class="sm:hidden bg-white border-b border-gray-200">
      <div class="pt-2 pb-3 space-y-1">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path"
          class="block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200" :class="[
            $route.path === item.path
              ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-4 border-transparent'
          ]" @click="isOpen = false">
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const navItems = [
  { name: 'Pick a card', path: '/' },
  { name: '12 Card Spread', path: '/spread' },
  { name: 'Search a card', path: '/search' },
  { name: 'Browse cards', path: '/browse' },
]
</script>