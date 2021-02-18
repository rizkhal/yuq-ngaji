export default {
  state: {
    keyword: null,
  },
  mutations: {
    search(state, keyword) {
      state.keyword = keyword;
    },
  },
  actions: {
    search({ commit }, keyword) {
      commit("search", keyword);
    },
  },
  getters: {
    keyword(state) {
      return state.keyword;
    },
  },
};
