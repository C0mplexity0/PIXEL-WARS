<script setup lang="ts">
import { Menu } from "@ark-ui/vue/menu";
import Button from "../Button.vue";
</script>

<template>
  <Menu.Trigger as-child>
    <Button>
      <slot />
    </Button>
  </Menu.Trigger>
</template>
