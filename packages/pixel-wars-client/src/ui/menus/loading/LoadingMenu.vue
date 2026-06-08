<script setup lang="ts">
import AnimatedImg from "../../components/AnimatedImg.vue";
import loadingSpinner from "../../../assets/img/loading-spinner.png";
import Text from "../../components/Text.vue";

defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="flex justify-center items-center size-full bg-white">
    <main class="flex flex-col text-center w-75">
      <div class="size-full flex flex-col justify-center items-center gap-4">
        <AnimatedImg
          :spritesheetImgSrc="loadingSpinner"
          :timings="[100, 100, 100, 100, 100, 100, 100, 100]"
          class="w-12 h-12"
          alt="Loading spinner"
        />
        <Text>{{ message }}</Text>
      </div>
    </main>
  </div>
</template>
