import { useEffect, useState } from 'react'
import './article-rail.css'

export interface ArticleRailItem {
  label: string
  href: string
}

export interface TywkArticleRailProps {
  label?: string
  items: ArticleRailItem[]
  /** 受控模式：传入后不再自行观察页面锚点（用于工作台演示） */
  activeHref?: string
  onNavigate?: (href: string) => void
}

/**
 * TYWK/Navigation/ArticleRail — 长文章纵向悬浮导航。
 * 默认通过 IntersectionObserver 跟随页面滚动高亮当前章节；
 * 传入 activeHref 时切换为受控模式。
 */
export function ArticleRail({ label = '本文章节', items, activeHref, onNavigate }: TywkArticleRailProps) {
  const [observedHref, setObservedHref] = useState(items[0]?.href ?? '')
  const controlled = activeHref !== undefined

  useEffect(() => {
    if (controlled) return
    const sections = items
      .map((item) => document.getElementById(item.href.replace(/^#/, '')))
      .filter((section): section is HTMLElement => Boolean(section))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target.id) setObservedHref(`#${visible.target.id}`)
      },
      { rootMargin: '-18% 0px -68% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [controlled, items])

  const current = controlled ? activeHref : observedHref

  return (
    <nav aria-label={label} className="tywk-article-rail">
      <p className="tywk-article-rail__label">{label}</p>
      <ol className="tywk-article-rail__list">
        {items.map((item, index) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={current === item.href ? 'location' : undefined}
              className={`tywk-article-rail__link ${current === item.href ? 'is-active' : ''}`}
              onClick={onNavigate ? (event) => { event.preventDefault(); onNavigate(item.href) } : undefined}
            >
              <span className="tywk-article-rail__index">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
