<template>
<div class="res" v-if="affichage_result == false">

  <div class="qcm">
    <table class="qcm-table">
      <tbody>
        <tr v-for="(item, index) in liste_question" :key="index" class="qcm-item">
          <td class="couleur" v-if="item.num_question ==numero_question ">{{ item.libelle }}</td>
        </tr>
        <tr v-for="(item, index) in liste_reponse" :key="index" class="qcm-item">
        
          <td
            class="couleur"

            v-if="item.num_question == numero_question"
            :class="{ 'selected':selectedResponseIndex== true && indexr==index,
             'nonselect': selectedResponseIndex ==false && indexr==index}"           
              @click="reponse_passagequestion(index, item.juste_faux)"
          >
            {{ item.libelle }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div >
<div class="res" v-if="affichage_result == true">

<result/>

</div >
</template>

<script setup>
import { ref, onMounted } from 'vue';
import result from './FunResult.vue'

import axios from 'axios';

const liste_question = ref([]);
const numero_question = ref(11);
const liste_reponse= ref([]);
const selectedResponseIndex = ref(null);
const indexr=ref(null)
let click=ref(0)
let affichage_result=ref(false)
onMounted(async () => {
  axios.get('http://127.0.0.1:8000/select_question')
  .then(response => {
    let data = JSON.parse(response.data);
      console.log(data);
      if (Array.isArray(data))  {
        liste_question.value = data.map(obj => {
          return {
            libelle: obj.libelle,
            num_question: obj.num_question
            // Ajoutez d'autres champs au besoin
          };
        });
        console.log("ti,ti",liste_question);
      }
 })
 axios.get('http://127.0.0.1:8000/select_reponse')
  .then(response => {
    let data = JSON.parse(response.data);
      console.log(data);
      if (Array.isArray(data))  {
        liste_reponse.value = data.map(obj => {
          return {
            libelle: obj.libelle,
            num_question: obj.nb_question
            // Ajoutez d'autres champs au besoin
          };
        });
        console.log("ttt",liste_reponse)
      } 
 })
  
});

const reponse_passagequestion = (index ,juste_faux_res) => {

  // Ajoutez ici la logique pour traiter la réponse de l'utilisateur
  // Vous pouvez également mettre à jour currentQuestion pour passer à la question suivante
  click.value=click.value+1
  if (click.value==2)
  {
    numero_question.value=numero_question.value+1
    click.value=0
    console.log("num question",numero_question.value)
  }
  // Mettez à jour l'index de la réponse sélectionnée
  indexr.value=index
  selectedResponseIndex.value = juste_faux_res;
  if (numero_question.value==15)
  {
affichage_result.value=true
  }
};
</script>

<style scoped>
.qcm {
 
  margin: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content:center;
}

.qcm-table {
  border-spacing: 10px;
  background-color: #133D56;
  min-width: 200px;
  min-height: 200px;
  align-items: center;
}

.qcm-table th, .qcm-table td {
  margin: 100px;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: left;
}

.couleur {
  background-color: white;
  border-radius: 10px;
}

.selected {
  background-color: #4CAF50; /* Couleur de fond pour la réponse sélectionnée */
  color: white; /* Couleur du texte pour la réponse sélectionnée */
}
.res{
  width:100%;
  align-items: center;
  text-align: center;
  justify-content:center;
display: flex;
flex-direction: column;
}
.nonselect {
  background-color: #d70036; /* Couleur de fond pour la réponse sélectionnée */
  color: white; /* Couleur du texte pour la réponse sélectionnée */
}
</style>
