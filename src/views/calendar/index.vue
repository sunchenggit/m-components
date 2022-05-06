<template>
  <div>
    <m-calendar
      :events="events"
      displayEventEnd
      :eventContent="eventContent"
      @dateClick="dateClick"
      @eventClick="eventClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventItem } from "../../components/calendar/src/types";
import { ref } from "vue";

let events = ref<EventItem[]>([
  {
    title: "五一劳动节",
    start: "2022-05-01 08:00",
    end: "2022-05-01 10:00",
    editable: true,
  },
  {
    title: "学习敲代码",
    start: "2022-05-08 10:00",
    end: "2022-05-08 12:00",
  },
]);
let dateClick = (info: DateClickArg) => {
  events.value.push({
    start: info.dateStr + " 12:00",
    end: info.dateStr + " 18:00",
    title: "学习",
  });
  console.log(info);
};
let eventClick = (info: EventClickArg) => {
  console.log(info);
};
let eventContent = (arg: EventContentArg) => {
  let el = document.createElement("div");
  let timeTextArr = arg.timeText.split("-");
  let start = timeTextArr[0]
    .replace("上午", "")
    .replace("下午", "")
    .replace("时", "");
  let end = timeTextArr[1]
    .replace("上午", "")
    .replace("下午", "")
    .replace("时", "");
  el.innerHTML = `
    <div>开始时间：${start}</div>
    <div>结束时间：${end}</div>
    <div>标题：${arg.event._def.title}</div>
  `;
  return {
    domNodes: [el],
  };
};
</script>

<style lang="scss" scoped></style>
