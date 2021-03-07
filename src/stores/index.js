import { createStore } from "vuex";

import search from "./modules/search";

export default createStore({
  state: {
    surah: {},
    payload: {},
    numberOfSurah: 0,
  },
  mutations: {
    setSurah(state, surah) {
      state.surah = surah;
    },
    setPayload(state, payload) {
      state.payload = payload;
    },
    setNumberOfSurah(state, numberOfSurah) {
      state.numberOfSurah = numberOfSurah;
    },
  },
  actions: {
    setSurah({ commit }, surah) {
      commit("setSurah", surah);
    },
    setPayload({ commit }, payload) {
      commit("setPayload", payload);
    },
    setNumberOfSurah({ commit }, numberOfSurah) {
      commit("setNumberOfSurah", numberOfSurah);
    },
  },
  getters: {
    surah: (state) => state.surah,
    payload: (state) => state.payload,
    numberOfSurah: (state) => state.numberOfSurah,
  },
  modules: {
    search,
  },
});
