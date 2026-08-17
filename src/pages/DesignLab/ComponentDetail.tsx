import { useState } from 'react'
import { MATURITY_LABEL, type ComponentEntry, type Maturity } from '@/design-system/registry/types'
import { COMPONENTS } from '@/design-system/registry/components'
import { CodeBlock, CopyButton } from './CodeBlock'

type Viewport = 'desktop' | 'tablet' | 'mobile'
type CodeTab = 'react' | 'css' | 'usage' | 'tokens'

const VIEWPORT_WIDTH: Record<Viewport, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
}

const CODE_TAB_LABEL: Record<CodeTab, string> = {
  react: 'React',
  css: 'CSS',
  usage: 'Usage',
  tokens: 'Tokens',
}

function MaturityPill({ maturity }: { maturity: Maturity }) {
  return <span className={`dl-maturity dl-maturity--${maturity}`}>{MATURITY_LABEL[maturity]}</span>
}

export { MaturityPill }

export default function ComponentDetail({ entry }: { entry: ComponentEntry }) {
  const [props, setProps] = useState<Record<string, string>>(entry.defaultProps)
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [tab, setTab] = useState<CodeTab>('react')

  const related = entry.related
    .map((id) => COMPONENTS.find((item) => item.id === id))
    .filter((item): item is ComponentEntry => Boolean(item))

  const code: Record<CodeTab, { text: string; lang: string } | null> = {
    react: { text: entry.code.react, lang: 'tsx' },
    css: { text: entry.code.css, lang: 'css' },
    usage: { text: entry.code.usage, lang: 'tsx' },
    tokens: entry.code.tokens ? { text: entry.code.tokens, lang: 'css' } : null,
  }

  return (
    <div className="dl-detail">
      <header className="dl-detail__head">
        <div>
          <p className="dl-detail__id">{entry.id}</p>
          <h1 className="dl-detail__name">{entry.name}</h1>
          <p className="dl-detail__desc">{entry.description}</p>
        </div>
        <MaturityPill maturity={entry.maturity} />
      </header>

      <dl className="dl-detail__meta">
        <div>
          <dt>源码位置</dt>
          <dd><code>{entry.sourcePath}</code></dd>
        </div>
        <div>
          <dt>最近更新</dt>
          <dd>{entry.updatedAt}</dd>
        </div>
        <div>
          <dt>依赖组件</dt>
          <dd>{entry.dependencies.length ? entry.dependencies.join('、') : '无'}</dd>
        </div>
      </dl>

      {/* 预览 */}
      <section className="dl-block">
        <div className="dl-block__bar">
          <h2>预览</h2>
          <div className="dl-segment" role="group" aria-label="预览宽度">
            {(['desktop', 'tablet', 'mobile'] as Viewport[]).map((item) => (
              <button
                key={item}
                type="button"
                className={`dl-segment__item ${viewport === item ? 'is-active' : ''}`}
                onClick={() => setViewport(item)}
              >
                {item === 'desktop' ? '桌面端' : item === 'tablet' ? '平板' : '移动端'}
              </button>
            ))}
          </div>
        </div>

        {entry.controls.length > 0 && (
          <div className="dl-controls">
            {entry.controls.map((control) => (
              <div key={control.name} className="dl-controls__group">
                <span className="dl-controls__label">{control.label}</span>
                <div className="dl-segment">
                  {control.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`dl-segment__item ${props[control.name] === option.value ? 'is-active' : ''}`}
                      onClick={() => setProps((prev) => ({ ...prev, [control.name]: option.value }))}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="dl-preview">
          <div className="dl-preview__frame" style={{ maxWidth: VIEWPORT_WIDTH[viewport] }}>
            {entry.render(props)}
          </div>
        </div>
        <p className="dl-note">悬浮（Hover）与焦点（Focus）状态请直接在预览上交互体验；禁用与加载态通过上方「状态」切换。</p>
      </section>

      {/* 代码 */}
      <section className="dl-block">
        <div className="dl-block__bar">
          <div className="dl-segment" role="tablist" aria-label="代码类型">
            {(Object.keys(CODE_TAB_LABEL) as CodeTab[])
              .filter((key) => code[key])
              .map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  className={`dl-segment__item ${tab === key ? 'is-active' : ''}`}
                  onClick={() => setTab(key)}
                >
                  {CODE_TAB_LABEL[key]}
                </button>
              ))}
          </div>
          <CopyButton text={code[tab]?.text ?? ''} label="复制代码" />
        </div>
        <CodeBlock code={code[tab]?.text ?? ''} lang={code[tab]?.lang ?? 'tsx'} />
        <p className="dl-note">代码面板展示的是与上方预览相同的真实源码（构建期 raw 导入），两者不会失去同步。</p>
      </section>

      {/* 场景 */}
      <section className="dl-block dl-scenarios">
        <div>
          <h2>适用场景</h2>
          <ul>{entry.usage.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h2>不适用场景</h2>
          <ul>{entry.avoid.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="dl-block">
        <h2>无障碍</h2>
        <p className="dl-prose">{entry.a11y}</p>
      </section>

      {related.length > 0 && (
        <section className="dl-block">
          <h2>相关组件</h2>
          <ul className="dl-related">
            {related.map((item) => (
              <li key={item.id}>
                <a href={`/design-lab?component=${item.slug}`}>
                  <strong>{item.name}</strong>
                  <code>{item.id}</code>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
