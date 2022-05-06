<template>
  <div>
    <m-table
      :options="options"
      :data="tableData"
      isEditRow
      v-model:edit-row-index="editRowIndex"
      element-loading-text="加载中..."
      element-loading-background="rgba(122, 122, 122, 0.8)"
      :element-loading-spinner="svg"
      edit-icon="Bottom"
      pagination
      paginationAlign="center"
      :total="total"
      :currentPage="current"
      :pageSize="pageSize"
      @check="check"
      @close="close"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #date="{ scope }">
        <el-icon-timer></el-icon-timer>
        {{ scope.row.date }}
      </template>
      <template #name="{ scope }">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <template #action="{ scope }">
        <el-button size="small" type="primary" @click="edit(scope)">
          编辑
        </el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
      <template #editCell="{ scope }">
        <div style="display: flex">
          <el-button type="primary" size="small">确认</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </template>
      <template #editRow="{ scope }">
        <div style="display: flex">
          <el-button type="primary" size="small">确认</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </template>
    </m-table>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { TableOptions } from "../../components/table/src/types";
import { ref, onMounted } from "vue";

interface TableData {
  date: string;
  name: string;
  address: string;
}

// 表格数据
let tableData = ref<TableData[]>([]);

let editRowIndex = ref<string>("");

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

let current = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);

let getData = () => {
  axios
    .post("/api/list", {
      current: current.value,
      pageSize: pageSize.value,
    })
    .then((res) => {
      console.log(res.data.data);
      tableData.value = res.data.data.rows;
      total.value = res.data.data.total;
    });
};

onMounted(() => {
  getData();
});

// 表格数据
// setTimeout(() => {
//   tableData.value = [
//     {
//       date: "2016-05-03",
//       name: "Tom",
//       address: "No. 189, Grove St, Los Angeles",
//     },
//     {
//       date: "2016-05-02",
//       name: "Tom",
//       address: "No. 189, Grove St, Los Angeles",
//     },
//     {
//       date: "2016-05-04",
//       name: "Tom",
//       address: "No. 189, Grove St, Los Angeles",
//     },
//     {
//       date: "2016-05-01",
//       name: "Tom",
//       address: "No. 189, Grove St, Los Angeles",
//     },
//   ];
// }, 3000);
//表格配置
let options: TableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "center",
    slot: "date",
    editable: true,
  },
  {
    label: "姓名",
    prop: "name",
    align: "center",
    slot: "name",
  },
  {
    label: "地址",
    prop: "address",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    align: "center",
    action: true,
  },
];

let edit = (scope: any) => {
  editRowIndex.value = "edit";
  console.log(scope);
};

// 点击勾
let check = (scope: any) => {
  console.log(scope);
};
// 点击叉
let close = (scope: any) => {
  console.log(scope);
};
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getData();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getData();
};
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
