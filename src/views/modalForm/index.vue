<template>
  <div>
    <el-button type="primary" @click="handleOpen">open</el-button>
    <m-modal-form
      v-model:visible="visible"
      title="编辑用户"
      width="40%"
      :options="options"
      :on-error="onError"
      isScroll
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #footer="{ form }">
        <span class="dialog-footer">
          <el-button @click="cancel(form)">取消</el-button>
          <el-button type="primary" @click="confirm(form)">确认</el-button>
        </span>
      </template>
    </m-modal-form>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import {
  FormOptions,
  FormInstance,
} from "../../components/form/src/types/types";
let visible = ref<boolean>(false);
let handleOpen = () => {
  visible.value = true;
};
let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    placeholder: "请输入用户名",
    prop: "username",
    rules: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
      {
        min: 2,
        max: 6,
        message: "用户名在2-6之间",
        trigger: "blur",
      },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: "input",
    value: "",
    label: "密码",
    placeholder: "请输入密码",
    prop: "password",
    rules: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
      {
        min: 6,
        max: 15,
        message: "密码在6-15之间",
        trigger: "blur",
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: "select",
    value: "",
    prop: "role",
    placeholder: "请选择职位",
    label: "职位",
    attrs: {
      style: {
        width: "100%",
      },
    },
    rules: [
      {
        required: true,
        message: "职位不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "option",
        label: "经理",
        value: "1",
      },
      {
        type: "option",
        label: "组长",
        value: "2",
      },
      {
        type: "option",
        label: "员工",
        value: "3",
      },
    ],
  },
  {
    type: "checkbox-group",
    value: [],
    prop: "like",
    label: "爱好",
    rules: [
      {
        required: true,
        message: "爱好不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "checkbox",
        label: "足球",
        value: "1",
      },
      {
        type: "checkbox",
        label: "蓝球",
        value: "2",
      },
      {
        type: "checkbox",
        label: "排球",
        value: "3",
      },
    ],
  },
  {
    type: "radio-group",
    value: "",
    prop: "gender",
    label: "性别",
    rules: [
      {
        required: true,
        message: "性别不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "radio",
        label: "男",
        value: "male",
      },
      {
        type: "radio",
        label: "女",
        value: "female",
      },
      {
        type: "radio",
        label: "保密",
        value: "not",
      },
    ],
  },
  {
    type: "upload",
    label: "上传",
    prop: "pic",
    uploadAttrs: {
      actions: "https://jsonplaceholder.typicode.com/posts/",
      multiple: true,
      limit: 3,
    },
    // rules: [
    //   {
    //     required: true,
    //     message: "上传不能为空",
    //     trigger: "blur",
    //   },
    // ],
  },
  {
    type: "editor",
    value: "",
    prop: "desc",
    label: "描述",
    placeholder: "请输入描述",
    rules: [
      {
        required: true,
        message: "描述不能为空",
        trigger: "blur",
      },
    ],
  },
];

// 点击取消
let cancel = (form: any) => {
  form.restFields();
  visible.value = false;
};
// 点击确认
let confirm = (form: any) => {
  let validate = form.validate();
  let model = form.getFormData();
  // 表单验证
  validate((valid: boolean) => {
    if (valid) {
      ElMessage.success("验证成功!");
      console.log(model);
    } else {
      ElMessage.success("验证失败!");
    }
  });
};
let onError = (err) => {
  console.log(1, err);
};
</script>

<style lang="scss" scoped></style>
