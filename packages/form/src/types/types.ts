import { CSSProperties } from "vue"
import { RuleItem } from "./rule"

// 可配置的表单

// 表单每一项的配置选项
export interface FormOptions {
  // 表单显示的元素
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' | 'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' | 'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' | 'transfer' | 'upload' | 'editor',
  // 表单项的值
  value?: any,
  // 表单的label
  label?: string,
  // 表单项的标识
  prop?: string,
  // 表单项的验证规则
  rules?: RuleItem[],
  // 表单项的占位符
  placeholder?: string,
  // 表单特有的属性 暂时 any 类型
  attrs?: {
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean,
    // css 样式
    style?: CSSProperties,
  },
  // 表单项的子元素
  children?: FormOptions[],
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    actions: string,
    headers?: object,
    method?: 'post' | 'put' | 'patch',
    multiple?: boolean,
    data?: any,
    name?: string,
    withDirectives?: boolean,
    showFileList?: boolean,
    drag?: boolean,
    accept?: string,
    thumbnailmode?: boolean,
    fileList?: any[],
    listType?: 'text' | 'picture' | 'picture-card',
    autoUpload?: boolean,
    disabled?: boolean,
    limit?: number,
  }
}
export interface ValidateFieldCallback {
  (message?: string, invalidFields?: ValidateFieldsError): void,
}

export interface FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void,
  deregisterLabelWidth(width: number): void,
  autoLabelWidth: string | undefined,
  emit: (evt: string, ...args: any[]) => void,
  labelSuffix: string,
  inline?: boolean,
  model?: Record<string, unknown>,
  size?: string,
  showMessage?: boolean,
  labelPosition?: string,
  labelWidth?: string,
  rules?: Record<string, unknown>,
  statusIcon?: boolean,
  hideRequiredAsterisk?: boolean,
  disabled?: boolean,
  validate: (callback?: Callback) => Promise<boolean>,
  resetFields: () => void,
  clearValidate: (props?: string | string[]) => void,
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void,
}