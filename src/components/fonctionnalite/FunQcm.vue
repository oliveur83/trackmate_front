<template>
  <div class="qcm_all">
    <div v-if="question == false">
      <table class="qcm-table">
        <tbody>
          <tr
            v-for="(item, index) in liste_QCM"
            :key="index"
            class="qcm-item"
            @click="passe_question(item.num_qcm)"
          >
            <td class="couleur">{{ item.num_qcm }}</td>
            <td class="couleur">{{ item }}</td>
            <td class="couleur">{{ item.nb_jaime }}⭐</td>
            <td class="couleur">{{ item.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="result" v-if="question == true">
      <funqest_res />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import funqest_res from '../fonctionnalite/Funquest_res.vue';

import axios from 'axios';

let question = ref(false);
const liste_QCM = ref([]);
let num_qcm = ref(0);
onMounted(async () => {
  //http://127.0.0.1:8000/select_QCM
  //http://localhost:3000/qcms
  axios
    .get('http://localhost:3000/qcms')
    .then((response) => {
      //let data = JSON.parse(response.data);
      let data = response.data;
    
      if (Array.isArray(data)) {
        data.forEach((obj) => {
          liste_QCM.value.push(obj.libelle);
        });
     
      }
    })
    .catch((error) => {
      // Gérez les erreurs ici
      console.error('Erreur lors de la récupération des données :', error);
    });
});
const passe_question = (num_qcmm) => {
  question.value = true;
  num_qcm.value = num_qcmm;
};
</script>

<style scoped>
.qcm_all {
  margin: 20px;
  width: 100%;
}
.result {
  display: flex;
  align-items: center;
  width: 100%;
}
.qcm-table {
  width: 50%;
  border-spacing: 10px;
  background-color: #133d56;
}

.qcm-table th,
.qcm-table td {
  margin: 100px;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: left;
}

.couleur {
  background-color: white;
  border-radius: 10px;
}
</style>
