// src/store/dataStore.js
import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: [],
    connexion :Boolean
  }),
  actions: {
    setData(newData) {
      this.data = newData;
    },
    setco(newData) {
      this.connexion = newData;
    },
  },
});
