<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <el-time-select
        v-model="startTime"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :step="startTimeStep"
        :end="startTimeEnd"
        v-bind="$attrs.startOptions"
      />
    </div>
    <div>
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :step="endTimeStep"
        :end="endTimeEnd"
        :disabled="endTimeDisabled"
        v-bind="$attrs.endOptions"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
let emits = defineEmits(["startChange", "endChange"]);
let props = defineProps({
  // 开始时间的占位符
  startPlaceholder: {
    type: String,
    default: "请选择开始时间",
  },
  // 开始时间的开始选择
  startTimeStart: {
    type: String,
    default: "8:00",
  },
  // 开始时间的步进
  startTimeStep: {
    type: String,
    default: "00:30",
  },
  // 开始时间的结束选择
  startTimeEnd: {
    type: String,
    default: "24:00",
  },
  // 结束时间的占位符
  endPlaceholder: {
    type: String,
    default: "请选择结束时间",
  },
  // 结束时间的开始选择
  endTimeStart: {
    type: String,
    default: "8:00",
  },
  // 结束时间的步进
  endTimeStep: {
    type: String,
    default: "00:30",
  },
  // 结束时间的结束选择
  endTimeEnd: {
    type: String,
    default: "24:00",
  },
});
// 开始时间
let startTime = ref<string>("");
// 结束时间
let endTime = ref<string>("");
// 是否禁用开始时间
let endTimeDisabled = ref<boolean>(true);

// 监听开始时间的变化
watch(
  () => startTime.value,
  (val) => {
    if (val === "") {
      endTime.value = "";
      endTimeDisabled.value = true;
    } else {
      endTimeDisabled.value = false;
      // 给父组件分发事件
      emits("startChange", val);
    }
  }
);

// 监听结束时间的变化
watch(
  () => endTime.value,
  (val) => {
    if (val !== "") {
      emits("endChange", {
        startTime: startTime.value,
        endTime: val,
      });
    }
  }
);
</script>

<tyle lang="scss" scoped></tyle>
