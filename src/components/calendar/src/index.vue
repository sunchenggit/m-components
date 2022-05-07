<template>
  <div id="calendar">calendar</div>
</template>

<script lang="ts" setup>
import "@fullcalendar/core/vdom";
import { Calendar, EventClickArg } from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interaction, { DateClickArg } from "@fullcalendar/interaction";
import { onMounted, PropType, ref, watch } from "vue";
import { EventItem } from "./types";

// 分发事件
let emits = defineEmits(["dateClick", "eventClick"]);

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
    default: () => {
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
  // 事件源
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => [],
  },
});
let rednerCalendar = () => {
  let el = document.getElementById("calendar");
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      locale: props.local,
      initialView: props.initialView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [
        {
          // 渲染日历事件
          events(e, callback) {
            if (props.events.length) callback(props.events);
            else callback([]);
          },
        },
      ],
      // 点击日历上的某一天
      dateClick(info: DateClickArg) {
        emits("dateClick", info);
      },
      // 点击日历上事件
      eventClick(info: EventClickArg) {
        emits("eventClick", info);
      },
    });
    calendar.value.render();
  }
};
let calendar = ref<Calendar>();
onMounted(() => {
  rednerCalendar();
});
// 监听父组件传递的事件源
watch(
  () => props.events,
  () => {
    rednerCalendar();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
