<template>
  <div :class="`preview ${theme}`" v-html="html"></div>
</template>

<script setup lang="ts">
import { renderMarkdown } from "../utils/md";

const props = defineProps<{
  mdText: string;
  theme?: string;
}>();

const html = computed(() => renderMarkdown(props.mdText));
</script>

<style lang="scss">
@import "../assets/themes/fancy.scss";
</style>
