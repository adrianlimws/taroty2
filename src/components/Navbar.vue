<template>
  <nav class="py-4">
    <ul class="flex justify-center space-x-4">
      <li class="text-2xl font-bold text-gray-800">Taroty</li>
      <li v-for="item in navItems" :key="item.path">
        <router-link :to="item.path" class="px-4 py-2 text-gray-700 hover:text-gray-900"
          :class="{ 'font-bold': $route.path === item.path }">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const navItems = [
  { name: 'Pick a card', path: '/' },
  { name: 'Search a card', path: '/search' },
  { name: 'Browse cards', path: '/browse' },
  { name: '12 Card Spread', path: '/spread' },
]
</script>