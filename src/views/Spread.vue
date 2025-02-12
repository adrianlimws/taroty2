<template>
  <div class="text-center p-4">
    <!-- Question prompt -->
    <p class="text-xl bg-gray-100 p-4 rounded mb-8">"Discover your complete reading with the Celtic Cross spread"</p>

    <!-- Draw button -->
    <button @click="getSpread"
      class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg text-xl w-64 mx-auto block mb-8">
      Draw Your Cards
    </button>

    <!-- Cards display -->
    <transition name="fade">
      <div v-if="spreadCards.length" class="mt-8">
        <hr class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="(card, index) in spreadCards" :key="index"
            class="card transform transition duration-300 hover:-translate-y-2">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <img :src="card.image" :alt="card.name" class="w-full h-auto" @error="handleImageError">
              <div class="p-4">
                <h5 class="text-xl font-bold mb-2">{{ card.name }}</h5>
                <h6 class="text-gray-600 mb-2">Position: {{ positions[index] }}</h6>
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
import { ref, onMounted } from 'vue'
import { useCardsStore } from '../stores/cards'

const store = useCardsStore()
const spreadCards = ref([])

const positions = [
  'Present Situation',
  'Challenge',
  'Past Foundation',
  'Recent Past',
  'Best Outcome',
  'Immediate Future',
  'Current Influence',
  'External Influences',
  'Hopes and Fears',
  'Final Outcome',
  'Spiritual Guidance',
  'Overall Theme'
]

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