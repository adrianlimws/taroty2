<template>
  <div class="container text-center p-4">
    <!-- Question prompt -->
    <p class="text-xl bg-gray-100 p-4 rounded mb-8">"Think of a question before you pick a card."</p>

    <!-- Card button -->
    <button @click="getCard"
      class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg text-xl w-64 mx-auto block mb-8">
      Pick a Card
    </button>

    <!-- Card display -->
    <Transition name="fade">
      <div v-if="seen && selectedCard" class="mt-8">
        <div class="card-content">
          <h2 class="text-3xl mb-4">{{ selectedCard.name }}</h2>

          <img :src="getImageUrl(selectedCard.image)" :alt="selectedCard.name" class="mx-auto w-64 mb-4"
            @error="handleImageError">

          <div class="text-lg mb-2 max-w-3xl mx-auto">
            <p class="mb-4">{{ selectedCard.description }}</p>
            <div class="text-left">
              <h3 class="font-bold mb-2">Upright Keywords:</h3>
              <p class="mb-4">{{ selectedCard.uprightKeywords }}</p>
              <h3 class="font-bold mb-2">Reversed Keywords:</h3>
              <p>{{ selectedCard.reversedKeywords }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCardsStore } from '../stores/cards'

const store = useCardsStore()
const seen = ref(false)
const selectedCard = ref(null)

// Get cards list from store using computed to maintain reactivity
const cards = computed(() => store.getCardList)

const handleImageError = (e) => {
  console.error('Image failed to load:', e)
  if (selectedCard.value) {
    console.log('Current card:', selectedCard.value)
    console.log('Image path:', selectedCard.value.image)
    console.log('Processed image URL:', getImageUrl(selectedCard.value.image))
  }
}

// Function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''

  // Simply prepend a forward slash to ensure path starts from public directory
  return `/${imagePath}`
}

const getCard = () => {
  seen.value = false

  setTimeout(() => {
    if (cards.value && cards.value.length > 0) {
      const randomIndex = Math.floor(Math.random() * cards.value.length)
      selectedCard.value = cards.value[randomIndex]
      console.log('Selected card:', selectedCard.value)
      seen.value = true
    } else {
      console.error('No cards available in store')
    }
  }, 100)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.card-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>