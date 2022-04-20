<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <el-date-picker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        :disabledDate="startDisabledDate"
        v-bind="$attrs.startOptions"
      ></el-date-picker>
    </div>
    <div>
      <el-date-picker
        v-model="endDate"
        type="date"
        :placeholder="endPlaceholder"
        :disabled="endDateDisabled"
        :disabledDate="endDisabledDate"
        v-bind="$attrs.endOptions"
      ></el-date-picker>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
let emits = defineEmits(["startChange", "endChange"]);

let props = defineProps({
  startPlaceholder: {
    tyep: String,
    default: "请选择开始日期",
  },
  endPlaceholder: {
    tyep: String,
    default: "请选择结束日期",
  },
  disabledToday: {
    type: Boolean,
    default: true,
  },
});

// 开始时间
let startDate = ref<Date | string>("");
// 结束时间
let endDate = ref<Date | string>("");
// 控制结束日期的禁用状态
let endDateDisabled = ref<boolean>(true);
// 禁用开始日期的函数
let startDisabledDate = (time: Date) => {
  if (props.disabledToday) {
    return time.getTime() < Date.now() - 100 * 60 * 60 * 24;
  }
};

// 禁用结束日期的函数
let endDisabledDate = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24;
  }
};

// 监听开始日期变化
watch(
  () => startDate.value,
  (val) => {
    if (val === "") {
      endDate.value = "";
      endDateDisabled.value = true;
    } else {
      emits("startChange", val);
      endDateDisabled.value = false;
    }
  }
);
// 监听结束日期变化
watch(
  () => endDate.value,
  (val) => {
    if (val) {
      emits("endChange", {
        startDate: startDate.value,
        endDate: val,
      });
    }
  }
);
</script>

<style lang="scss" scoped></style>
