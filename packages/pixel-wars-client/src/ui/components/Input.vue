<script lang="ts" setup>
const model = defineModel<string>();
</script>

<template>
  <input class="border-2 p-1 pl-2 pr-2" v-model="model" />
</template>
