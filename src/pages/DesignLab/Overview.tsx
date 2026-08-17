import { CATEGORIES } from '@/design-system/registry/categories'
import { COMPONENTS, getComponentsByCategory } from '@/design-system/registry/components'
import { MOTIONS } from '@/design-system/registry/motion'
import { MaturityPill } from './ComponentDetail'

const FOUNDATION_LINKS = [
  { slug: 'foundations-color', label: 'Color 颜色' },
  { slug: 'foundations-typography', label: 'Typography 字体' },
  { slug: 'foundations-layout', label: 'Layout 布局与间距' },
  { slug: 'foundations-radius-shadow', label: 'Radius · Shadow · Border' },
  { slug: 'foundations-motion', label: 'Motion 动效变量' },
]

export default function Overview({ onNavigate }: { onNavigate: (params: Record<string, string>) => void }) {
  const stableCount = COMPONENTS.filter((entry) => entry.maturity === 'stable').length
  const latestUpdate = COMPONENTS.map((entry) => entry.updatedAt).sort().at(-1) ?? '—'

  return (
    <div className="dl-overview">
      <header className="dl-foundation__head">
        <h1>通元问科设计系统工作台</h1>
        <p>
          官网、后台与后续产品共用的视觉与交互标准库。这里展示的每个组件都是真实渲染、可复制源码的实现，
          其他 AI 可以按组件 ID 在仓库中直接查找和使用。
        </p>
      </header>

      <dl className="dl-overview__stats">
        <div><dt>版本</dt><dd>v0.1.0</dd></div>
        <div><dt>组件数量</dt><dd>{COMPONENTS.length}</dd></div>
        <div><dt>稳定组件</dt><dd>{stableCount}</dd></div>
        <div><dt>动效样板</dt><dd>{MOTIONS.length}</dd></div>
        <div><dt>最近更新</dt><dd>{latestUpdate}</dd></div>
      </dl>

      <section className="dl-block">
        <h2>Foundations 设计基础</h2>
        <ul className="dl-link-list">
          {FOUNDATION_LINKS.map((item) => (
            <li key={item.slug}>
              <button type="button" onClick={() => onNavigate({ page: item.slug })}>{item.label}</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="dl-block">
        <h2>Components 组件</h2>
        <div className="dl-overview__categories">
          {CATEGORIES.map((category) => {
            const items = getComponentsByCategory(category.slug)
            if (!items.length) return null
            return (
              <div key={category.slug} className="dl-overview__category">
                <h3>{category.label}</h3>
                <p>{category.description}</p>
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      <button type="button" onClick={() => onNavigate({ component: item.slug })}>
                        <span>{item.name}</span>
                        <MaturityPill maturity={item.maturity} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="dl-block">
        <h2>使用约定</h2>
        <ul className="dl-prose-list">
          <li>组件 ID 形如 <code>TYWK/Action/Button/Primary</code>，跨版本不变，可直接告诉其他 AI 使用。</li>
          <li>只有 <strong>Stable</strong> 状态的组件允许进入正式官网页面。</li>
          <li>组件源码与规范入口见仓库根目录 <code>DESIGN_SYSTEM.md</code>。</li>
          <li>新增组件必须先在 Registry（<code>src/design-system/registry/components.tsx</code>）登记。</li>
        </ul>
      </section>
    </div>
  )
}
