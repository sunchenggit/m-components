<template>
  <el-container>
    <el-aside width="auto">
      <nav-slide v-model:collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NavSlide from "./navSlide/index.vue";
import NavHeader from "./navHeader/index.vue";
let isCollapse = ref(false);
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #ccc;
}
</style>
