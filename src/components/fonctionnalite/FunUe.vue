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

const liste_ue_json = ref([]);
const liste_ue_user = ref([]);
const liste_ue_user_save = ref([]);
const emit = defineEmits(['buttonClicked']);
let long_liste_ue_user = 0;

const ue_sel = (ue_selection) => {
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

const ue_select = (ue_libelle, ue_id) => {
  if (!liste_ue_user.value.includes(ue_libelle)) {
    liste_ue_user.value.push(ue_libelle);
  }
  console.log(ue_id);
};
//http://127.0.0.1:8000/select_theme
//http://localhost:3000/theme
axios
  .get('http://localhost:3000/theme')
  .then((response) => {
    //let data = JSON.parse(response.data);
    let data = response.data;
    if (Array.isArray(data)) {
      data.forEach((obj) => {
        liste_ue_json.value.push({ libelle: obj.libelle, id_theme: obj.id_theme });
      });
    } else {
      console.error("La réponse n'est pas un tableau valide.");
    }
  })
  .catch((error) => {
    // Gérez les erreurs ici
    console.error('Erreur lors de la récupération des données :', error);
  });
axios
  .get('http://localhost:3000/util_theme')
  .then((response) => {
    let data = response.data;
    if (Array.isArray(data)) {
      console.log(data);
      data.forEach((obj) => {
        console.log(obj);
        liste_ue_user.value.push(obj.Theme);
        liste_ue_user_save.value.push(obj.Theme);
      });
    } else {
      console.error("La réponse n'est pas un tableau valide.");
    }
    long_liste_ue_user = liste_ue_user.value.length;
  })
  .catch((error) => {
    // Gérez les erreurs ici
    console.error('Erreur lors de la récupération des données :', error);
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
