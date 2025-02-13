<template>
  <div class="text-center p-4">
    <!-- Search section -->
    <div class="mb-8 max-w-2xl mx-auto">
      <input v-model="searchQuery" type="text" placeholder="Search cards by name, suite, or keywords..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">

      <div class="mt-4 flex justify-center gap-4">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="searchFilters.name" class="form-checkbox h-5 w-5 text-yellow-600">
          <span class="ml-2">Name</span>
        </label>

        <label class="inline-flex items-center">
          <input type="checkbox" v-model="searchFilters.suite" class="form-checkbox h-5 w-5 text-yellow-600">
          <span class="ml-2">Suite</span>
        </label>

        <label class="inline-flex items-center">
          <input type="checkbox" v-model="searchFilters.keywords" class="form-checkbox h-5 w-5 text-yellow-600">
          <span class="ml-2">Keywords</span>
        </label>
      </div>
    </div>

    <!-- Results count -->
    <p class="text-gray-600 mb-4">
      Found {{ filteredCards.length }} cards
    </p>

    <!-- Cards grid -->
    <transition-group name="fade" tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto container">
      <div v-for="card in filteredCards" :key="card.name"
        class="card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0.5">
        <img :src="card.image" :alt="card.name" class="w-full h-auto object-cover">
        <div class="p-4">
          <h5 class="text-xl font-bold mb-2">{{ card.name }}</h5>
          <h6 class="text-gray-600 text-sm mb-2">{{ card.uprightKeywords }}</h6>
          <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
            {{ card.suite }}
          </span>
        </div>
      </div>
    </transition-group>

    <!-- No results message -->
    <div v-if="filteredCards.length === 0" class="text-gray-500 mt-8">
      No cards found matching your search criteria
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCardsStore } from '../stores/cards'

const store = useCardsStore()
const searchQuery = ref('')
const searchFilters = ref({
  name: true,
  suite: true,
  keywords: true
})

const cards = computed(() => store.getCardList)

const filteredCards = computed(() => {
  if (!searchQuery.value) return cards.value

  const query = searchQuery.value.toLowerCase()

  return cards.value.filter(card => {
    const matchName = searchFilters.value.name && card.name.toLowerCase().includes(query)
    const matchSuite = searchFilters.value.suite && card.suite.toLowerCase().includes(query)
    const matchKeywords = searchFilters.value.keywords && (
      card.uprightKeywords.toLowerCase().includes(query) ||
      card.reversedKeywords.toLowerCase().includes(query)
    )

    return matchName || matchSuite || matchKeywords
  })
})
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
</style>