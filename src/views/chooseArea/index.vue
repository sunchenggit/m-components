<template>
  <m-choose-area @change="changeArea" />
</template>
<script lang="ts" setup>
let changeArea = (val) => {
  console.log(val);
};
</script>
