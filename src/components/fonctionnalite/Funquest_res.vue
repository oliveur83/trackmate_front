<template>

  <div class="res" v-if="affichage_result == false">
    score :{{ score }}
    <div class="qcm">
      <table class="qcm-table">
        <tbody>
          <tr v-for="(item, index) in liste_question_actuel" :key="index" class="qcm-item">
            <td class="couleur" v-if="item.num_question == numero_question">{{ item.libelle }}</td>
          </tr>
          <tr v-for="(item, index) in liste_reponse_actuel" :key="index" class="qcm-item">
            <td
              class="couleur"
              v-if="item.num_question == numero_question"
              :class="{
                selected: selectedResponseIndex == true && indexr == index,
                nonselect: selectedResponseIndex == false && indexr == index,
              }"
              @click="reponse_passagequestion(index, item.juste_faux)"
            >
              {{ item.libelle }}
              {{ item.juste_faux }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="res" v-if="affichage_result == true">
    <result :score="score" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import result from './FunResult.vue';

import axios from 'axios';

const liste_question = ref([]);
const numero_question = ref(11);
const liste_reponse = ref([]);
let liste_reponse_actuel = ref([]);
let liste_question_actuel = ref([]);
const selectedResponseIndex = ref(null);
const indexr = ref(null);
let click = ref(0);
let affichage_result = ref(false);
let score = 0;

onMounted(async () => {

  //  http://127.0.0.1:8000/select_question
  //http://localhost:3000/questions
  axios.get('http://localhost:3000/questions  ').then((response) => {
    // let data = JSON.parse(response.data);

    let data = response.data;
    if (Array.isArray(data)) {
      liste_question.value = data.map((obj) => {
        return {
          libelle: obj.libelle,
          num_question: obj.num_question,
        };
      });
      mise_a_jour_question()
    }
  });
  axios.get('http://localhost:3000/reponses').then((response) => {
    //let data = JSON.parse(response.data);
    let data = response.data;

    if (Array.isArray(data)) {
      liste_reponse.value = data.map((obj) => {
        return {
          libelle: obj.libelle,
          num_question: obj.nb_question,
          juste_faux: obj.juste_faux,
        };
      });
      mise_a_jour_reponse()
    }
  });
  
});
const mise_a_jour_question = () => {
  liste_question_actuel.value=liste_question.value.filter(question => question.num_question === numero_question.value);
}
const mise_a_jour_reponse = () => {
  liste_reponse_actuel.value=liste_reponse.value.filter(reponse => reponse.num_question === numero_question.value);console.log(liste_reponse_actuel)
}
const reponse_passagequestion = (index, juste_faux_res) => {

  click.value = click.value + 1;
  if (click.value == 2) {
    numero_question.value = numero_question.value + 1;
    click.value = 0;
    mise_a_jour_reponse()
    mise_a_jour_question()
  }
  indexr.value = index;
  selectedResponseIndex.value = juste_faux_res;
  if (selectedResponseIndex.value && click.value == 1) {
    score = score + 1;
  }

  if (numero_question.value == 20) {
    affichage_result.value = true;
  }
};
</script>

<style scoped>
.qcm {
  
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.qcm-table {
  border-spacing: 10px;
  background-color: #133d56;
  max-width: 400px;
  min-height: 200px;
  align-items: center;
}
.qcm-table td {
  margin: 100px;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: left;
}
.qcm-table tr {
  margin: 0px;

}


.couleur {
  background-color: white;
  border-radius: 10px;
}

.selected {
  background-color: #4caf50; /* Couleur de fond pour la réponse sélectionnée */
  color: white; /* Couleur du texte pour la réponse sélectionnée */
}
.res {
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.nonselect {
  background-color: #d70036; /* Couleur de fond pour la réponse sélectionnée */
  color: white; /* Couleur du texte pour la réponse sélectionnée */
}
</style>
