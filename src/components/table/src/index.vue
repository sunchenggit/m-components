<template>
  <el-table :data="data">
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        v-if="!item.slot"
        :align="item.align"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
      ></el-table-column>
      <el-table-column
        v-else
        :align="item.align"
        :label="item.label"
        :width="item.width"
      >
        <template #default="scope">
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :align="actionOptions!.align"
      :label="actionOptions!.label"
      :prop="actionOptions!.prop"
      :width="actionOptions!.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { TableOptions } from "./types";
let props = defineProps({
  // 表格的配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  //表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
// 过滤操作项之后的重置
let tableOptions = computed(() => props.options.filter((item) => !item.action));
// 找出操作项的配置
let actionOptions = computed(() => props.options.find((item) => item.action));
</script>

<style lang="scss" scoped></style>
