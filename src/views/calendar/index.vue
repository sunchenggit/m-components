<template>
  <div>
    <m-calendar
      :events="events"
      @dateClick="dateClick"
      @eventClick="eventClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { EventClickArg } from "@fullcalendar/common";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventItem } from "../../components/calendar/src/types";
import { ref } from "vue";

let events = ref<EventItem[]>([
  {
    title: "五一劳动节",
    start: "2022-05-01 08:00",
    end: "202-05-01 10:00",
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
</script>

<style lang="scss" scoped></style>
