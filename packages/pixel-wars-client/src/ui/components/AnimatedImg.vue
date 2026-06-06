<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { ref, watch } from "vue";

const props = defineProps<{
  spritesheetImgSrc: string;
  timings: number[];
  alt: string;
  className?: string;
  playing?: boolean;
}>();

const frame = ref(0);
const currentTimeout = ref<number | null>(null);

function showNextFrame() {
  if (!props.playing) {
    frame.value = 0;
    return;
  }

  let nextFrame = frame.value + 1;

  if (!props.timings[nextFrame]) nextFrame = 0;

  frame.value = nextFrame;

  scheduleNextFrame();
}

function scheduleNextFrame() {
  if (currentTimeout.value !== null) {
    clearTimeout(currentTimeout.value);
  }
  currentTimeout.value = setTimeout(showNextFrame, props.timings[frame.value]);
}

watch(
  () => props.playing,
  (newPlaying) => {
    if (newPlaying) {
      scheduleNextFrame();
    } else {
      if (currentTimeout.value !== null) {
        clearTimeout(currentTimeout.value);
        currentTimeout.value = null;
      }
      frame.value = 0;
    }
  },
);

scheduleNextFrame();
</script>

<template>
  <div :className="twMerge('relative overflow-hidden', className)">
    <img
      :alt="alt"
      :src="spritesheetImgSrc"
      :style="{ left: `${frame * -100}%` }"
      className="h-full w-fit max-w-max absolute"
    />
  </div>
</template>
