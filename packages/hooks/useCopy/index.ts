import { ElMessage } from "element-plus"
// 复制文本
export const useCopy = (text:string) => {
  // 创建输入框
  let input = document.createElement('input')
  // 给输入框value赋值
  input.value = `<${text} />`
  // 追加到body中
  document.body.appendChild(input)
  // 选择输入框的操作
  input.select()
  // 执行复制操作
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage.success('复制成功！')
}