import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import Reveal from '@/components/site/Reveal'
import { DOMAINS, PROTOTYPES, type Domain } from '@/data/prototypes'

export default function Prototypes() {
  const [params, setParams] = useSearchParams()
  const domain = (params.get('domain') as Domain | null) ?? 'all'

  const list = useMemo(
    () => (domain === 'all' ? PROTOTYPES : PROTOTYPES.filter((p) => p.domain === domain)),
    [domain],
  )

  const setDomain = (d: Domain | 'all') => {
    if (d === 'all') params.delete('domain')
    else params.set('domain', d)
    setParams(params, { replace: true })
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* 页头 */}
      <section className="pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 lg:px-8 lg:pt-24">
          <div className="max-w-[768px]">
            <p className="text-xs text-label-tertiary">交付系统档案</p>
            <h1 className="mt-4 text-3xl font-semibold leading-snug text-label-primary sm:text-4xl">
              供应链与制造业务原型。
            </h1>
            <p className="mt-5 text-base leading-7 text-label-secondary">
              每套系统都附完整交付档案：解决什么业务问题、怎么解决、接入了哪些系统、
              在生产环境跑出什么指标。点开任意一套，像读一篇文章一样了解它。
            </p>
          </div>

          <div className="mt-8 inline-flex rounded-[10px] bg-fill-1 p-1">
            {DOMAINS.map((d) => {
              const active = domain === d.key
              return (
                <button
                  key={d.key}
                  onClick={() => setDomain(d.key)}
                  className={`rounded-lg px-4 py-1.5 text-sm transition-colors duration-150 focus-ring ${
                    active ? 'bg-white font-medium text-label-primary' : 'text-label-secondary hover:text-label-primary'
                  }`}
                >
                  {d.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 档案列表 */}
      <section>
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          {list.map((p, i) => (
            <Reveal key={p.id}>
              <Link
                to={`/prototypes/${p.id}`}
                className="group grid gap-3 border-t border-separator py-7 transition-colors duration-150 hover:bg-[rgba(0,0,0,0.02)] md:grid-cols-[56px_1.1fr_1.4fr_auto] md:items-center md:gap-8 md:px-4"
              >
                <span className="text-sm tabular-nums text-label-quaternary transition-colors duration-200 group-hover:text-[#1783ff]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-lg font-medium text-label-primary">{p.name}</h2>
                  <p className="mt-1 text-xs text-label-tertiary">
                    {p.domain === 'supply' ? '供应链管理' : '制造业'} · {p.status}
                  </p>
                </div>
                <p className="text-sm leading-6 text-label-secondary">{p.plain}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-label-tertiary transition-colors group-hover:text-label-primary md:justify-end">
                  阅读档案
                  <ArrowRight size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-separator" />
        </div>
      </section>

      {/* 底部邀约 */}
      <section className="mt-16 bg-[#f5f5f5]">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
          <div className="max-w-[768px]">
            <h2 className="text-2xl font-semibold leading-snug text-label-primary">
              你的场景，可以成为下一套系统。
            </h2>
            <p className="mt-3 text-sm leading-6 text-label-secondary">
              从业务流程、问题样例与现有系统开始梳理，确定 AI 的适用位置，
              形成项目适用性与实施条件判断。
            </p>
            <a
              href="/#contact"
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-[rgba(0,0,0,0.9)] px-3.5 text-base font-medium text-white transition-colors duration-150 hover:bg-[rgba(37,37,37,1)] focus-ring"
            >
              预约场景摸排
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
