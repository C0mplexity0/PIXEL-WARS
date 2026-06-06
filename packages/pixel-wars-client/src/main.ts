import { createApp } from "vue";
import "./ui/globals.css";
import App from "./ui/App.vue";
import { initGame } from "./game/main";

initGame();

createApp(App).mount("#app");
