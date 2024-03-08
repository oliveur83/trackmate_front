<template>
   <div class="semi-circle" :style="{ backgroundColor: getBackgroundColor(props.score) }">
    <div class="content">{{ props.score * 10 }}%</div>
  </div>
  <div class="star-container">
    <div v-for="index in props.score" :key="index" class="star">⭐</div>
  </div>
  <h2>Bravo</h2><br />
  <button>Relire les questions</button>
  <div class="menu_bar">
    <button class="action-btn" @click="login('Carte')">Quizz</button>
    <button class="action-btn" @click="login('study')">Study</button>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useDataStore } from '../../store/database.js';
const dataStore = useDataStore();

const props = defineProps({
  score: Boolean
});


const login = (ue_selection) => {

  dataStore.setselection_compo(ue_selection)
  console.log(dataStore.selection_compo)
};
const getBackgroundColor = (score) => {
 const hue = (score / 10) * 120; 
  return `hsl(${hue}, 100%, 50%)` ;
};
</script>
<style>
.star {
  font-size: 2rem; 
  margin-right: 5px;
  display: flex; 
}
.semi-circle {
  width: 20rem;
  height: 10rem;
  background-color: #ffffff;
  border-radius: 10rem 10rem 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
.content {
  margin-bottom: 1rem; 
}
.star-container {
  display: flex;
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
.red-text {
  color: red;
}

.green-text {
  color: green;
}
</style>
