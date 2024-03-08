// src/store/dataStore.js
import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
  state: () => ({

    connexion :false,
    pseudo: String,
    ue_save: String,
    theme_save:String,
    qcm_save:String,
    selection_compo:''
  }),
  actions: {
    setpseudo(newData) {
      this.pseudo = newData;
    },
    setco(newData) {
      this.connexion = newData;
    },
    setue(newData) {
      this.ue_save = newData;
    },
    settheme(newData) {
      this.theme_save = newData;
    },
    setqcm(newData) {
      this.qcm_save = newData;
    },
    setselection_compo(newData) {
      this.selection_compo = newData;
    },
  },
});
