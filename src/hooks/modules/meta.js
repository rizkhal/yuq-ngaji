export default {
  state: {
    meta: {},
  },
  mutations: {
    setMeta(state, meta) {
      state.meta = meta;
    },
  },
  actions: {
    setMeta({ commit }, meta) {
      commit("setMeta", meta);
    },
  },
  getters: {
    meta(state) {
      return state.meta;
    },
  },
};
