<script setup>
import EnfantComponent from '../fonctionnalite/FunConnexion.vue';
import funcar from '../fonctionnalite/FunCarte.vue';
import funins from '../fonctionnalite/FunInscription.vue';
import funue from '../fonctionnalite/FunUe.vue';
import funqcm from '../fonctionnalite/FunQcm.vue';
import funstudy from '../fonctionnalite/FunStudy.vue';
import { ref,defineProps } from 'vue';
import { useDataStore } from '../../store/database.js';
import funProfil from '../fonctionnalite/funProfil.vue';

const dataStore = useDataStore();
dataStore.setData([1, 2, 3, 4, 5]);
let vrai_ue = ref('');
let selectedComponent = ref('');
const props = defineProps({
  valeurToto: Boolean
});
console.log("titi",props.valeurToto)
const handleButtonClicked = (pseudoe) => {
  if (pseudoe) {
    selectedComponent.value = 'ue';
  } else {
    alert(' mauvais mot de passe ou pseudo');
  }
};
const ecouteins = (buttonName) => {
  // Réagir en fonction du bouton cliqué
  console.log('Bouton', buttonName, 'cliqué');

  // Mettre à jour le composant sélectionné en fonction du bouton cliqué
  selectedComponent.value = '';
};
const ecoute_ue = (buttonName, ue) => {
  // Réagir en fonction du bouton cliqué

  vrai_ue = ue;
  // Mettre à jour le composant sélectionné en fonction du bouton cliqué
  selectedComponent.value = 'Carte';
};
const ecoute_qcm_study = (ecout) => {
  selectedComponent.value = ecout;
};
const gotocompo = (gotoname) => {
  if (gotoname == 'Connexion') {
    selectedComponent.value = 'Connexion';
  } else {
    selectedComponent.value = 'inscription';
  }
};

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
