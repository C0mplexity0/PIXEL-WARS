<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import {
  connectToMultiplayerServer,
  startMultiplayerGame,
  validateMultiplayerServer,
} from "../../../game/main.ts";
import AnimatedImg from "../../components/AnimatedImg.vue";
import loadingSpinner from "../../../assets/img/loading-spinner.png";
import type { Socket } from "socket.io-client";

const props = defineProps<{
  onBack?: () => void;
  onPlay?: () => void;
}>();

const menu = ref<"input" | "loading" | "error">("input");

const address = ref<string>("");
const loadingMessage = ref<string>("Connecting...");
const errorMessage = ref<string>("Couldn't connect to server.");

async function attemptConnection() {
  if (!address.value) {
    return;
  }

  menu.value = "loading";
  loadingMessage.value = "Pinging server...";

  const result = await validateMultiplayerServer(address.value);

  if (!result) {
    menu.value = "error";
    errorMessage.value = "Server couldn't be found.";
    return;
  }

  loadingMessage.value = "Connecting to server...";

  let socket: Socket;

  try {
    socket = (await connectToMultiplayerServer(address.value)) as Socket;
  } catch (e) {
    menu.value = "error";
    errorMessage.value = "Couldn't connect to server.";
    return;
  }

  startMultiplayerGame(socket);
  menu.value = "input";
  props.onPlay?.();
}
</script>

<template>
  <Button class="m-4 absolute" @click="onBack">
    <span class="-mb-1">Back</span>
  </Button>

  <div
    v-if="menu === 'input'"
    class="flex justify-center items-center size-full bg-white"
  >
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

  <div
    v-if="menu === 'loading'"
    class="flex justify-center items-center size-full bg-white"
  >
    <main class="flex flex-col text-center w-75">
      <div class="size-full flex flex-col justify-center items-center gap-4">
        <AnimatedImg
          :spritesheetImgSrc="loadingSpinner"
          :timings="[100, 100, 100, 100, 100, 100, 100, 100]"
          class="w-12 h-12"
          alt="Loading spinner"
        />
        <span>{{ loadingMessage }}</span>
      </div>
    </main>
  </div>

  <div
    v-if="menu === 'error'"
    class="flex justify-center items-center size-full bg-white"
  >
    <main class="flex flex-col text-center w-75">
      <div
        className="size-full flex flex-col justify-center items-center gap-4"
      >
        <span>{{ errorMessage }}</span>
        <Button class="w-full" @click="menu = 'input'">Return</Button>
      </div>
    </main>
  </div>
</template>
