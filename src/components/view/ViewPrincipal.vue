<template>
  <div class="main-container">
    <div class="barre_menu">
      <img src="../../assets/logo.png" alt="Description de l'image" @click="retourmenu" />
      <p>Track mates</p>
      <img src="../../assets/profil.png" alt="Description de l'image" @click="afficherProfil" />
    </div>

    <ViewBleu :isprofil="isprofil" :gotomenu="backtomenu" />
  </div>
</template>

<script setup>
import ViewBleu from './ViewBleu.vue'; // Importez le composant enfant correctement
import { ref } from 'vue';

let isprofil = ref(false);
let backtomenu = ref('');
const afficherProfil = () => {
  isprofil.value = !isprofil.value;
};
const retourmenu = () => {
  if (backtomenu.value == '') {
    backtomenu.value = 'toto';
  } else {
    backtomenu.value = '';
  }
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
