<template>
  <div class="container">
    <div class="main">
      <Editor v-model="mdText"></Editor>
      <Preview :md-text="mdText" :theme="theme"></Preview>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";

const mdText = ref("");
const theme = ref("fancy");
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .main {
    width: 90%;
    height: 80%;
    display: flex;
    overflow: overlay;
    scrollbar-gutter: stable;

    .editor,
    .preview {
      width: 50%;
      height: 100%;
    }
  }
}
</style>
