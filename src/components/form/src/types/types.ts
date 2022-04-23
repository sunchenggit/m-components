import { CSSProperties } from "vue"
import { RuleItem } from "./rule"

// 可配置的表单

// 表单每一项的配置选项
export interface FormOptions {
  // 表单显示的元素
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' | 'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' | 'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' | 'transfer' | 'upload',
  // 表单项的值
  value: any,
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
}