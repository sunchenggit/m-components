<template>
  <div>
    <m-choose-time
      @startChange="startChange"
      @endChange="endChange"
      :startOptions="startOptions"
    />
    <m-choose-date
      @startChange="dateStartChange"
      @endChange="dateEndChange"
      :disabledToday="false"
      :startOptions="startOptions"
    />
  </div>
</template>

<script lang="ts" setup>
interface endValue {
  startTime: string;
  endTime: string;
}

interface dateEndValue {
  startDate: Date;
  endDate: Date;
}
let startChange = (val: string) => {
  console.log("start", val);
};
let endChange = (val: endValue) => {
  console.log("end", val);
};

let startOptions = {
  size: "small",
  clearable: false,
};

let dateStartChange = (val: string) => {
  console.log("start", val);
};
let dateEndChange = (val: dateEndValue) => {
  console.log("end", val);
};
</script>

<tyle lang="scss" scoped></tyle>
