<script setup>
import EnfantComponent from '../fonctionnalite/FunConnexion.vue';
import funcar from '../fonctionnalite/FunCarte.vue';
import funins from '../fonctionnalite/FunInscription.vue';
import funue from '../fonctionnalite/FunUe.vue';
import funqcm from '../fonctionnalite/FunQcm.vue';
import funstudy from '../fonctionnalite/FunStudy.vue';
import { ref,defineProps,watch } from 'vue';
import { useDataStore } from '../../store/database.js';
import funProfil from '../fonctionnalite/funProfil.vue';

const dataStore = useDataStore();
let vrai_ue = ref('');
let selectedComponent = ref('');
const props = defineProps({
  valeurToto: Boolean,
  gotomenu: String
});


const handleButtonClicked = (pseudoe) => {
  if (pseudoe) {
    selectedComponent.value = 'ue';
    dataStore.connexion=true
  } else {
    alert(' mauvais mot de passe ou pseudo');
  }
};
const ecouteins = (buttonName) => {

  console.log('Bouton', buttonName, 'cliqué');
 selectedComponent.value = '';
};
const ecoute_ue = ( ue) => {
  vrai_ue = ue;
  selectedComponent.value = 'Carte';
};
const ecoute_qcm_study = (ecout) => {
  selectedComponent.value = ecout;
};
const gotocompo = (gotoname) => {
  if (gotoname == 'Connexion') {
    console.log("titi",selectedComponent)
    if (dataStore.connexion){
      selectedComponent.value='ue'
    }
    else{
      console.log("titi 2",selectedComponent)
      selectedComponent.value = 'Connexion';
      console.log("titi 3",selectedComponent)
    }
  } else {
    selectedComponent.value = 'inscription';
  }
};
watch(() => props.gotomenu, () => {
  selectedComponent.value=props.gotomenu
});
</script>
<template>
  <div>
    
    <div v-if="valeurToto == true">
      <funProfil/>
    </div> 
    <div v-else-if="selectedComponent == 'ue'">
      <funue @buttonClicked="ecoute_ue" />
    </div>
    <div v-else-if="selectedComponent == 'Carte'">
      <funcar :ue_choisie="vrai_ue" @buttonClicked="ecoute_qcm_study" />
    </div>
    <div v-else-if="selectedComponent == 'Connexion'">
      <EnfantComponent @buttonClicked="handleButtonClicked" />
    </div>
    <div v-else-if="selectedComponent == 'QCM'">
      <funqcm />
    </div>
    <div v-else-if="selectedComponent == 'study'">
      <funstudy />
    </div>
    <div v-else-if="selectedComponent == 'inscription'">
      <funins @buttonClicked="ecouteins" />
    </div>
    <div v-else>
      <div class="button-container">
        <button class="action-btn" @click="gotocompo('Connexion')">Connexion</button>
        <button class="action-btn" @click="gotocompo('inscription')">Inscription</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  background-color: #c3d9fd;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.action-btn {
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
.action-btn:hover {
  background-color: #45a049;
}
</style>
