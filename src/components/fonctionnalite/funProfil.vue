<template>
  <div v-if="data==true" class="profile-data">
    <div class="section">
      <h2>Données Personnelles</h2>
      <div class="personal-info">
        <p><strong>Nom:</strong> {{ userData.nom }}</p>
        <p><strong>Âge:</strong> {{ userData.age }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
      </div>
    </div>
    
    <div class="section">
      <h2>Statistiques</h2>
      <div class="stats">
        <p><strong>Total des points:</strong> {{ stats.totalPoints }}</p>
        <p><strong>Nombre de quizz terminés:</strong> {{ stats.completedQuizzes }}</p>
      </div>
    </div>
    <div class="section">
      <h2>  les qcm crée </h2>
    </div>
  </div>
  <div v-else>
    <FunConnexion/>
  </div>
</template>


<script setup>
import FunConnexion from './FunConnexion.vue';
import { useDataStore } from '../../store/database.js';
const dataStore = useDataStore();

const data = dataStore.connexion;

const userData = {
  nom: "John Doe",
  age: 30,
  email: "john.doe@example.com"
};

const stats = {
  totalPoints: 1000,
  completedQuizzes: 5
};
</script>

<style scoped>
.profile-data {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #333;
}

.personal-info p {
  margin: 5px 0;
  font-size: 1.2rem;
}

.stats p {
  margin: 5px 0;
  font-size: 1.2rem;
}
</style>
