<template>
  <div class="trend">
    <div class="text">
      <slot v-if="slots.default"></slot>
      <div v-else>{{ text }}</div>
    </div>
    <div class="icon">
      <el-icon-arrowup
        :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
        v-if="type === 'up'"
      />
      <el-icon-arrowdown
        :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"
        v-else
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSlots } from "vue";
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
  // 颜色翻转，只在默认的颜色下生效没如果使用了自定义颜色，这个属性就不生效了
  reverseColor: {
    type: Boolean,
    default: false,
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
let slots = useSlots();
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
