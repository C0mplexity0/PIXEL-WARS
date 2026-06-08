<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import { attemptMultiplayerConnection } from "../../../game/main.ts";
import { changeMenuDetails } from "../../../util/menus.ts";
import Text from "../../components/Text.vue";
import Icon from "../../components/Icon.vue";

const ip = ref<string>("");
</script>

<template>
  <div class="size-full">
    <Button
      class="m-4 absolute"
      @click="() => changeMenuDetails({ menu: 'home' })"
    >
      <Icon icon="arrow-left" alt="Back" /> <Text>Back</Text>
    </Button>

    <div class="flex justify-center items-center size-full bg-white">
      <main class="flex flex-col text-center w-75">
        <label htmlFor="ip"><Text>Enter Server IP</Text></label>
        <Input
          name="ip"
          id="ip"
          type="text"
          placeholder="pw.example.com"
          v-model="ip"
        />
        <Button class="mt-2" @click="() => attemptMultiplayerConnection(ip)">
          <Text>Connect</Text>
        </Button>
      </main>
    </div>
  </div>
</template>
