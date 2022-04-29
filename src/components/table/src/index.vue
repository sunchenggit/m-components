<template>
  <el-table
    :data="data"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-background="elementLoadingBackground"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :align="item.align"
        :label="item.label"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.$index + scope.column.id === currentEdit">
            <div style="display: flex; align-items: center">
              <el-input size="small" v-model="scope.row[item.prop!]" />
              <div @click="clickEditCell">
                <!-- $slots.editCell 获取到当前slot的值 -->
                <slot name="editCell" :scope="scope" v-if="$slots.editCell">
                </slot>
                <div class="icons" v-else>
                  <el-icon-check class="check" @click="check(scope)" />
                  <el-icon-close class="close" @click="close(scope)" />
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
            <span v-else>{{ scope.row[item.prop!] }}</span>
            <component
              :is="`el-icon-${toLine(editIcon)}`"
              class="edit"
              v-if="item.editable"
              @click="clickEdit(scope)"
            />
          </template>
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
import { toLine } from "../../../utils";
import { ref, PropType, computed } from "vue";
import { TableOptions } from "./types";
// 分发事件
let emits = defineEmits(["close", "check"]);
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
  // 加载文案
  elementLoadingText: {
    type: String,
  },
  // 加载图表名
  elementLoadingSpinner: {
    type: String,
  },
  // 加载背景色
  elementLoadingBackground: {
    type: String,
  },
  // 加载svg
  elementLoadingSvg: {
    type: String,
  },
  // 加载svg
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 可编辑单元格显示的图标
  editIcon: {
    type: String,
    default: "edit",
  },
});
// 过滤操作项之后的重置
let tableOptions = computed(() => props.options.filter((item) => !item.action));
// 找出操作项的配置
let actionOptions = computed(() => props.options.find((item) => item.action));
//表格是否在加载中
let isLoading = computed(() => !props.data || props.data.length == 0);

// 标识当前点击的单元格
let currentEdit = ref<string>("");
// 编辑单元格
let clickEdit = (scope: any) => {
  // 唯一的标识
  currentEdit.value = scope.$index + scope.column.id;
};
// 点击勾
let check = (scope: any) => {
  emits("check", scope);
};
// 点击叉
let close = (scope: any) => {
  emits("close", scope);
};
//
let clickEditCell = () => {
  currentEdit.value = "";
};
</script>

<style lang="scss" scoped>
.edit {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  left: 4px;
  cursor: pointer;
}
.icons {
  display: flex;
  svg {
    width: 1em;
    height: 1em;
    margin-left: 8px;
    cursor: pointer;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
</style>
