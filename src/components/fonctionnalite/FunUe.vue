<!-- MonPremierComposant.vue -->
<template>
  <div>
    <div class="container">
      <div class="case">Recommandation</div>
      <div class="case">
        UE choisies
        <ul class="no-bullet">
          <li v-for="ue in liste_ue_user" :key="ue" @click="ue_sel(ue)">{{ ue }}</li>
        </ul>
      </div>
      <div class="case">
        Tous les ue disponibles
        <ul class="no-bullet">
          <li
            v-for="ue in liste_ue_json"
            :key="ue.libelle"
            @click="ue_select(ue.libelle, ue.id_theme)"
          >
            {{ ue.libelle }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
import axios from 'axios';
import { useDataStore } from '../../store/database.js';

const dataStore = useDataStore();
const liste_ue_json = ref([]);
const liste_ue_user = ref([]);
const liste_ue_user_save = ref([]);
const emit = defineEmits(['buttonClicked']);
let long_liste_ue_user = 0;

const ue_sel = (ue_selection) => {
  // const theme = liste_ue_json.value.find(theme => theme.libelle === ue_selection);
  dataStore.setue(1);
  ajout_theme();
  emit('buttonClicked', 'Carte', ue_selection);
};
const ajout_theme = () => {
  if (long_liste_ue_user !== liste_ue_user.value.length) {
    liste_ue_user.value.forEach((objet) => {
      if (!liste_ue_user_save.value.some((savedObj) => savedObj.libelle === objet)) {
        const idTheme = liste_ue_json.value.find((item) => item.libelle === objet)?.id_theme;

        if (idTheme) {
          axios
            .post('http://127.0.0.1:8000/ajoutueutil', { id_theme: idTheme, id_utilisateur: 1 })
            .then((response) => {
              console.log(response.data);
            });
        } else {
          console.error(`ID de thème non trouvé pour le libellé "${objet.libelle}"`);
        }
      }
    });
  }
};

const ue_select = (ue_libelle) => {
  if (!liste_ue_user.value.includes(ue_libelle)) {
    liste_ue_user.value.push(ue_libelle);
  }
};

axios.get('http://127.0.0.1:8000/select_theme').then((response) => {
  let data = JSON.parse(response.data);
  console.log('select_theme', data);
  if (Array.isArray(data)) {
    data.forEach((obj) => {
      liste_ue_json.value.push({ libelle: obj.libelle, id_theme: obj.id_theme });
    });
  } else {
    console.error("La réponse n'est pas un tableau valide.");
  }
});

axios.get(`http://127.0.0.1:8000/themeutil/${dataStore.id_util}`).then((response) => {
  let data = response.data;
  console.log('select_theme de utilisateur', data);
  if (Array.isArray(data)) {
    data.forEach((obj) => {
      liste_ue_user.value.push(obj.Theme);
      liste_ue_user_save.value.push(obj.Theme);
    });
  } else {
    console.error("La réponse n'est pas un tableau valide.");
  }
  long_liste_ue_user = liste_ue_user.value.length;
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1%;
  width: 50%;
  align-items: center;
}
.case {
  background-color: white;
  height: 33%;
  width: 100%;
  font-size: 50px;
}
.no-bullet {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
