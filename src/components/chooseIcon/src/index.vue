<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <el-dialog :title="title" v-model="dialogVisible">11</el-dialog>
</template>
<script lang="ts" setup>
import { watch, ref } from "vue";
let props = defineProps<{
  title: string;
  visible: boolean;
}>();
let emits = defineEmits(["update:visible"]);
//拷贝一份父组件传过来的visible
let dialogVisible = ref<boolean>(props.visible);
let handleClick = () => {
  emits("update:visible", !props.visible);
};

// 监听visible的变化，这里只能监听第一次的变化
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);

// 监听组件内部的dialogViaible变化
watch(
  () => dialogVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>
