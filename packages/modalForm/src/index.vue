<template>
  <div :class="{ 'm-choose-icon-dialog-body-height': isScroll }">
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <m-form
          :options="options"
          ref="form"
          @on-change="onChange"
          @before-upload="beforeUpload"
          @on-remove="onRemove"
          @on-preview="onPreview"
          @on-exceed="onExceed"
          @before-remove="beforeRemove"
          @on-success="onSuccess"
          @on-error="onError"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </m-form>
      </template>
      <!-- 组件自带的 -->
      <template #footer>
        <!-- 重新定义的 -->
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from "vue";
import { FormOptions, FormInstance } from "../../form/src/types/types";
let emits = defineEmits(["update:visible"]);
let form = ref<FormInstance | null>();

let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 只在屏幕区域内滚动
  isScroll: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function,
  },
  onRemove: {
    type: Function,
  },
  onPreview: {
    type: Function,
  },
  beforeUpload: {
    type: Function,
  },
  onExceed: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
  onError: {
    type: Function,
  },
});
let dialogVisible = ref<boolean>(props.visible);
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);
watch(
  () => dialogVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>

<style lang="scss" scoped></style>
