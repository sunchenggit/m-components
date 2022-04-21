<template>
  <el-popover
    trigger="click"
    placement="bottom-start"
    :visible="visible"
    :width="430"
  >
    <template #reference>
      <div class="result" @click="visible = !visible">
        <div>{{ result }}</div>
        <div>
          <el-icon-arrowdown :class="{ rolate: visible }" />
        </div>
      </div>
    </template>
    <div class="container">
      <el-row class="container-action">
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="15" :offset="1">
          <el-select
            v-model="selectValue"
            filterable
            :filter-method="filterMethod"
            size="small"
            placeholder="请搜索城市"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <!-- 字母区域 -->
        <div class="city">
          <div
            class="city-item"
            @click="clickChat(item)"
            v-for="item in Object.keys(cities)"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template v-for="(value, key) in cities" :key="key">
            <el-row style="margin-bottom: 10px" :id="key">
              <el-col :span="2">{{ key }}:</el-col>
              <el-col :span="22" class="city-name">
                <div
                  @click="clickItem(item)"
                  class="city-name-item"
                  v-for="item in value"
                  :key="item.id"
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="provice">
          <div
            class="provice-item"
            v-for="item in Object.keys(provices)"
            @click="clickChat(item)"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(item, index) in Object.values(provices)"
            :key="index"
          >
            <template v-for="(item1, index1) in item" :key="index1">
              <el-row style="margin-bottom: 10px" :id="item1.id">
                <el-col :span="3">{{ item1.name }}:</el-col>
                <el-col :span="21" class="procive-name">
                  <div
                    class="procive-name-item"
                    v-for="(item2, index2) in item1.data"
                    :key="index2"
                    @click="clickProvice(item2)"
                  >
                    {{ item2 }}
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import city from "../lib/city";
import provice from "../lib/province.json";
import { City, Provice } from "./types";
let emits = defineEmits(["changeCity", "changeProvice"]);
// 最终选择的结果
let result = ref<string>("请选择");
// 控制弹出层显示
let visible = ref<boolean>(false);
// 单选框的值，按城市还是按省份
let radioValue = ref<string>("按城市");
// 下拉框的值，搜索下拉框
let selectValue = ref<string>("");
// 所有的城市数据
let cities = ref(city.cities);
// 所有省份数据
let provices = ref(provice);
// 下拉框显示城市数据
let options = ref<City[]>([]);
// 所有的城市数据
let allCity = ref<City[]>([]);

// 点击每个城市
const clickItem = (item: City) => {
  // 给结果赋值
  result.value = item.name;
  // 关闭弹出层
  visible.value = false;
  emits("changeCity", item);
};

// 点击字母区域
let clickChat = (item: string) => {
  let el = document.getElementById(item);
  // Element 接口的scrollIntoView()方法会滚动元素的父容器，使被调用scrollIntoView()的元素对用户可见。 不支持ie
  if (el) el.scrollIntoView();
};

let clickProvice = (item: string) => {
  // 给结果赋值
  result.value = item;
  // 关闭弹出层
  visible.value = false;
  emits("changeProvice", item);
};

// 自定义搜索=过滤
let filterMethod = (val: string) => {
  let values = Object.values(cities.value).flat(2);
  allCity.value = values;
  if (val === "") {
    options.value = values;
  } else {
    if (radioValue.value === "按城市") {
      // 中文和拼音一起过滤
      options.value = values.filter(
        (item) => item.name.includes(val) || item.spell.includes(val)
      );
    } else {
      options.value = values.filter((item) => item.name.includes(val));
    }
  }
};

// 下拉框选择事件
let changeSelect = (val: number) => {
  let city = allCity.value.find((item) => item.id === val)!;
  result.value = city.name;
  if (radioValue.value === "按城市") {
    emits("changeCity", city);
  } else {
    emits("changeProvice", city.name);
  }
  visible.value = false;
};

onMounted(() => {
  // 获取下拉框城市数据
  // flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。(扁平化数组)
  let values = Object.values(cities.value).flat(2);
  allCity.value = values;
  options.value = values;
});
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}
.rolate {
  transform: rotate(180deg);
}
svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  transition: all 0.25s linear;
}
.container {
  padding: 6px;
  &-action {
    font-size: 0;
  }
}
.city,
.provice {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  .city-item,
  .provice-item {
    padding: 3px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    cursor: pointer;
  }
}
.city-name,
.procive-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .city-name-item,
  .procive-name-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
}
</style>
