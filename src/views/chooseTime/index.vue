<template>
  <div>
    <m-choose-time
      @startChange="startChange"
      @endChange="endChange"
      :startOptions="startOptions"
    />
  </div>
</template>

<script lang="ts" setup>
interface endValue {
  startTime: string;
  endTime: string;
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
</script>

<tyle lang="scss" scoped></tyle>
