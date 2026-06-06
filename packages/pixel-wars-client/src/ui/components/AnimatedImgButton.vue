<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { ref } from "vue";
import AnimatedImg from "./AnimatedImg.vue";

defineProps<{
  defaultImgSrc: string;
  spritesheetImgSrc: string;
  timings: number[];
  alt: string;
  className?: string;
}>();

const hovered = ref(false);
</script>

<template>
  <button
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focus="hovered = true"
    @blur="hovered = false"
    :className="twMerge('relative p-0 block overflow-hidden', className)"
  >
    <AnimatedImg
      :alt="alt"
      :spritesheetImgSrc="spritesheetImgSrc"
      :timings="timings"
      className="size-full"
      :style="{ opacity: hovered ? '1' : '0' }"
      :playing="hovered"
    />
    <img
      :alt="alt"
      :src="defaultImgSrc"
      className="h-full absolute top-0 cursor-pointer block max-w-max"
      :style="{ opacity: hovered ? '0' : '1' }"
    />
  </button>
</template>
