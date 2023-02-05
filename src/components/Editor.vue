<template>
  <div class="editor">
    <div class="main">
      <Codemirror
        v-model="code"
        :style="{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          color: '#333',
        }"
        placeholder="Write your markdown here..."
        :extensions="[markdown(), oneDark]"
        :autofocus="config.autofocus"
        :disabled="config.disabled"
        :indent-with-tab="config.indentWithTab"
        :tab-size="config.tabSize"
        @update="handleStateUpdate"
        @ready="handleReady"
      />
    </div>
    <div class="footer">
      <span>Markdown</span>
      <div class="infos">
        <span class="item">Spaces: {{ config.tabSize ?? 0 }}</span>
        <span class="item">Length: {{ state.length ?? 0 }}</span>
        <span class="item">Lines: {{ state.lines ?? 0 }}</span>
        <span class="item">Cursor: {{ state.cursor ?? 0 }}</span>
        <span class="item">Selected: {{ state.selected ?? 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Codemirror } from "vue-codemirror";

import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const code = ref(props.modelValue);
watch(
  () => code.value,
  () => {
    emit("update:modelValue", code.value);
    console.log("code change");
  }
);
watch(
  () => props.modelValue,
  () => {
    code.value = props.modelValue;
    console.log("props change");
  }
);

const config = {
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 4,
};

const cmView = shallowRef<EditorView>();
const handleReady = ({ view }: any) => {
  cmView.value = view;
};

const state = reactive({
  lines: null as null | number,
  cursor: null as null | number,
  selected: null as null | number,
  length: null as null | number,
});

const handleStateUpdate = (viewUpdate: ViewUpdate) => {
  // selected
  const ranges = viewUpdate.state.selection.ranges;
  state.selected = ranges.reduce(
    (plus, range) => plus + range.to - range.from,
    0
  );
  state.cursor = ranges[0].anchor;
  // length
  state.length = viewUpdate.state.doc.length;
  state.lines = viewUpdate.state.doc.lines;
  // log('viewUpdate', viewUpdate)
};
</script>

<style lang="scss" scoped>
$footer-height: 1.5rem;
$footer-background-color: #22272e;
$footer-text-color: #adbac7;
.editor {
  .main {
    display: flex;
    width: 100%;
    height: calc(100% - $footer-height);
    font-size: 16px;

    .code {
      width: 30%;
      height: 100px;
      margin: 0;
      padding: 0.4em;
      border-left: 1px solid #ccc;
      font-family: monospace;
    }
  }

  .footer {
    height: $footer-height;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 90%;
    color: $footer-text-color;
    background-color: $footer-background-color;

    .infos {
      .item {
        margin-left: 2em;
        display: inline-block;
        font-feature-settings: "tnum";
      }
    }
  }
}
</style>
