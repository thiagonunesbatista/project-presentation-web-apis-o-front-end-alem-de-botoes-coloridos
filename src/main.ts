// src/main.js
import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles"; // Import global styles
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "./style.css";

const vuetify = createVuetify({
  components,
  directives
});

const app = createApp(App);
app.use(vuetify);
app.mount("#app");
