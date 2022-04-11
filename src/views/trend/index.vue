<template>
  <div class="trend-wrap">
    <!-- 
      <div><m-trend text="营业额" /></div>
    <div><m-trend text="销售额" type="down" /></div>
     -->
    <!-- <div><m-trend text="营业额">营业额11</m-trend></div> -->
    <m-trend
      text="营业额"
      reverseColor="true"
      upTextColor="blue"
      upIcon="CaretTop"
    ></m-trend>
    <m-trend
      text="销售额"
      reverseColor="true"
      type="down"
      downTextColor="yellow"
      downIcon="CaretBottom"
    ></m-trend>
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
