<script setup lang="ts">
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "../../components/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuPositioner from "../../components/dropdown-menu/DropdownMenuPositioner.vue";
import DropdownMenuTrigger from "../../components/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuItem from "../../components/dropdown-menu/DropdownMenuItem.vue";
import { stopGame } from "../../../game/main.ts";
</script>

<template>
  <main class="size-full p-4">
    <DropdownMenu>
      <DropdownMenuTrigger> Menu </DropdownMenuTrigger>
      <DropdownMenuPositioner>
        <DropdownMenuContent>
          <DropdownMenuItem value="main-menu" @click="stopGame">
            Main Menu
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPositioner>
    </DropdownMenu>
  </main>
</template>
