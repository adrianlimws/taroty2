<template>
  <div class="text-center p-4 max-w-7xl mx-auto">
    <!-- Language selector -->
    <div class="mb-4">
      <select v-model="currentLang" class="rounded-md border-gray-300 shadow-sm px-4 py-2">
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>

    <!-- Question prompt -->
    <p class="text-xl bg-yellow-100 p-4 rounded mb-8 mx-4">
      {{ t(`spread.title`) }}
    </p>

    <!-- Draw button -->
    <button @click="getSpread"
      class="bg-yellow-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg text-xl w-full max-w-xs mx-auto block mb-8">
      {{ t(`spread.drawButton`) }}
    </button>

    <!-- Cards display -->
    <transition name="fade">
      <div v-if="spreadCards.length" class="mt-8 mx-auto container px-4">
        <hr class="mb-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="(card, index) in spreadCards" :key="index"
            class="card transform transition duration-300 hover:-translate-y-2">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden border-0.5">
              <img :src="card.image" :alt="card.name" class="w-full h-auto" @error="handleImageError">
              <div class="p-4">
                <h5 class="text-xl font-bold mb-2 underline">{{ card.name }}</h5>
                <h6 class="text-gray-600 mb-2 font-bold">{{ getPosition(index) }}</h6>
                <p class="text-gray-700 mb-3">{{ card.uprightKeywords }}</p>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {{ card.suite }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCardsStore } from '../stores/cards'
import { translations } from '../locales/translations'

const store = useCardsStore()
const spreadCards = ref([])
const currentLang = ref(localStorage.getItem('currentLang') || 'en')

// Add a watch effect to persist language changes
watch(currentLang, (newLang) => {
  localStorage.setItem('currentLang', newLang)
})

// Translation function
const t = (key) => {
  const keys = key.split('.')
  let result = translations[currentLang.value]
  for (const k of keys) {
    result = result[k]
  }
  return result
}

const positionKeys = [
  'presentSituation',
  'challenge',
  'pastFoundation',
  'recentPast',
  'bestOutcome',
  'immediateFuture',
  'currentInfluence',
  'externalInfluences',
  'hopesAndFears',
  'finalOutcome',
  'spiritualGuidance',
  'overallTheme'
]

const getPosition = (index) => {
  return t(`spread.positions.${positionKeys[index]}`)
}

const handleImageError = (e) => {
  console.error('Image failed to load:', e)
}

const getSpread = () => {
  // Reset current spread
  spreadCards.value = []

  // Get all cards from store
  const cards = store.getCardList

  // Get 12 unique random cards
  const shuffled = [...cards].sort(() => 0.5 - Math.random())
  spreadCards.value = shuffled.slice(0, 12)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.card {
  perspective: 1000px;
}
</style>