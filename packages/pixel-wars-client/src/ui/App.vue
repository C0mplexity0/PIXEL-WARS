<script setup lang="ts">
import { ref } from "vue";
import HomeMenu from "./menus/home/HomeMenu.vue";
import { startSingleplayerGame, stopSingleplayerGame } from "../game/main.ts";
import MultiplayerConnectMenu from "./menus/multiplayer-connect/MultiplayerConnectMenu.vue";
import GameMenu from "./menus/game/GameMenu.vue";

const menu = ref<"home" | "game" | "multiplayer-connect">("home");

function launchSingleplayerGame() {
  menu.value = "game";
  startSingleplayerGame();
}

function leaveGame() {
  menu.value = "home";
  stopSingleplayerGame();
}
</script>

<template>
  <HomeMenu
    v-if="menu === 'home'"
    @singleplayer-menu-open="launchSingleplayerGame"
    @multiplayer-menu-open="menu = 'multiplayer-connect'"
  />
  <MultiplayerConnectMenu
    v-else-if="menu === 'multiplayer-connect'"
    @back="menu = 'home'"
    @play="menu = 'game'"
  />
  <GameMenu v-else-if="menu === 'game'" @exit="leaveGame" />
</template>
