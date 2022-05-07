<template>
  <el-table
    v-bind="$attrs"
    :data="tableData"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-background="elementLoadingBackground"
    @row-click="rowClick"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :align="item.align"
        :label="item.label"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop]" />
          </template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div style="display: flex; align-items: center">
                <el-input size="small" v-model="scope.row[item.prop]" />
                <div @click.stop="clickEditCell">
                  <!-- $slots.editCell 获取到当前slot的值 -->
                  <slot name="editCell" :scope="scope" v-if="$slots.editCell">
                  </slot>
                  <div class="icons" v-else>
                    <el-icon-check class="check" @click.stop="check(scope)" />
                    <el-icon-close class="close" @click.stop="close(scope)" />
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop] }}</span>
              <component
                :is="`el-icon-${toLine(editIcon)}`"
                class="edit"
                v-if="item.editable"
                @click.stop="clickEdit(scope)"
              />
            </template>
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
        <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
        <slot name="action" :scope="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>
  <div
    class="pagination"
    v-if="pagination"
    :style="{ 'justify-content': paginationAlignJustify }"
  >
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { toLine } from "../../utils";
import { ref, PropType, computed, onMounted, watch } from "vue";
import { TableOptions } from "./types";
import cloneDeep from "lodash/cloneDeep";

// 分发事件
let emits = defineEmits([
  "close",
  "check",
  "update:editRowIndex",
  "size-change",
  "current-change",
]);
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
  //是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑行的按钮标识
  editRowIndex: {
    type: String,
    default: "",
  },
  // 当前是第几页的
  currentPage: {
    type: Number,
    default: 1,
  },
  // 每页数据的选项
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 20, 30, 40],
  },
  // 当前一页多少条数据
  pageSize: {
    type: Number,
    default: 10,
  },
  // 分页总数
  total: {
    type: Number,
  },
  // 是否开启分页
  pagination: {
    type: Boolean,
    default: false,
  },
  // 分页的排列方式
  paginationAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
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

// 拷贝一份表格的数据
let tableData = ref<any[]>(cloneDeep(props.data));

// 拷贝一份按钮的标识
let cloneEditRowIndex = ref<string>(props.editRowIndex);

// 监听父组件数据
watch(
  () => props.data,
  (val) => {
    tableData.value = cloneDeep(val);
    tableData.value.map((item) => {
      // 代表当前是否是可编辑的状态
      item.rowEdit = false;
      return item;
    });
  }
);

// 监听父组件传递来的标识
watch(
  () => props.editRowIndex,
  (val) => {
    if (val) cloneEditRowIndex.value = val;
  }
);

onMounted(() => {
  tableData.value.map((item) => {
    // 代表当前是否是可编辑的状态
    item.rowEdit = false;
  });
});

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

// 表格点击一个行
let rowClick = (row: any, column: any) => {
  // 判断当前点击的时候是操作项的内容
  if (actionOptions.value && column.label === actionOptions.value.label) {
    // 编辑行的操作
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      // 点击的按钮是做可编辑的操作
      row.rowEdit = !row.rowEdit;
      // 重置其他数据
      tableData.value.map((item) => {
        if (item !== row) {
          item.rowEdit = false;
        }
      });
      // 要重置按钮标识
      if (!row.rowEdit) emits("update:editRowIndex", "");
    }
  }
};

// 分页的椰树改变
let handleSizeChange = (val: number) => {
  emits("size-change", val);
};
// 分页的条数改变
let handleCurrentChange = (val: number) => {
  emits("current-change", val);
};
// 和flex布局结合的排列方式
let paginationAlignJustify = computed(() => {
  if (props.paginationAlign === "left") return "flex-start";
  else if (props.paginationAlign === "center") return "center";
  else return "flex-end";
});
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
.pagination {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
</style>
