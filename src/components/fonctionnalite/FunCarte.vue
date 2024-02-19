<template>
  <div>
    <p>{{ props.ue_choisie }}</p>
    <div class="carte_mental">
      <svg width="500" height="400">
        <line v-for="link in links" :key="link.id" :x1="link.start.x" :y1="link.start.y" :x2="link.end.x" :y2="link.end.y" stroke="black" />
        <g v-for="bubble in liste_question" :key="bubble.id" @click="lancement_menu('info')">
          <circle :cx="bubble.x" :cy="bubble.y" r="20" fill="blue" />
          <text :x="bubble.x" :y="bubble.y" text-anchor="middle" dy="0.3em" fill="white">{{ bubble.libelle }}</text>
        </g>
      </svg>
    </div>
    <div v-if="affichage_men_bar" class="menu_bar">
      <button class="action-btn" @click="login('QCM')">Quizz</button>
      <button class="action-btn" @click="login('study')">Study</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits,onMounted } from 'vue';
 
import axios from 'axios';
//import { useDataStore } from '../../store/database.js';
//const dataStore = useDataStore();

//const data = dataStore.data;

const liste_question = ref([]);
onMounted(async () => {

axios.get('http://127.0.0.1:8000/select_ue')
  .then(response => {
    let data = JSON.parse(response.data);

      if (Array.isArray(data))  {
        liste_question.value = data.map(obj => {
          return {
            libelle: obj.libelle,
            x: obj.x,
            y: obj.y 
            // Ajoutez d'autres champs au besoin
          };
        });

      }
 })
});

const links = [
  { id: 1, start: { x: 100, y: 50 }, end: { x: 200, y: 100 } },
  { id: 2, start: { x: 200, y: 100 }, end: { x: 300, y: 50 } },
  { id: 3, start: { x: 200, y: 100 }, end: { x: 100, y: 150 } },
  { id: 4, start: { x: 200, y: 100 }, end: { x: 300, y: 150 } },
  { id: 5, start: { x: 300, y: 150 }, end: { x: 350, y: 250 } },
  { id: 5, start: { x: 300, y: 150 }, end: { x: 300, y: 250 } }
];



const emit = defineEmits(['buttonClicked']);
let affichage_men_bar = ref(false);
const props = defineProps(['ue_choisie']);

const lancement_menu = (bulle) => {
  affichage_men_bar.value = !affichage_men_bar.value;
console.log(bulle)
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
    background-color: #133D56;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    bottom: 0;
  }

  .action-btn2 {
    background-color: #4CAF50;
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
    background-color: #4CAF50;
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
