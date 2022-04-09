<template>
  <m-choose-area @change="changeArea" />
</template>
<script lang="ts" setup>
import MChooseArea from "../../components/chooseArea/src/index.vue";
let changeArea = (val) => {
  console.log(val);
};
</script>
