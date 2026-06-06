<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    spritesheetImgSrc: string;
    timings: number[];
    alt: string;
    playing?: boolean;
  }>(),
  {
    playing: true,
  },
);

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
  <div class="relative overflow-hidden">
    <img
      :alt="alt"
      :src="spritesheetImgSrc"
      :style="{ left: `${frame * -100}%` }"
      class="h-full w-fit max-w-max absolute"
    />
  </div>
</template>
