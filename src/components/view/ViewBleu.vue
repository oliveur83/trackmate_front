<template>
  <div>
    <div v-if="isprofil == true">
      <funProfil />
    </div>
    <div v-else-if="selectedComponent == 'ue'">
      <funue @buttonClicked="emitUe" />
    </div>
    <div v-else-if="selectedComponent == 'Carte'">
      <funcar :ue_choisie="ue_choisie" @buttonClicked="emit_qcm_study" />
    </div>
    <div v-else-if="selectedComponent == 'Connexion'">
      <funconnexion @buttonClicked="emitselectionue" />
    </div>
    <div v-else-if="selectedComponent == 'QCM'">
      <funqcm />
    </div>
    <div v-else-if="selectedComponent == 'study'">
      <funstudy />
    </div>
    <div v-else-if="selectedComponent == 'inscription'">
      <funins @buttonClicked="ecouteinscription" />
    </div>
    <div v-else>
      <div class="button-container">
        <button class="action-btn" @click="gotocompo('Connexion')">Connexion</button>
        <button class="action-btn" @click="gotocompo('inscription')">Inscription</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import funconnexion from '../fonctionnalite/FunConnexion.vue';
import funcar from '../fonctionnalite/FunCarte.vue';
import funins from '../fonctionnalite/FunInscription.vue';
import funue from '../fonctionnalite/FunUe.vue';
import funqcm from '../fonctionnalite/FunQcm.vue';
import funstudy from '../fonctionnalite/FunStudy.vue';
import { ref, defineProps, watch } from 'vue';
import { useDataStore } from '../../store/database.js';
import funProfil from '../fonctionnalite/funProfil.vue';

const dataStore = useDataStore();
let ue_choisie = ref('');
let selectedComponent = ref(dataStore.selection_compo);
const props = defineProps({
  isprofil: Boolean,
  gotomenu: String,
});

const emitselectionue = (pseudoe) => {
  if (pseudoe) {
    selectedComponent.value = 'ue';
    dataStore.connexion = true;
  } else {
    alert(' mauvais mot de passe ou pseudo');
  }
};
const ecouteinscription = () => {
  selectedComponent.value = '';
};
const emitUe = (ue) => {
  ue_choisie = ue;
  selectedComponent.value = 'Carte';
};
const emit_qcm_study = (ecout) => {
  selectedComponent.value = ecout;
};
const gotocompo = (gotoname) => {
  if (gotoname == 'Connexion') {
    if (dataStore.connexion) {
      selectedComponent.value = 'ue';
    } else {
      selectedComponent.value = 'Connexion';
    }
  } else {
    selectedComponent.value = 'inscription';
  }
};
watch(
  () => props.gotomenu,
  () => {
    selectedComponent.value = props.gotomenu;
  },
);
watch(
  () => dataStore.selection_compo,
  (newValue) => {
    selectedComponent.value = newValue;
  },
);
</script>

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
