<script setup lang="ts">
import { Menu } from "@ark-ui/vue";

defineProps<{
  value: string;
  onClick?: () => void;
}>();
</script>

<template>
  <Menu.Item
    :value="value"
    class="flex items-center gap-1.5 px-1.5 py-0 h-8 cursor-pointer hover:bg-button-hovered [data-highlighted]:hover:bg-button-hovered"
    @click="onClick"
  >
    <slot />
  </Menu.Item>
</template>
