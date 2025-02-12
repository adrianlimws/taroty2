<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script setup>

new Vue({
  el: '#app',
  data: {
    spreadCards: [],
    positions: [
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
    ],
    cards: [] // This will be populated from main.js
  },
  methods: {
    getSpread() {
      // Reset current spread
      this.spreadCards = [];

      // Get 12 unique random cards
      const shuffled = [...this.cards].sort(() => 0.5 - Math.random());
      this.spreadCards = shuffled.slice(0, 12);
    }
  },
  mounted() {
    // Get cards data from main.js
    this.cards = window.cards;
  }
});
</script>