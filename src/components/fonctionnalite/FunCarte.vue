<template>
  <div>
    <p>{{ props.ue_choisie }}</p>
    <div class="carte_mental">
      <svg width="500" height="400">
        <line
          v-for="link in links"
          :key="link.id"
          :x1="link.start.x"
          :y1="link.start.y"
          :x2="link.end.x"
          :y2="link.end.y"
          stroke="black"
        />
        <g v-for="bubble in liste_question" :key="bubble.id" @click="lancement_menu(bubble.id_ue)">
          <circle :cx="bubble.x" :cy="bubble.y" r="20" fill="blue" />
          <text :x="bubble.x" :y="bubble.y" text-anchor="middle" dy="0.3em" fill="white">
            {{ bubble.libelle }}
          </text>
        </g>
      </svg>
    </div>
    <div v-if="affichage_menu_bar" class="menu_bar">
      <button class="action-btn" @click="login('QCM')">Quizz</button>
      <button class="action-btn" @click="login('study')">Study</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, onMounted } from 'vue';
import axios from 'axios';
import { useDataStore } from '../../store/database.js';

const dataStore = useDataStore();
const liste_question = ref([]);
const liste_id_ue_dep_arv = ref([]);
const links = ref([]);

onMounted(async () => {
  const themeid = dataStore.ue_save;
  axios
    .get(`http://127.0.0.1:8000/select_uee/${themeid}`)
    .then((response) => {
      let data = response.data;
      console.log('select ue par theme ', data);
      if (Array.isArray(data)) {
        liste_question.value = data.map((obj) => {
          return {
            libelle: obj.libelle,
            x: obj.x,
            y: obj.y,
            id_ue: obj.id_ue,
          };
        });
        console.log(liste_question);
      }

      axios
        .get('http://localhost:3000/trait_ue')
        .then((response) => {
          let data = response.data;
          console.log('select_trait par theme ', data);
          if (Array.isArray(data)) {
            liste_id_ue_dep_arv.value = data.map((obj) => {
              return {
                id_dep: obj.id_ue_avant,
                id_arv: obj.id_ue_apres,
              };
            });

            realisation_trait();
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la deuxième requête axios :', error);
        });
    })
    .catch((error) => {
      console.error('Erreur lors de la première requête axios :', error);
    });
});
const realisation_trait = () => {
  for (var i = 0; i < liste_id_ue_dep_arv.value.length; i++) {
    const id_ue_dep = liste_id_ue_dep_arv.value[i].id_dep;
    const id_ue_apres = liste_id_ue_dep_arv.value[i].id_arv;
    let elementdep = liste_question.value.find((obj) => obj.id_ue === id_ue_dep);
    let elementap = liste_question.value.find((obj) => obj.id_ue === id_ue_apres);
    links.value.push({
      id: i,
      start: { x: elementdep.x, y: elementdep.y },
      end: { x: elementap.x, y: elementap.y },
    });
  }
};

const emit = defineEmits(['buttonClicked']);
let affichage_menu_bar = ref(false);
const props = defineProps(['ue_choisie']);

const lancement_menu = (bulle) => {
  affichage_menu_bar.value = !affichage_menu_bar.value;
  dataStore.settheme(bulle);
};

const login = (ue_selection) => {
  emit('buttonClicked', ue_selection);
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}

.menu_bar {
  background-color: #133d56;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  bottom: 0;
}

.action-btn2 {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.action-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  width: 20%;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #45a049;
}
</style>
