<script setup lang="ts">
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";

defineProps<{
  onBack?: () => void;
}>();
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
      />
      <Button class="mt-2"><span class="-mb-1">Connect</span></Button>
    </main>
  </div>
</template>
