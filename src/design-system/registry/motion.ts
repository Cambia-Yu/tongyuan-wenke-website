/**
 * 通元问科设计系统 · 动效 Registry
 * 每个动效有名称、用途、参数与真实代码。
 */

import type { ComponentType } from 'react'
import { ContentEnterDemo } from '../motion/ContentEnterDemo'
import { MenuOpenCloseDemo } from '../motion/MenuOpenCloseDemo'

import menuDemoSource from '../motion/MenuOpenCloseDemo.tsx?raw'
import enterDemoSource from '../motion/ContentEnterDemo.tsx?raw'
import motionCss from '../motion/motion-demos.css?raw'
import tokensCss from '../foundations/tokens.css?raw'

export interface MotionEntry {
  id: string
  slug: string
  name: string
  /** 触发方式 */
  trigger: string
  /** 时长 */
  duration: string
  /** 缓动曲线 */
  easing: string
  /** 位移 / 透明度参数 */
  params: string
  /** 减少动态效果时的处理 */
  reducedMotion: string
  demo: ComponentType
  code: { react: string; css: string; tokens: string }
}

export const MOTIONS: MotionEntry[] = [
  {
    id: 'TYWK/Motion/MenuOpenClose',
    slug: 'menu-open-close',
    name: '菜单开合 Menu Open / Close',
    trigger: '点击触发按钮（aria-expanded），同一时刻只允许一个浮层',
    duration: '200ms（--tywk-motion-fast）',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)（--tywk-ease-standard）',
    params: '透明度 0→1；纵向位移 -4px→0；缩放 0.98→1',
    reducedMotion: 'prefers-reduced-motion 下降级为瞬时显示/隐藏，无位移与缩放',
    demo: MenuOpenCloseDemo,
    code: { react: menuDemoSource, css: motionCss, tokens: tokensCss },
  },
  {
    id: 'TYWK/Motion/ContentEnter',
    slug: 'content-enter',
    name: '内容进入 Content Enter',
    trigger: '内容首次进入视口或状态替换后，只播放一次',
    duration: '560ms（--tywk-motion-slow）',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)（--tywk-ease-standard）',
    params: '透明度 0→1；上移 12px（--tywk-motion-distance）；多元素依次延迟 80ms',
    reducedMotion: 'prefers-reduced-motion 下直接呈现最终状态，无透明度与位移动画',
    demo: ContentEnterDemo,
    code: { react: enterDemoSource, css: motionCss, tokens: tokensCss },
  },
]
