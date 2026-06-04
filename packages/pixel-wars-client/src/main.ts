import { createApp } from "vue";
import "./ui/index.css";
import App from "./ui/App.vue";
import { initGame } from "./game/main.ts";

initGame();

createApp(App).mount("#app");
