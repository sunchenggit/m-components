<template>
  <div class="trend">
    <div class="text">{{ text }}</div>
    <div class="icon">
      <el-icon-arrowup :style="{ color: upIconColor }" v-if="type === 'up'" />
      <el-icon-arrowdown :style="{ color: downIconColor }" v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
let props = defineProps({
  // 标记当前趋势是上升（up）还是下降（down）
  type: {
    type: String,
    default: "up",
  },
  // 趋势现实的文字
  // 1.从父组件传递过来的数据
  // 2.插槽
  text: {
    type: String,
    default: "文字",
  },
  // 上升趋势图标颜色
  upIconColor: {
    type: String,
    default: "#f5222d",
  },
  // 下降趋势图标颜色
  downIconColor: {
    type: String,
    default: "#52c41a",
  },
});
</script>
<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    mask-repeat: 4px;
  }
  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>
