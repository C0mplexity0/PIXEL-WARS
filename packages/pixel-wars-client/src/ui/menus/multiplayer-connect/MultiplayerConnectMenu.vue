<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import { validateMultiplayerServer } from "../../../game/main.ts";

defineProps<{
  onBack?: () => void;
}>();

const address = ref<string>();

async function attemptConnection() {
  console.log(address.value);
  if (!address.value) {
    return;
  }

  const result = await validateMultiplayerServer(address.value);
  console.log(result);
}
</script>

<template>
  <Button class="m-4 absolute" @click="onBack"
    ><span class="-mb-1">Back</span></Button
  >
  <div class="flex justify-center items-center size-full bg-white">
    <main class="flex flex-col text-center w-75">
      <label htmlFor="address">Enter Server IP</label>
      <Input
        name="address"
        id="address"
        type="text"
        placeholder="pw.example.com"
        v-model="address"
      />
      <Button class="mt-2" @click="attemptConnection"
        ><span class="-mb-1">Connect</span></Button
      >
    </main>
  </div>
</template>
