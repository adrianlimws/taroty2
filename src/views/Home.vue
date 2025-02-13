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
      {{ t('home.prompt') }}
    </p>

    <!-- Card button -->
    <button @click="getCard"
      class="bg-yellow-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg text-xl w-full max-w-xs mx-auto block mb-8">
      {{ t('home.pickButton') }}
    </button>

    <!-- Card display -->
    <Transition name="fade">
      <div v-if="seen && selectedCard" class="mt-8 px-4">
        <div class="card-content border-0.5 bg-white rounded-lg shadow-lg">
          <h2 class="text-2xl md:text-3xl mb-4">{{ selectedCard.name }}</h2>

          <img :src="getImageUrl(selectedCard.image)" :alt="selectedCard.name"
            class="mx-auto w-48 md:w-64 mb-4 rounded-lg" @error="handleImageError">

          <div class="text-base md:text-lg mb-2 max-w-3xl mx-auto">
            <p class="mb-4">{{ selectedCard.description }}</p>
            <div class="text-left px-4">
              <h3 class="font-bold mb-2">{{ t('home.uprightKeywords') }}</h3>
              <p class="mb-4">{{ selectedCard.uprightKeywords }}</p>
              <h3 class="font-bold mb-2">{{ t('home.reversedKeywords') }}</h3>
              <p>{{ selectedCard.reversedKeywords }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCardsStore } from '../stores/cards'
import { translations } from '../locales/translations'

const store = useCardsStore()
const seen = ref(false)
const selectedCard = ref(null)
const currentLang = ref(localStorage.getItem('currentLang') || 'en')

const cards = computed(() => store.getCardList)

// Translation function
const t = (key) => {
  const keys = key.split('.')
  let result = translations[currentLang.value]
  for (const k of keys) {
    result = result[k]
  }
  return result
}

const handleImageError = (e) => {
  console.error('Image failed to load:', e)
  if (selectedCard.value) {
    console.log('Current card:', selectedCard.value)
    console.log('Image path:', selectedCard.value.image)
    console.log('Processed image URL:', getImageUrl(selectedCard.value.image))
  }
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
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

// Add a watch effect to persist language changes
watch(currentLang, (newLang) => {
  localStorage.setItem('currentLang', newLang)
})
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