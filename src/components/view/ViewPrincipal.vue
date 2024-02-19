<template>
  <div class="main-container">
    <div class="barre_menu">
      <img src="../../assets/logo.png" alt="Description de l'image">
      <p>Track mates</p>
      <img src="../../assets/profil.png" alt="Description de l'image" @click="afficherProfil">
    </div>
   
    <carrebleu :valeurToto="toto" />

  </div>
</template>

<script setup>
import carrebleu from './ViewBleu.vue'; // Importez le composant enfant correctement
import { ref } from 'vue';

let toto = ref(false); 

const afficherProfil = () => {
  toto.value = !toto.value;
};
console.log(toto.value)
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
