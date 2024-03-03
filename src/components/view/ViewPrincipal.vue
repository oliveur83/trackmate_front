<template>
  <div class="main-container">
    <div class="barre_menu">
      <img src="../../assets/logo.png" alt="Description de l'image" @click="afficherProfill">
      <p>Track mates</p>
      <img src="../../assets/profil.png" alt="Description de l'image" @click="afficherProfil">
    </div>
   
    <carrebleu :valeurToto="toto" :gotomenu="backtomenu" />

  </div>
</template>

<script setup>
import carrebleu from './ViewBleu.vue'; // Importez le composant enfant correctement
import { ref } from 'vue';
import { useDataStore } from '../../store/database.js';
const dataStore = useDataStore();

const data = dataStore.connexion;

let toto = ref(false); 
let backtomenu = ref(''); 
const afficherProfil = () => {
  toto.value = !toto.value;
};
const afficherProfill = () => {
  if (backtomenu.value==''){backtomenu.value="toto";console.log("r",backtomenu.value)}
  else{backtomenu.value='';console.log("t",backtomenu.value)}

};

</script>

<style scoped>
.main-container {
  height: 100vh;
}

.barre_menu {
  display: flex;
  justify-content: space-between;
}

p {
  font-size: 30px;
  margin-top: 50px;
}
</style>
