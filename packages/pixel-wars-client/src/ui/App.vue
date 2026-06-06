<script setup lang="ts">
import { ref } from "vue";
import HomeMenu from "./menus/home/HomeMenu.vue";
import { startSingleplayerGame } from "../game/main.ts";
import MultiplayerConnectMenu from "./menus/multiplayer-connect/MultiplayerConnectMenu.vue";

const menu = ref<"home" | "game" | "multiplayer-connect">("home");

function launchSingleplayerGame() {
  menu.value = "game";
  startSingleplayerGame();
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
  />
</template>
