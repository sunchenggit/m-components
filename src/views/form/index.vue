<template>
  <div>
    <m-form
      ref="form"
      :options="options"
      @on-change="handleChange"
      @before-upload="beforeUpload"
      @on-remove="handleRemove"
      @on-preview="handlePreview"
      @on-exceed="handleExceed"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-error="onError"
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </template>
    </m-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  FormOptions,
  FormInstance,
} from "../../components/form/src/types/types";
interface Scope {
  form: FormInstance;
  model: any;
}

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
        trigger: "blur",
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
        trigger: "blur",
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
        trigger: "blur",
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

let form = ref();

let handleRemove = (val: any) => {
  console.log("handleRemove", val);
};
let handlePreview = (val: any) => {
  console.log("handlePreview", val);
};
let handleExceed = (val: any) => {
  console.log("handleExceed", val);
};
let beforeRemove = (val: any) => {
  console.log("beforeRemove", val);
};
let handleSuccess = (val: any) => {
  console.log("handleSuccess", val);
};
let handleChange = (val: any) => {
  console.log("handleChange", val);
};
let beforeUpload = (val: any) => {
  console.log("beforeUpload", val);
};
let onError = (val: any) => {
  console.log("onError", val);
};
let submitForm = (scope: Scope) => {
  scope.form.validate((valid: boolean) => {
    if (valid) {
      console.log(scope.model);
    } else {
      console.log(valid);
    }
  });
};
let resetForm = () => {
  form.value.restFields();
};
</script>

<style lang="scss" scoped></style>
