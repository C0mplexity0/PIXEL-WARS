<script setup lang="ts">
import { ref } from "vue";
import HomeMenu from "./menus/home/HomeMenu.vue";
import MultiplayerConnectMenu from "./menus/multiplayer-connect/MultiplayerConnectMenu.vue";
import GameMenu from "./menus/game/GameMenu.vue";
import LoadingMenu from "./menus/loading/LoadingMenu.vue";
import MultiplayerErrorMenu from "./menus/multiplayer-error/MultiplayerErrorMenu.vue";
import { onMenuDetailsChanged } from "../util/menus.ts";

export type Menu =
  | "home"
  | "game"
  | "loading"
  | "multiplayer-connect"
  | "multiplayer-error";

const menu = ref<Menu>("home");

const loadingMessage = ref<string>("Connecting...");
const errorMessage = ref<string>("Couldn't connect to server.");

const menus = {
  home: HomeMenu,
  game: GameMenu,
  loading: LoadingMenu,
  "multiplayer-connect": MultiplayerConnectMenu,
  "multiplayer-error": MultiplayerErrorMenu,
};

function getMenuMessage() {
  if (menu.value === "loading") {
    return loadingMessage.value;
  } else if (menu.value === "multiplayer-error") {
    return errorMessage.value;
  }

  return undefined;
}

onMenuDetailsChanged(
  ({
    menu: newMenu,
    loadingMessage: newLoadingMessage,
    errorMessage: newErrorMessage,
  }) => {
    if (newMenu !== undefined) {
      menu.value = newMenu;
    }

    if (newLoadingMessage !== undefined) {
      loadingMessage.value = newLoadingMessage;
    }

    if (newErrorMessage !== undefined) {
      errorMessage.value = newErrorMessage;
    }
  },
);
</script>

<template>
  <component
    :is="menus[menu]"
    v-model:menu="menu"
    :message="getMenuMessage()"
    v-model:loading-message="loadingMessage"
    v-model:error-message="errorMessage"
  />
</template>
