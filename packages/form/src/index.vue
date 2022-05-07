<template>
  <!-- validate-on-rule-change 不需要一进来就帮我验证 -->
  <el-form
    v-if="model"
    ref="form"
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
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-bind="item.attrs"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
        />
        <el-upload
          v-if="item.type === 'upload'"
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

        <div v-if="item.type === 'editor'" id="editor"></div>
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
          v-model="model[item.prop]"
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
    <el-form-item>
      <!-- 作用域插槽 -->
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import E from "wangeditor";
import { PropType, ref, onMounted, watch, nextTick } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { FormOptions, FormInstance } from "./types/types";

let form = ref<FormInstance | null>(null);
let edit = ref();

let emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "before-upload",
  "before-remove",
  "on-exceed",
]);

let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
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
      m[item.prop] = item.value;
      r[item.prop] = item.rules;
      // 初始化富文本编辑器
      if (item.type === "editor") {
        // 获取更新后的dom节点
        nextTick(() => {
          if (document.getElementById("editor")) {
            const editor = new E("#editor");
            editor.config.placeholder = item.placeholder!;
            editor.create();
            // 初始化 editor 的内容
            editor.txt.html(item.value);
            editor.config.onchange = (newHtml: string) => {
              model.value[item.prop] = newHtml;
            };
            edit.value = editor;
          }
        });
      }
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

// 重置表单方法
let restFields = () => {
  // 重置element-plus的表单
  form.value!.resetFields();
  // 重置富文本编辑器的内容
  // 获取到富文本的配置项
  if (props.options && props.options.length) {
    let editorItem = props.options.find((item) => item.type === "editor");
    if (editorItem) edit.value.txt.html(editorItem.value);
  }
};

// 表单验证
let validate = () => {
  return form.value!.validate;
};

// 获取表单数据
let getFormData = () => {
  return model.value;
};

// defineExpose 将子组件自身的属性暴露出去，使其父组件可以通过 ref 来获取对应的值
// 分发方法
defineExpose({
  restFields,
  validate,
  getFormData,
});

// 上传组件的所有方法
let onPreview = (file: File) => {
  emits("on-preview", file);
};
let onRemove = (file: File, fileList: FileList) => {
  emits("on-remove", {
    file,
    fileList,
  });
};
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功，给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploaditem.prop] = { response, file, fileList };
  emits("on-success", {
    response,
    file,
    fileList,
  });
};
let onError = (error: any, file: any, fileList: FileList) => {
  emits("on-error", {
    error,
    file,
    fileList,
  });
};
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits("on-progress", {
    event,
    file,
    fileList,
  });
};
let onChange = (file: File, fileList: FileList) => {
  emits("on-change", {
    file,
    fileList,
  });
};
let beforeUpload = (file: File) => {
  emits("before-upload", file);
};
let beforeRemove = (file: File, fileList: FileList) => {
  emits("before-remove", {
    file,
    fileList,
  });
};
let onExceed = (files: File, fileList: FileList) => {
  emits("on-exceed", {
    files,
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
