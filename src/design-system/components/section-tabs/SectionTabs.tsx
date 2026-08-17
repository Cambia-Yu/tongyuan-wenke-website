import { useEffect, useState } from 'react'
import './section-tabs.css'

export interface SectionTabItem {
  label: string
  href: string
}

export interface TywkSectionTabsProps {
  label?: string
  items: SectionTabItem[]
  /** 受控模式用于工作台预览；官网默认跟随章节滚动 */
  activeHref?: string
  onNavigate?: (href: string) => void
}

/**
 * TYWK/Navigation/SectionTabs — 同一页面内的横向章节导航。
 * 适用于栏目型页面；长文章使用 ArticleRail。
 */
export function SectionTabs({ label = '本页内容', items, activeHref, onNavigate }: TywkSectionTabsProps) {
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
    <nav aria-label={label} className="tywk-section-tabs">
      <div className="tywk-section-tabs__viewport">
        <div className="tywk-section-tabs__track">
          <span className="tywk-section-tabs__label">{label}</span>
          <ol className="tywk-section-tabs__list">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current === item.href ? 'location' : undefined}
                  className={`tywk-section-tabs__link ${current === item.href ? 'is-active' : ''}`}
                  onClick={onNavigate ? (event) => { event.preventDefault(); onNavigate(item.href) } : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  )
}
