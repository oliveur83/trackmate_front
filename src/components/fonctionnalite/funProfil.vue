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
  <div class="qcm-container">
    <table class="qcm-table">
      <thead>
        <tr>
          <th>Note</th>
          <th>Libellé</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in liste_QCM" :key="index" class="qcm-item" @click="passe_question(index)">
          <td class="note">{{ item.note_qcm }}</td>
          <td class="libelle">{{ item.libelle }}</td>
        </tr>
      </tbody>
    </table>
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
import { ref, onMounted } from 'vue';
import FunConnexion from './FunConnexion.vue';
import { useDataStore } from '../../store/database.js';
import axios from 'axios';
const dataStore = useDataStore();
const data = dataStore.connexion;

const liste_QCM = ref([]);

onMounted(async () => {
  axios
    .get(`http://localhost:3000/select_note`)
    .then((response) => {
      let data = response.data;
    
      if (Array.isArray(data)) {
        // Si les données sont sous forme de tableau
        liste_QCM.value = data;
      }
    })
});
const userData = {
  nom: "John Doe",
  age: 30,
  email: "john.doe@example.com"
};
</script>

<style scoped>
.profile-data {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Pour aligner les éléments horizontalement */
  justify-content: center; 
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
}.section {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.section h2 {
  margin-top: 0;
}

.qcm-container {
  overflow-x: auto;
}

.qcm-table {
  width: 100%;
  border-collapse: collapse;
}

.qcm-table th,
.qcm-table td {
  padding: 8px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

.qcm-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.qcm-table tbody tr:hover {
  background-color: #f5f5f5;
}

.qcm-table .note {
  font-weight: bold;
}

.qcm-table .libelle {
  max-width: 300px; /* Ajustez la largeur maximale selon votre besoin */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
