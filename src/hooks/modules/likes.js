import { likesCollection } from "@/services/firebase";

export default {
  state: {
    likes: {},
  },
  mutations: {
    async setLikes(state, likes) {
      return await likesCollection.add({
        user: 1,
        ayah: likes.ayah,
        surah: likes.surah,
      });
    },
  },
  actions: {
    setLikes({ commit }, likes) {
      commit("setLikes", likes);
    },
  },
  getters: {
    likes: (state) => state.likes,
  },
};
