<template>
  <div>
    <m-table :options="options" :data="tableData">
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
    </m-table>
  </div>
</template>

<script lang="ts" setup>
import { TableOptions } from "../../components/table/src/types";

// 表格数据
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
//表格配置
let options: TableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "center",
    slot: "date",
    // width: 180,
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
  },
  {
    label: "操作",
    align: "center",
    action: true,
  },
];
let edit = (scope: any) => {
  console.log(scope);
};
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
