// src/store/dataStore.js
import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: [],
    connexion :false,
    ue_save: String,
    theme_save:String,
    qcm_save:String
  }),
  actions: {
    setData(newData) {
      this.data = newData;
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
  },
});
