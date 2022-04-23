<template>
  <!-- validate-on-rule-change 不需要一进来就帮我验证 -->
  <el-form
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    label-width="100px"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="!item.children || !item.children!.length"
      >
        <component
          v-if="item.type !== 'upload'"
          v-bind="item.attrs"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        />
        <el-upload
          v-else
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <slot name="uploadArea"></slot>
          <template #tip>
            <slot name="uploadTip"></slot>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children!.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-bind="item.attrs"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
            :is="`el-${child.type}`"
          />
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted, watch } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { FormOptions } from "./types/types";

let emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "before-upload",
  "before-remove",
  "http-request",
  "on-exceed",
]);

let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});
let model = ref<any>(null);
let rules = ref<any>({});

// 初始化表单方法
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

// 上传组件的所有方法
let onPreview = (file: any) => {
  emits("on-preview", file);
};
let onRemove = (file: any, fileList: any) => {
  emits("on-remove", {
    file,
    fileList,
  });
};
let onSuccess = (response: any, file: any, fileList: any) => {
  emits("on-success", {
    response,
    file,
    fileList,
  });
};
let onError = (error: any, file: any, fileList: any) => {
  emits("on-error", {
    error,
    file,
    fileList,
  });
};
let onProgress = (event: any, file: any, fileList: any) => {
  emits("on-progress", {
    event,
    file,
    fileList,
  });
};
let onChange = (file: any, fileList: any) => {
  emits("on-change", {
    file,
    fileList,
  });
};
let beforeUpload = (file: any) => {
  emits("before-upload", file);
};
let beforeRemove = (file: any, fileList: any) => {
  emits("before-remove", {
    file,
    fileList,
  });
};
let httpRequest = () => {
  emits("http-request");
};
let onExceed = (file: any, fileList: any) => {
  emits("on-exceed", {
    file,
    fileList,
  });
};

onMounted(() => {
  initForm();
});

// 监听父组件传递进来的 options
watch(
  () => props.options,
  () => {
    initForm();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
