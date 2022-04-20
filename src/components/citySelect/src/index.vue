<template>
  <div class="result" ref="buttonRef" v-click-outside="onClickOutside">
    <div>{{ result }}</div>
    <div>
      <el-icon-arrowdown />
    </div>
  </div>
  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    virtual-triggering
    placement="bottom-start"
    :visible="visible"
    :width="430"
  >
    <div class="container">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="15" :offset="1">
          <el-select
            v-model="selectValue"
            filterable
            placeholder="Select"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, unref } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
const popoverRef = ref();
const buttonRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
let result = ref<string>("请选择");
let visible = ref<boolean>(false);
let radioValue = ref<string>("按城市");
let selectValue = ref<string>("");
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}
svg {
  width: 1em;
  height: 1em;
}
.container {
  padding: 6px;
  font-size: 0;
}
</style>
