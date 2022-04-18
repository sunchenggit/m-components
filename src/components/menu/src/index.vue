<template>
  <!-- v-bind="$attrs" 把父组件传经来的剩余属性一次性注入到下面组件里 -->
  <el-menu
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
    class="el-menu-vertical-demo"
  >
    <template v-for="(item, i) in data" :key="i">
      <el-menu-item
        v-if="!item[children] || item[children].length <= 0"
        :index="item.index"
      >
        <component
          v-if="item[icon]"
          :is="`el-icon-${toLine(item[icon])}`"
        ></component>
        <span>{{ item[name] }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="item[index]">
        <template #title>
          <component
            v-if="item[icon]"
            :is="`el-icon-${toLine(item[icon])}`"
          ></component>
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item[children]"
          :index="item1[index]"
        >
          <component
            v-if="item1[icon]"
            :is="`el-icon-${toLine(item1[icon])}`"
          ></component>
          <span>{{ item1[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { toLine } from "../../../utils/index";

let props = defineProps({
  // 导航菜单的数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: "",
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },
  // 键名 -> 菜单标题的键名
  name: {
    type: String,
    default: "name",
  },
  // 键名 -> 菜单表示的键名
  index: {
    type: String,
    default: "index",
  },
  // 键名 -> 菜单图标的键名
  icon: {
    type: String,
    default: "icon",
  },
  // 键名 -> 子菜单的键名
  children: {
    type: String,
    default: "children",
  },
});
</script>

<style lang="scss" scoped>
svg {
  margin-right: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
