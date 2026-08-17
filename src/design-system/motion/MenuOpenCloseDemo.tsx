import { useState } from 'react'
import { Button } from '../components/button/Button'
import './motion-demos.css'

/**
 * TYWK/Motion/MenuOpenClose — 菜单开合动效样板。
 * 面板 200ms 内从不透明度 0、上移 4px、缩放 0.98 回到原位；
 * 同一时刻只存在一个浮层，关闭时立即移除焦点目标。
 */
export function MenuOpenCloseDemo() {
  const [open, setOpen] = useState(true)

  return (
    <div className="tywk-motion-demo">
      <Button variant="secondary" size="md" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {open ? '关闭菜单' : '打开菜单'}
      </Button>
      <div className="tywk-menu-demo__panel tywk-motion-safe" data-open={open} role="menu" aria-hidden={!open}>
        <button className="tywk-menu-demo__item" role="menuitem" tabIndex={open ? 0 : -1}>供应链计划与异常协同</button>
        <button className="tywk-menu-demo__item" role="menuitem" tabIndex={open ? 0 : -1}>制造质量与设备决策</button>
        <button className="tywk-menu-demo__item" role="menuitem" tabIndex={open ? 0 : -1}>企业知识与经验复用</button>
      </div>
    </div>
  )
}
