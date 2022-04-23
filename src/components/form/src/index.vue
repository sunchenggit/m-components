<template>
  <!-- validate-on-rule-change 不需要一进来就帮我验证 -->
  <el-form
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    label-width="100px"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="!item.children || !item.children!.length"
      >
        <component
          v-bind="item.attrs"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        />
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children!.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-bind="item.attrs"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
            :is="`el-${child.type}`"
          />
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted, watch } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { FormOptions } from "./types/types";
let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});
let model = ref<any>(null);
let rules = ref<any>({});

// 初始化表单方法
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

onMounted(() => {
  initForm();
});

// 监听父组件传递进来的 options
watch(
  () => props.options,
  () => {
    initForm();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
