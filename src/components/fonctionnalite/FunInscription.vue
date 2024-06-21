<template>
  <div>
    <form @submit.prevent="register">
      <h1>{{ title }}</h1>
      <label for="username">Pseudo:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Mot de passe:</label>
      <input type="password" id="password" v-model="password" required />

      <label for="confirmPassword">Confirmer le mot de passe:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required />

      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const emit = defineEmits(['buttonClicked']);
const title = 'Inscription';
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const url = 'http://localhost:3000/utilisateur';

const register = () => {
  if (username.value.trim() === '' || password.value !== confirmPassword.value) {
    console.error("Nom d'utilisateur vide ou les mots de passe ne correspondent pas");
    return;
  }

  const newUser = { pseudo: username.value, password: password.value }; // Utilisation des valeurs actuelles des références

  axios
    .post(url, newUser)
    .then((response) => {
      console.log('Utilisateur ajouté avec succès:', response.data);
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    });
  emit('buttonClicked', 'inscription');
};
</script>

<style scoped>
div {
  background-color: #c3d9fd;
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
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
