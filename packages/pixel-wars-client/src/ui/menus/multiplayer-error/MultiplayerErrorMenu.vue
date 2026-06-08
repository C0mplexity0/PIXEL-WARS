<script setup lang="ts">
import { changeMenuDetails } from "../../../util/menus.ts";
import Button from "../../components/Button.vue";
import Text from "../../components/Text.vue";

defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="flex justify-center items-center size-full bg-white">
    <main class="flex flex-col text-center w-75">
      <div class="size-full flex flex-col justify-center items-center gap-4">
        <Text>{{ message }}</Text>
        <Button
          class="w-full"
          @click="() => changeMenuDetails({ menu: 'multiplayer-connect' })"
        >
          <Text>Back</Text>
        </Button>
      </div>
    </main>
  </div>
</template>
