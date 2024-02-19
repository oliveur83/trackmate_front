<template>
  <div class="didi">
    <!-- Afficher l'écran gris de fond si loading est vrai -->
    <div v-if="loading" class="overlay"></div>

    <!-- Afficher le loader si loading est vrai -->
    <div v-if="loading" class="loader"></div>
    
    <!-- Afficher le formulaire si loading est faux -->
    <form v-if="!loading" @submit.prevent="login">
      <h1>{{ title }}</h1>
      <input type="text" placeholder="username" id="username" v-model="username" required>
      <input type="password" placeholder="password" id="password" v-model="password" required>
  
      <button type="submit">Se connecter</button>
      <h1>mot de passe oublier </h1>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const emit = defineEmits(['buttonClicked']);
const title = 'Connexion';
const username = ref('');
const password = ref('');
const loading = ref(false); // État pour le chargement

const login = () => {
  // Définir loading à true avant la requête
  loading.value = true;

  // Effectuer la requête axios
  axios.get('http://127.0.0.1:8000/select_util')
    .then(response => {
      // Traiter la réponse ici
      let obj = JSON.parse(response.data);
      // Vérifier si un objet avec un "pseudo" égal à "tom" existe
      let pseudoe = obj.some(function(item) {
        return item.pseudo === username.value;
      });
      emit('buttonClicked', pseudoe);
    })
    .catch(error => {
      // Gérer les erreurs ici
      console.error('Erreur lors de la récupération des données :', error);
    })
    .finally(() => {
      // Définir loading à false une fois la requête terminée
      loading.value = false;
    });
};
</script>

<style scoped>
.didi {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  color:white;
  position: relative; /* Ajout pour positionner l'overlay par rapport à ce conteneur */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fond semi-transparent */
}

form {
  display: flex;
  flex-direction: column;
  background-color: #133D56;
  width: 400px;
  margin: 0 auto;
  align-items: center;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
  margin-bottom: 16px;
  margin-left: 30px;
  margin-right: 30px;
}

button {
  padding: 10px;
  background-color: #133D56;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #133D56;
}

.loader {
  /* Styles pour le loader */
}
</style>
