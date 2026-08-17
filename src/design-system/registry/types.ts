/**
 * 通元问科设计系统 · Registry 类型定义
 * 其他 AI 使用组件前先读取 src/design-system/registry/components.tsx
 */

import type { ReactNode } from 'react'

export type Maturity = 'draft' | 'review' | 'stable' | 'deprecated'

export const MATURITY_LABEL: Record<Maturity, string> = {
  draft: 'Draft 草稿',
  review: 'Review 评审',
  stable: 'Stable 稳定',
  deprecated: 'Deprecated 废弃',
}

export interface ControlOption {
  value: string
  label: string
}

export interface ControlDef {
  /** 控制项名称，对应 render props 的键 */
  name: string
  label: string
  options: ControlOption[]
}

export interface ComponentCode {
  /** 组件 React 源码（?raw 导入，与预览同一实现） */
  react: string
  /** 组件样式源码 */
  css: string
  /** 使用示例 */
  usage: string
  /** 相关 Tokens（可选） */
  tokens?: string
}

export interface ComponentEntry {
  /** 稳定 ID，如 TYWK/Action/Button/Primary，跨版本不变 */
  id: string
  /** URL slug，如 button-primary → /design-lab?component=button-primary */
  slug: string
  /** 中文正式名称 */
  name: string
  /** 所属分类 slug（见 categories.ts） */
  category: string
  maturity: Maturity
  /** 一句话说明 */
  description: string
  /** 适用场景 */
  usage: string[]
  /** 不适用场景 */
  avoid: string[]
  /** 源码文件路径（仓库相对路径） */
  sourcePath: string
  /** 依赖的其他组件 ID */
  dependencies: string[]
  /** 无障碍说明 */
  a11y: string
  /** 相关组件 ID */
  related: string[]
  /** 最近更新时间 YYYY-MM-DD */
  updatedAt: string
  /** 预览控制项（variant / size / state） */
  controls: ControlDef[]
  /** 默认控制值 */
  defaultProps: Record<string, string>
  /** 按控制值渲染真实组件 */
  render: (props: Record<string, string>) => ReactNode
  /** 代码面板内容 */
  code: ComponentCode
}

export interface CategoryEntry {
  slug: string
  label: string
  description: string
}
