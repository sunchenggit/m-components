<template>
  <div>
    <el-select clearable placeholder="请选择省份" v-model="provice">
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select
      clearable
      :disabled="!provice"
      placeholder="请选择城市"
      v-model="city"
      style="margin: 0 10px"
    >
      <el-option
        v-for="item in selectCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select
      clearable
      :disabled="!provice || !city"
      placeholder="请选择请区域"
      v-model="area"
    >
      <el-option
        v-for="item in selectArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import allAreas from "../lib/pca-code.json";
export interface AreaItem {
  name: string;
  code: string;
  children?: AreaItem[];
}
export interface Data {
  name: string;
  code: string;
}
// 下拉框选择省份的值
let provice = ref<string>("");
// 下拉框选择城市的值
let city = ref<string>("");
// 下拉框选择区域的值
let area = ref<string>("");
// 所有省市区区域数据
let areas = ref(allAreas);

// 城市下拉框的所有的值
let selectCity = ref<AreaItem[]>([]);

// 区域下拉框的所有的值
let selectArea = ref<AreaItem[]>([]);

// 分发事件给父组件
let emits = defineEmits(["change"]);

// 监听选择省
watch(
  () => provice.value,
  (val) => {
    if (val) {
      let cities = areas.value.find(
        (item) => item.code === provice.value
      )!.children;
      selectCity.value = cities;
    }
    city.value = "";
    area.value = "";
  }
);

// 监听选择城市
watch(
  () => city.value,
  (val) => {
    if (val) {
      let areaArr = selectCity.value.find((item) => item.code === city.value)!
        .children!;
      selectArea.value = areaArr;
    }
    area.value = "";
  }
);

// 监听选择区域
watch(
  () => area.value,
  (val) => {
    if (val) {
      let proviceData: Data = {
        code: provice.value,
        name: allAreas.find((item) => item.code === provice.value)!.name,
      };
      let cityData: Data = {
        code: city.value,
        name:
          city.value &&
          selectCity.value.find((item) => item.code === city.value)!.name,
      };
      let areaData: Data = {
        code: val,
        name: val && selectArea.value.find((item) => item.code === val)!.name,
      };
      emits("change", {
        proviceData,
        cityData,
        areaData,
      });
    }
  }
);
</script>
