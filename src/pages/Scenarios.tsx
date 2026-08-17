import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import PageIntro from '@/components/site/PageIntro'
import { SectionTabs } from '@/design-system/components'
import { SCENARIO_GROUPS } from '@/data/scenarios'

export default function Scenarios() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Nav />
      <main>
        <PageIntro
          eyebrow="服务领域"
          title="供应链、制造与企业知识"
          desc="围绕具体业务问题，连接流程、数据与现有系统。"
        />
        <SectionTabs label="快速导航" items={SCENARIO_GROUPS.map((group) => ({ label: group.label, href: `#${group.id}` }))} />

        <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 lg:px-8 lg:py-24">
          {SCENARIO_GROUPS.map((group, groupIndex) => (
            <article key={group.id} id={group.id} className="scroll-mt-32 rounded-[28px] bg-white p-6 shadow-[0_22px_65px_rgba(29,38,33,0.055)] sm:p-9 lg:p-12">
              <header className="max-w-[760px]">
                <p className="text-xs text-label-tertiary">{String(groupIndex + 1).padStart(2, '0')} · {group.label}</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-label-primary">{group.title}</h2>
                <p className="mt-4 max-w-[680px] text-sm leading-7 text-label-secondary">{group.intro}</p>
              </header>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {group.directions.map((direction) => (
                  <article key={direction.title} className="rounded-[22px] bg-[#f1f3f0] p-6">
                    <h3 className="text-base font-medium text-label-primary">{direction.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-label-secondary">{direction.desc}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-[22px] bg-[#f7f5f1] p-6">
                  <p className="text-xs text-label-tertiary">常见情况</p>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-label-primary">
                    {group.signals.map((signal) => <li key={signal}>{signal}</li>)}
                  </ul>
                </div>
                <div className="rounded-[22px] bg-[#e8eee9] p-6">
                  <p className="text-xs text-label-tertiary">通常从哪里开始</p>
                  <p className="mt-4 text-sm leading-7 text-label-primary">{group.work.join('，')}。</p>
                  {group.id === 'supply-chain' && (
                    <Link to="/projects/settlement-coordination" className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-label-primary focus-ring">
                      查看项目实践 <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
