<template>
  <n-button @click="showModal = true" size="large"> 上传 Markdown </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      title="上传文件"
      style="width: 800px"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-space vertical>
        <n-input-group>
          <n-input
            v-model:value="fileUrl"
            type="text"
            placeholder="从URL获取文件"
            :loading="isLoading"
            size="large"
          />
          <n-button
            type="primary"
            size="large"
            @click="onGetFileFromUrlBtnClicked"
          >
            获取
          </n-button>
        </n-input-group>

        <n-upload
          directory-dnd
          :file-list="[]"
          accept=".md,.txt"
          @change="onUploadedChange"
        >
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              支持 .md 和 .txt 格式文件上传
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";

const emit = defineEmits(["loaded"]);

const showModal = ref(false);
const URL_REG =
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
const fileUrl = ref("");
const isLoading = ref(false);

const onGetFileFromUrlBtnClicked = async () => {
  const check = URL_REG.test(fileUrl.value);
  let content = null as null | string;
  if (!check) {
    alert("请输入正确的URL地址");
    return;
  }
  try {
    isLoading.value = true;
    const response = await fetch(fileUrl.value);
    content = await response.text();
    if (content !== null) {
      isLoading.value = false;
      showModal.value = false;
    }
  } catch (err) {
    isLoading.value = false;
    alert(err);
  } finally {
    emit("loaded", content);
  }
};

const onUploadedChange = async (uploaded: any) => {
  let content = null as null | string;
  try {
    content = await uploaded.file.file.text();
    showModal.value = false;
  } catch {
    // message error
    alert("读取文件失败");
  } finally {
    emit("loaded", content);
  }
};
</script>
