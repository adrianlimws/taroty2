<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4">
      <NavBar />
      <h1 class="text-5xl text-center my-6 font-crimson">Tarot A Day</h1>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <footer class="text-center mt-8 text-gray-600">
        <p>&copy; {{ new Date().getFullYear() }} Tarot A Day - Made by
          <a href="https://github.com/adrianlimws" class="text-blue-600 hover:text-blue-800" target="_blank">
            Adrian Matsumoto
          </a>
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>
