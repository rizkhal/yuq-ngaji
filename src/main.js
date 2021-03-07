import { createApp } from "vue";

import "@/index.css";
import App from "@/App.vue";
import store from "@/stores/index";

const app = createApp(App);
app.use(store);
app.mount("#app");
