<template>
  <div class="trend-wrap">
    <div><m-trend text="营业额" /></div>
    <div><m-trend text="销售额" type="down" /></div>
  </div>
</template>

<style lang="scss" scoped>
.trend-wrap {
  display: flex;
  align-items: center;
  > div {
    margin-right: 10px;
  }
}
</style>
