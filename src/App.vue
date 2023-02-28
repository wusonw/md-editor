<!--
 * @Author: wangwuzhen wangwuzhen@nuaa.edu.cn
 * @Date: 2023-02-28 20:54:33
 * @LastEditors: wangwuzhen wangwuzhen@nuaa.edu.cn
 * @LastEditTime: 2023-02-28 22:37:56
 * @FilePath: /md-editor/src/App.vue
 * @Description: 
 * 
-->
<template>
  <n-config-provider :theme="appTheme === 'dark' ? darkTheme : lightTheme">
    <n-card
      style="width: 100vw; height: 100vh; border-radius: 0"
      :bordered="false"
    >
      <n-space vertical>
        <n-space justify="space-between">
          <n-space>
            <n-select
              v-model:value="previewTheme"
              :options="previewThemes"
              :consistent-menu-width="false"
              size="large"
              style="width: 200px"
            />
            <MarkdownUploader @loaded="onFileLoaded" />
          </n-space>
          <n-button
            @click="appTheme = appTheme === 'dark' ? 'light' : 'dark'"
            size="large"
          >
            切换主题
          </n-button>
        </n-space>

        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-card>
              <Editor v-model="mdText" style="height: 80vh" />
            </n-card>
          </n-gi>
          <n-gi>
            <n-card>
              <Preview
                :md-text="mdText"
                :theme="previewTheme"
                style="height: 80vh"
              />
            </n-card>
          </n-gi>
        </n-grid>
      </n-space>
    </n-card>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui";
import MarkdownUploader from "./components/MarkdownUploader.vue";
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";

const appTheme = ref("dark");

const mdText = ref("");

const PREVIEW_THEMES = ["channing-cyan", "fancy"];
const previewThemes = PREVIEW_THEMES.map((theme) => ({
  label: theme,
  value: theme,
}));
const previewTheme = ref("channing-cyan");

const onFileLoaded = (content: string | null) =>
  (mdText.value = content || mdText.value);
</script>

<style lang="scss" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css";
</style>
