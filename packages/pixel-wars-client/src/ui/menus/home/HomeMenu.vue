<script setup lang="ts">
import AnimatedImgButton from "../../components/AnimatedImgButton.vue";
import logoBlack from "../../../assets/img/pixel-wars-black.png";
import singleplayerButtonDefault from "../../../assets/img/singleplayer-button-default.png";
import singleplayerButtonSpritesheet from "../../../assets/img/singleplayer-button-spritesheet.png";
import multiplayerButtonDefault from "../../../assets/img/multiplayer-button-default.png";
import multiplayerButtonSpritesheet from "../../../assets/img/multiplayer-button-spritesheet.png";

defineProps<{
  onSingleplayerMenuOpen?: () => void;
  onMultiplayerMenuOpen?: () => void;
}>();
</script>

<template>
  <main class="size-full bg-white flex items-center justify-center">
    <div className="w-200 flex flex-col items-center justify-center gap-2">
      <img className="w-100 pb-8" :src="logoBlack" alt="PIXEL WARS Logo" />

      <AnimatedImgButton
        :defaultImgSrc="singleplayerButtonDefault"
        :spritesheetImgSrc="singleplayerButtonSpritesheet"
        :timings="[
          100, 300, 250, 100, 100, 300, 450, 300, 400, 250, 500, 300, 300, 350,
          350, 250, 300, 400, 350, 2500,
        ]"
        className="w-126 h-18"
        alt="Singleplayer Button Image"
        aria-label="Singleplayer Button"
        @click="onSingleplayerMenuOpen"
      />

      <AnimatedImgButton
        :defaultImgSrc="multiplayerButtonDefault"
        :spritesheetImgSrc="multiplayerButtonSpritesheet"
        :timings="[
          100, 400, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
          100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
          100, 100, 100, 100, 150, 125, 150, 150, 150, 125, 150, 150, 100, 100,
          100, 2500,
        ]"
        className="w-126 h-18"
        alt="Multiplayer Button Image"
        aria-label="Multiplayer Button"
        @click="onMultiplayerMenuOpen"
      />
    </div>
  </main>
</template>
