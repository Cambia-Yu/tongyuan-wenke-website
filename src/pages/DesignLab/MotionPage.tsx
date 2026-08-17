import { useState } from 'react'
import { MOTIONS, type MotionEntry } from '@/design-system/registry/motion'
import { CodeBlock, CopyButton } from './CodeBlock'

type CodeTab = 'react' | 'css' | 'tokens'

function MotionDetail({ entry }: { entry: MotionEntry }) {
  const [tab, setTab] = useState<CodeTab>('react')
  const Demo = entry.demo

  const code: Record<CodeTab, { text: string; lang: string }> = {
    react: { text: entry.code.react, lang: 'tsx' },
    css: { text: entry.code.css, lang: 'css' },
    tokens: { text: entry.code.tokens, lang: 'css' },
  }

  return (
    <div className="dl-detail">
      <header className="dl-detail__head">
        <div>
          <p className="dl-detail__id">{entry.id}</p>
          <h1 className="dl-detail__name">{entry.name}</h1>
        </div>
      </header>

      <dl className="dl-detail__meta">
        <div><dt>触发方式</dt><dd>{entry.trigger}</dd></div>
        <div><dt>时长</dt><dd>{entry.duration}</dd></div>
        <div><dt>缓动曲线</dt><dd><code>{entry.easing}</code></dd></div>
        <div><dt>位移 / 透明度</dt><dd>{entry.params}</dd></div>
        <div><dt>减少动态效果</dt><dd>{entry.reducedMotion}</dd></div>
      </dl>

      <section className="dl-block">
        <h2>实际预览</h2>
        <Demo />
      </section>

      <section className="dl-block">
        <div className="dl-block__bar">
          <div className="dl-segment" role="tablist" aria-label="代码类型">
            {(['react', 'css', 'tokens'] as CodeTab[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                className={`dl-segment__item ${tab === key ? 'is-active' : ''}`}
                onClick={() => setTab(key)}
              >
                {key === 'react' ? 'React' : key === 'css' ? 'CSS' : 'Tokens'}
              </button>
            ))}
          </div>
          <CopyButton text={code[tab].text} label="复制代码" />
        </div>
        <CodeBlock code={code[tab].text} lang={code[tab].lang} />
      </section>
    </div>
  )
}

export default function MotionPage({ slug }: { slug: string | null }) {
  const entry = MOTIONS.find((item) => item.slug === slug) ?? MOTIONS[0]
  return <MotionDetail entry={entry} />
}
