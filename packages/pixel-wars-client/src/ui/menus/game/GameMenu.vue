<script setup lang="ts">
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "../../components/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuPositioner from "../../components/dropdown-menu/DropdownMenuPositioner.vue";
import DropdownMenuTrigger from "../../components/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuItem from "../../components/dropdown-menu/DropdownMenuItem.vue";
import { stopGame } from "../../../game/main.ts";
import Icon from "../../components/Icon.vue";
import Text from "../../components/Text.vue";
</script>

<template>
  <main class="size-full p-4">
    <DropdownMenu>
      <DropdownMenuTrigger><Icon icon="menu" alt="Menu" /></DropdownMenuTrigger>
      <DropdownMenuPositioner>
        <DropdownMenuContent>
          <DropdownMenuItem value="main-menu" @click="stopGame">
            <Icon icon="home" alt="Home" /> <Text>Main Menu</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPositioner>
    </DropdownMenu>
  </main>
</template>
