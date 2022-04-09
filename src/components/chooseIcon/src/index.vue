<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <div class="m-choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="dialogVisible">
      <div class="container">
        <div
          class="item"
          v-for="item in Object.keys(ElIcons)"
          :key="item"
          @click="clickItem(item)"
        >
          <div>
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          <div>{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import * as ElIcons from "@element-plus/icons-vue";
import { toLine } from "../../../utils";
import { watch, ref } from "vue";
import { useCopy } from "../../../hooks/useCopy";
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

let clickItem = (item) => {
  let text = `el-icon-${toLine(item)}`;
  useCopy(text);
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.item {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  height: 70px;
  div:first-child {
    flex: 1;
  }
}
svg {
  width: 2em;
  height: 2em;
}
</style>
