<template>
  <div class="min-h-screen bg-white">
    <div class="px-4">
      <NavBar />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>
