const state = {
  query: null,
};

const actions = {
  async search({ commit }, query) {
    commit("SET_QUERY", query);
  },
};

const mutations = {
  SET_QUERY(state, query) {
    state.query = query;
  },
};

const getters = {
  query: (state) => state.query,
};

export default { state, getters, actions, mutations };
