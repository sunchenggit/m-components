export interface MenuItem {
  // 导航的图标
  icon?: string;
  // 处理后的图标
  i?: any;
  // 导航的名字
  name: string;
  // 导航的标识
  index: string;
  // 导航的子导航
  children?: MenuItem[]
}