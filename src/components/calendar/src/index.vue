<template>
  <div id="calendar">calendar</div>
</template>

<script lang="ts" setup>
import "@fullcalendar/core/vdom";
import { Calendar } from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { onMounted, ref } from "vue";

let props = defineProps({
  // 语言
  local: {
    type: String,
    default: "zh-cn",
  },
  // 试图模式
  initialView: {
    type: String,
    default: "dayGridMonth",
  },
  // 按钮文字
  buttonText: {
    type: Object,
    dafault: () => {
      return {
        today: "今天",
        month: "月",
        week: "周",
        day: "天",
        prevYear: "上一年",
        nextYear: "下一年",
        prev: "上一月",
        next: "下一月",
      };
    },
  },
  // 头部工具栏
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: "title",
        center: "",
        end: "prev today next",
      };
    },
  },
  // 底部工具栏
  footerToolbar: {
    type: Object,
    default: () => {},
  },
});
let rednerCalendar = () => {};
let calendar = ref<Calendar>();
onMounted(() => {
  let el = document.getElementById("calendar");
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      locale: props.local,
      initialView: props.initialView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
    });
    calendar.value.render();
  }
});
</script>

<style lang="scss" scoped></style>
