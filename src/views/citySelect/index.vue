<template>
  <div>
    <m-city-select
      @changeCity="hanldeChooseCity"
      @changeProvice="hanldeChooseProvice"
    />
  </div>
</template>

<script lang="ts" setup>
import { City } from "../../components/citySelect/src/types";
let hanldeChooseCity = (item: City) => {
  console.log(item);
};
let hanldeChooseProvice = (item: string) => {
  console.log(item);
};
</script>

<tyle lang="scss" scoped></tyle>
