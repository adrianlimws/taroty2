<template>
  <div class="min-h-screen bg-yellow-50">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

</template>

<script setup>
import NavBar from './components/Navbar.vue'
</script>
