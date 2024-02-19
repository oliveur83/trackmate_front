<template>
  <div>
    <form @submit.prevent="register">
      <h1>{{ title }}</h1>
      <label for="username">Pseudo:</label>
      <input type="text" id="username" v-model="username" required>

      <label for="password">Mot de passe:</label>
      <input type="password" id="password" v-model="password" required>

      <label for="confirmPassword">Confirmer le mot de passe:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required>

      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['buttonClicked']);
const title = "Inscription";
const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const register = () => {
  // Logique d'inscription (à implémenter selon vos besoins)
  console.log('Tentative d\'inscription avec :', username.value, password.value, confirmPassword.value);
  emit('buttonClicked', 'inscriptin');
  
};
</script>

<style scoped>
div {
  background-color: #C3D9FD;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
  margin-bottom: 16px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
