import { createStore } from "vuex";

import search from "./modules/search";

export default createStore({
  state: {
    payload: {},
  },
  mutations: {
    setPayload(state, payload) {
      state.payload = payload;
    },
  },
  actions: {
    setPayload({ commit }, payload) {
      commit("setPayload", payload);
    },
  },
  getters: {
    payload: (state) => state.payload,
  },
  modules: {
    search,
  },
});
