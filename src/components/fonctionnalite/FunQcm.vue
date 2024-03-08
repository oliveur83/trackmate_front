<template>
  <div class="qcm_all">
    <div v-if="question == false">
      <table class="qcm-table">
        <tbody>
          <tr
            v-for="(item, index) in liste_QCM"
            :key="index"
            class="qcm-item"
            @click="passe_question(index)"
          >
            <td class="couleur">{{ item.num_qcm }}</td>
            <td class="couleur">{{ item.libelle }}</td>
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
import { useDataStore } from '../../store/database.js';
const dataStore = useDataStore();
const themeid = dataStore.theme_save;

let question = ref(false);
const liste_QCM = ref([]);
let num_qcm = ref(0);
onMounted(async () => {
  axios
    .get(`http://localhost:3000/qcms-${themeid}`)
    .then((response) => {
      let data = response.data;
    
      if (Array.isArray(data)) {
        // Si les données sont sous forme de tableau
        liste_QCM.value = data;
      }
    })
});

const passe_question = (num_qcmm) => {
  question.value = true;
  num_qcm.value = num_qcmm;
  console.log("value",num_qcm.value)
  dataStore.setqcm(num_qcm.value)

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
