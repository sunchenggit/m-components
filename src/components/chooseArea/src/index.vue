<template>
  <div>
    <el-select placeholder="请选择省份" v-model="provice">
      <el-option>1</el-option>
    </el-select>
    <el-select placeholder="请选择城市" v-model="city" style="margin: 0 10px">
      <el-option>2</el-option>
    </el-select>
    <el-select placeholder="请选择请区域" v-model="area">
      <el-option>3</el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import allRreas from "../lib/pc-code.json";
let provice = ref<string>("");
let city = ref<string>("");
let area = ref<string>("");
console.log(allRreas);
</script>
