<template>
  <div class="app-container">
    <div class="greeting-container">
      <h1>Привет, {{ username }}!</h1>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const username = ref('Пользователь');
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100%;
}

.greeting-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  font-size: 2rem;
}
</style>