<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script lang="ts" setup>
let props = defineProps<{
  collapse: boolean;
}>();
let emits = defineEmits(["update:collapse"]);
let toggle = () => {
  // 需要修改父组件的值
  emits("update:collapse", !props.collapse);
};
</script>
<style lang="scss">
.header {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>
