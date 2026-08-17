import type { CategoryEntry } from './types'

/** 设计系统分类；顺序即工作台左侧导航顺序 */
export const CATEGORIES: CategoryEntry[] = [
  { slug: 'actions', label: 'Actions 操作', description: '按钮、链接等触发行为的元素' },
  { slug: 'forms', label: 'Forms 表单', description: '输入、选择与确认控件，与咨询表单共用' },
  { slug: 'status', label: 'Status 状态与来源', description: '状态、验证与证据来源标记' },
  { slug: 'navigation', label: 'Navigation 导航', description: '站点与文章内导航' },
  { slug: 'feedback', label: 'Feedback 反馈', description: '加载、成功、错误等结果反馈' },
]
