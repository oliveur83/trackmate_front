<template>
  <div v-if="data == true" class="profile-data">
    <div class="section">
      <h2>Données Personnelles</h2>
      <div class="personal-info">
        <p><strong>Nom:</strong> {{ userData.nom }}</p>
      </div>
    </div>

    <div class="section">
      <h2>Statistiques</h2>
      <div class="qcm-container">
        <table class="qcm-table">
          <thead>
            <tr>
              <th>QCM</th>
              <th>Moyenne</th>
              <th>Essais</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(qcm, index) in qcmStats" :key="index">
              <td>{{ qcm.libelle }}</td>
              <td>{{ qcm.moyenne }}</td>
              <td>{{ qcm.essais }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <h2>Les QCM créés</h2>
    </div>
  </div>
  <div v-else>
    <FunConnexion />
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
  axios.get(`http://localhost:3000/select_note`).then((response) => {
    let data = response.data;

    if (Array.isArray(data)) {
      liste_QCM.value = data;
      calculerStats();
    }
  });
});

const userData = {
  nom: dataStore.pseudo,
};

const qcmStats = ref([]);

onMounted(() => {});
function calculerStats() {
  const stats = {};
  console.log(liste_QCM.value);
  for (const qcm of liste_QCM.value) {
    console.log('la');
    if (!stats[qcm.libelle]) {
      console.log('ici');
      stats[qcm.libelle] = {
        libelle: qcm.libelle,
        totalNote: 0,
        essais: 0,
      };
    }

    stats[qcm.libelle].totalNote += qcm.note_qcm;
    stats[qcm.libelle].essais++;
  }
  console.log('laolalal');
  qcmStats.value = Object.values(stats).map((qcm) => ({
    ...qcm,
    moyenne: qcm.totalNote / qcm.essais,
  }));
}
</script>

<style scoped>
.profile-data {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
.section {
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
