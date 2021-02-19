import { createStore } from "vuex";

import meta from "./modules/meta";
import search from "./modules/search";

export default createStore({
  modules: {
    meta,
    search,
  },
});
