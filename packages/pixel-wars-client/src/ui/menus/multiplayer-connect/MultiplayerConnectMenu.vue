<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import { attemptMultiplayerConnection } from "../../../game/main.ts";
import { changeMenuDetails } from "../../../util/menus.ts";

const ip = ref<string>("");
</script>

<template>
  <div class="size-full">
    <Button
      class="m-4 absolute"
      @click="() => changeMenuDetails({ menu: 'home' })"
    >
      <span class="-mb-1">Back</span>
    </Button>

    <div class="flex justify-center items-center size-full bg-white">
      <main class="flex flex-col text-center w-75">
        <label htmlFor="ip">Enter Server IP</label>
        <Input
          name="ip"
          id="ip"
          type="text"
          placeholder="pw.example.com"
          v-model="ip"
        />
        <Button class="mt-2" @click="() => attemptMultiplayerConnection(ip)">
          <span class="-mb-1">Connect</span>
        </Button>
      </main>
    </div>
  </div>
</template>
