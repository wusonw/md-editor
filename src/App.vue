<template>
  <div class="container">
    <div class="header">
      <div class="toolbar">
        预览主题
        <n-popselect
          v-model:value="theme"
          :options="themeOptions"
          trigger="click"
        >
          <n-button>{{ theme }}</n-button>
        </n-popselect>
      </div>
    </div>
    <div class="main">
      <Editor v-model="mdText" />
      <Preview :md-text="mdText" :theme="theme" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";

const mdText = ref("");

const THEMES = ["channing-cyan", "fancy"];
const themeOptions = THEMES.map((theme) => ({ label: theme, value: theme }));
const theme = ref("channing-cyan");
</script>

<style lang="scss" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header {
    width: 90%;
    height: 50px;
  }
  .main {
    width: 90%;
    height: 80%;
    display: flex;
    overflow: overlay;

    .editor,
    .preview {
      width: 50%;
      height: 100%;
    }

    .preview {
      .katex {
        font-style: italic;
        margin: 12px 0;
        padding: 0.5em 1em;
        background-color: #f8f5ff;
        & > p {
          margin: 0;
        }
      }
    }
  }
}
</style>
