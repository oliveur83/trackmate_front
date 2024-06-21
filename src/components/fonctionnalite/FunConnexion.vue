<template>
  <div class="didi">
    <div v-if="loading" class="overlay"></div>
    <div v-if="loading" class="loader"></div>
    <form v-if="!loading" @submit.prevent="login">
      <h1>{{ title }}</h1>
      <input type="text" placeholder="username" id="username" v-model="username" required />
      <input type="password" placeholder="password" id="password" v-model="password" required />

      <button type="submit">Se connecfter</button>
      <h1 @click="mdp_o">mot de passe oublier</h1>
      <div v-if="mdp_oublie == true">
        <h1>entrez un mot nouveau mot de passe</h1>
        <input type="text" placeholder="new_mdp" id="new_mdp" v-model="username" required />
        <h1>confirmation du mots de passe</h1>
        <input type="password" placeholder="conf_mdp" id="conf_mdp" v-model="password" required />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import { useDataStore } from '../../store/database.js';

const dataStore = useDataStore();
const emit = defineEmits(['buttonClicked']);
const title = 'Connexion';
const username = ref('');
const password = ref('');
const loading = ref(false);
const mdp_oublie = ref(false);

const mdp_o = () => {
  mdp_oublie.value = true;
};

const login = () => {
  loading.value = true;
  console.log('requete');
  axios
    .get('http://127.0.0.1:8000/select_util')
    .then((response) => {
      const utilisateurs = JSON.parse(response.data);
      console.log('Utilisateurs récupérés :', utilisateurs);

      // Vérification si l'utilisateur existe dans la liste
      let pseudoe = false;
      for (let i = 0; i < utilisateurs.length; i++) {
        console.log(utilisateurs[i]);
        if (utilisateurs[i].pseudo === username.value) {
          pseudoe = true;
          break; // Sortir de la boucle dès qu'on trouve l'utilisateur
        }
      }

      // Enregistrement des données dans le data store
      if (pseudoe) {
        dataStore.setpseudo(username.value);
        // Vous devez déterminer comment obtenir l'ID correctement depuis vos données utilisateur
        const utilisateurTrouve = utilisateurs.find((u) => u.pseudo === username.value);
        if (utilisateurTrouve) {
          dataStore.setid_util(utilisateurTrouve.id);
        }
      }

      // Émission de l'événement 'buttonClicked' avec le résultat de la vérification
      emit('buttonClicked', pseudoe);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      // Gestion des erreurs, par exemple afficher un message à l'utilisateur
    })
    .finally(() => {
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
  color: white;
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
  background-color: #133d56;
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
  background-color: #133d56;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #133d56;
}
</style>
