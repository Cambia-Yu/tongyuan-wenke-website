import { Link, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import { PROTOTYPES } from '@/data/prototypes'

/**
 * 交付档案 · 文章页
 * 每套系统一篇"对外展示文章"：业务问题、系统方案、生产指标、架构、集成部署。
 * 后续替换为真实文章时，只需扩充 data/prototypes.ts 或接入内容源。
 */
export default function PrototypeArticle() {
  const { id } = useParams()
  const index = PROTOTYPES.findIndex((p) => p.id === id)
  const p = index >= 0 ? PROTOTYPES[index] : null

  if (!p) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="mx-auto max-w-[768px] px-4 pb-24 pt-40 text-center">
          <h1 className="text-xl font-medium text-label-primary">没有找到这套系统的档案</h1>
          <Link to="/prototypes" className="mt-6 inline-flex items-center gap-1.5 text-sm text-label-secondary hover:text-label-primary">
            <ArrowLeft size={15} />
            返回交付系统档案
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const prev = index > 0 ? PROTOTYPES[index - 1] : null
  const next = index < PROTOTYPES.length - 1 ? PROTOTYPES[index + 1] : null

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <article className="mx-auto max-w-[768px] px-4 pb-24 pt-16 lg:pt-24">
        <Link
          to="/prototypes"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-label-tertiary transition-colors hover:text-label-primary"
        >
          <ArrowLeft size={15} />
          交付系统档案
        </Link>

        {/* 文章头 */}
        <header className="mt-8">
          <p className="text-xs text-label-tertiary">
            {p.domain === 'supply' ? '供应链管理' : '制造业'} · {p.status}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-snug text-label-primary sm:text-4xl">
            {p.name}
          </h1>
          <p className="mt-4 text-base leading-7 text-label-secondary">{p.plain}</p>
        </header>

        {/* 界面示意（线框图，非真实截图） */}
        {p.image && (
          <figure className="mt-10">
            <div className="overflow-hidden rounded-xl border border-separator bg-white">
              <img src={p.image} alt={`${p.name}界面示意`} className="w-full object-cover" />
            </div>
            <figcaption className="mt-2 text-xs text-label-quaternary">界面示意图</figcaption>
          </figure>
        )}

        {/* 生产指标 */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[rgba(0,0,0,0.13)]">
          {p.metrics.map((m) => (
            <div key={m.label} className="bg-white p-6">
              <div className="text-2xl font-semibold tabular-nums tracking-tight text-label-primary">{m.value}</div>
              <div className="mt-1 text-sm text-label-tertiary">{m.label}</div>
            </div>
          ))}
        </div>

        {/* 正文 */}
        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-xl font-medium text-label-primary">业务问题</h2>
            <p className="mt-4 text-base leading-7 text-label-secondary">{p.pain}</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-label-primary">系统怎么解决</h2>
            <p className="mt-4 text-base leading-7 text-label-secondary">{p.solution}</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-label-primary">系统架构</h2>
            <div className="mt-5 space-y-2">
              {p.arch.map((a) => (
                <div key={a.layer} className="grid grid-cols-[72px_1fr] items-baseline gap-4 rounded-xl bg-fill-1 px-4 py-3.5">
                  <span className="text-sm font-medium text-label-primary">{a.layer}</span>
                  <span className="text-sm leading-6 text-label-secondary">{a.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-label-primary">接入与部署</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-label-primary">接入的系统</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.integrations.map((s) => (
                    <span key={s} className="rounded-lg bg-fill-1 px-2.5 py-1 text-sm text-label-secondary">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-label-primary">部署方式</h3>
                <p className="mt-3 text-sm leading-6 text-label-secondary">{p.deployment}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-label-primary">核心能力</h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {p.capabilities.map((c) => (
                <li key={c} className="text-sm leading-6 text-label-secondary">
                  · {c}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 文末邀约 */}
        <div className="mt-16 rounded-xl bg-fill-1 p-6">
          <h2 className="text-base font-medium text-label-primary">业务适用性</h2>
          <p className="mt-2 text-sm leading-6 text-label-secondary">
            请提供业务流程、问题样例、现有系统与数据条件，用于评估适用范围。
          </p>
          <a
            href="/#contact"
            className="mt-4 inline-flex h-8 items-center rounded-[10px] bg-[rgba(0,0,0,0.9)] px-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[rgba(37,37,37,1)] focus-ring"
          >
            预约一次对话
          </a>
        </div>

        {/* 上一篇 / 下一篇 */}
        <nav className="mt-12 grid gap-4 border-t border-separator pt-8 sm:grid-cols-2" aria-label="继续阅读">
          {prev ? (
            <Link to={`/prototypes/${prev.id}`} className="group text-left">
              <span className="text-xs text-label-quaternary">上一套系统</span>
              <span className="mt-1 block text-sm font-medium text-label-secondary transition-colors group-hover:text-label-primary">
                {prev.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/prototypes/${next.id}`} className="group text-left sm:text-right">
              <span className="text-xs text-label-quaternary">下一套系统</span>
              <span className="mt-1 block text-sm font-medium text-label-secondary transition-colors group-hover:text-label-primary">
                {next.name}
              </span>
            </Link>
          )}
        </nav>
      </article>

      <Footer />
    </div>
  )
}
