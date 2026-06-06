<script setup lang="ts">
import { ref } from "vue";
import HomeMenu from "./menus/home/HomeMenu.vue";
import { startSingleplayerGame } from "../game/main.ts";

const state = ref<"menu" | "game">("menu");

function launchSingleplayerGame() {
  state.value = "game";
  startSingleplayerGame();
}
</script>

<template>
  <HomeMenu
    v-if="state === 'menu'"
    v-on:singleplayer-menu-open="launchSingleplayerGame"
  />
</template>
