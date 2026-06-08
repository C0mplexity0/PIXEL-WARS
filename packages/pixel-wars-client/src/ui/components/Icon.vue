<script lang="ts" setup>
import arrowLeftIcon from "../../assets/img/icon/arrow-left.png";
import homeIcon from "../../assets/img/icon/home.png";
import menuIcon from "../../assets/img/icon/menu.png";

const icons = {
  "arrow-left": arrowLeftIcon,
  home: homeIcon,
  menu: menuIcon,
};

defineProps<{
  icon: keyof typeof icons;
  alt: string;
}>();
</script>

<template>
  <img :src="icons[icon]" :alt="alt" class="icon size-4.5" />
</template>
