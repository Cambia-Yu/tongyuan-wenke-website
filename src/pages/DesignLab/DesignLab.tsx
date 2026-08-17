import { useMemo, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ArrowLeft, Menu, Search, X } from 'lucide-react'
import { CATEGORIES } from '@/design-system/registry/categories'
import { COMPONENTS, getComponentBySlug, getComponentsByCategory } from '@/design-system/registry/components'
import { MOTIONS } from '@/design-system/registry/motion'
import ComponentDetail, { MaturityPill } from './ComponentDetail'
import Overview from './Overview'
import MotionPage from './MotionPage'
import Patterns from './Patterns'
import { FoundationColor, FoundationLayout, FoundationMotion, FoundationRadiusShadow, FoundationTypography } from './Foundations'
import './design-lab.css'

const FOUNDATION_PAGES = [
  { slug: 'foundations-color', label: 'Color 颜色' },
  { slug: 'foundations-typography', label: 'Typography 字体' },
  { slug: 'foundations-layout', label: 'Layout 布局与间距' },
  { slug: 'foundations-radius-shadow', label: 'Radius · Shadow · Border' },
  { slug: 'foundations-motion', label: 'Motion 动效变量' },
]

export default function DesignLab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)

  const page = searchParams.get('page')
  const componentSlug = searchParams.get('component')

  const navigate = (params: Record<string, string>) => {
    setSearchParams(params)
    setNavOpen(false)
  }

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return []
    return COMPONENTS.filter(
      (entry) =>
        entry.name.toLowerCase().includes(keyword) ||
        entry.id.toLowerCase().includes(keyword) ||
        entry.slug.includes(keyword),
    )
  }, [query])

  const renderMain = () => {
    if (componentSlug) {
      const entry = getComponentBySlug(componentSlug)
      if (entry) return <ComponentDetail key={entry.slug} entry={entry} />
      return <p className="dl-empty">未找到组件「{componentSlug}」，请从左侧目录选择。</p>
    }
    switch (page) {
      case 'foundations-color': return <FoundationColor />
      case 'foundations-typography': return <FoundationTypography />
      case 'foundations-layout': return <FoundationLayout />
      case 'foundations-radius-shadow': return <FoundationRadiusShadow />
      case 'foundations-motion': return <FoundationMotion />
      case 'motion': return <MotionPage slug={searchParams.get('motion')} />
      case 'patterns': return <Patterns />
      default: return <Overview onNavigate={navigate} />
    }
  }

  const isActive = (params: Record<string, string>) => {
    if (params.component) return componentSlug === params.component
    if (params.page === 'motion') return page === 'motion' && !componentSlug
    if (params.page) return page === params.page && !componentSlug
    return !page && !componentSlug
  }

  const navLink = (params: Record<string, string>, label: string, extra?: ReactNode) => (
    <button
      key={params.component ?? (params.page ? `${params.page}-${params.motion ?? ''}` : 'overview')}
      type="button"
      className={`dl-nav__link ${isActive(params) ? 'is-active' : ''}`}
      onClick={() => navigate(params)}
    >
      <span>{label}</span>
      {extra}
    </button>
  )

  return (
    <div className="dl-shell">
      <header className="dl-topbar">
        <div className="dl-topbar__left">
          <button
            type="button"
            className="dl-topbar__menu"
            aria-label={navOpen ? '关闭目录' : '打开目录'}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((value) => !value)}
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <button type="button" className="dl-topbar__brand" onClick={() => navigate({})}>
            <span className="dl-topbar__mark">问</span>
            TYWK Design System
            <span className="dl-topbar__version">v0.1.0</span>
          </button>
        </div>
        <div className="dl-topbar__search">
          <Search size={14} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索组件名称或 ID，如 TYWK/Form/Input"
            aria-label="搜索组件"
          />
          {results.length > 0 && (
            <ul className="dl-topbar__results" role="listbox">
              {results.map((entry) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate({ component: entry.slug })
                      setQuery('')
                    }}
                  >
                    <span>{entry.name}</span>
                    <code>{entry.id}</code>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/" className="dl-topbar__back">
          <ArrowLeft size={14} aria-hidden="true" />
          返回官网
        </Link>
      </header>

      <div className="dl-body">
        <aside className={`dl-nav ${navOpen ? 'is-open' : ''}`}>
          <nav aria-label="设计系统目录">
            <p className="dl-nav__group">开始</p>
            {navLink({}, 'Overview 概览')}

            <p className="dl-nav__group">Foundations 设计基础</p>
            {FOUNDATION_PAGES.map((item) => navLink({ page: item.slug }, item.label))}

            <p className="dl-nav__group">Components 组件</p>
            {CATEGORIES.map((category) => {
              const items = getComponentsByCategory(category.slug)
              if (!items.length) return null
              return (
                <div key={category.slug}>
                  <p className="dl-nav__subgroup">{category.label}</p>
                  {items.map((item) =>
                    navLink({ component: item.slug }, item.name, <MaturityPill key="m" maturity={item.maturity} />),
                  )}
                </div>
              )
            })}

            <p className="dl-nav__group">Motion 动效</p>
            {MOTIONS.map((item) => navLink({ page: 'motion', motion: item.slug }, item.name))}

            <p className="dl-nav__group">Patterns 页面模式</p>
            {navLink({ page: 'patterns' }, '页面模式样板')}
          </nav>
        </aside>

        <main className="dl-main">{renderMain()}</main>
      </div>
    </div>
  )
}
