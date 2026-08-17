import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * 路由滚动管理：
 * - 页面跳转：瞬间回到顶部（不受全局 smooth 影响）；
 * - 带锚点的跳转：平滑滚动到目标区块；
 * - 页内锚点点击：交给浏览器原生平滑滚动。
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // 等待目标区块渲染后再定位
      const timer = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
