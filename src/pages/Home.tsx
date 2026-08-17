import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import HeroCanvas from '@/components/site/HeroCanvas'
import Reveal from '@/components/site/Reveal'
import SectionMarks from '@/components/site/SectionMarks'
import SiteCta from '@/components/site/SiteCta'
import { Button } from '@/design-system/components'
import { SCENARIO_GROUPS } from '@/data/scenarios'
import { METHODOLOGY_META, RESEARCH_KB_PROJECT } from '@/data/siteContent'

function SectionHead({ index, label, title, desc }: { index: string; label: string; title: string; desc?: string }) {
  return (
    <div className="max-w-[760px]">
      <p className="flex items-center gap-2.5 text-xs text-label-tertiary">
        <span className="tabular-nums text-label-quaternary">{index}</span>
        <span aria-hidden="true" className="inline-block h-px w-5 bg-[var(--tywk-accent)] opacity-70" />
        {label}
      </p>
      <h2 className="mt-4 text-2xl font-semibold leading-snug text-label-primary text-balance sm:text-3xl">{title}</h2>
      {desc && <p className="mt-4 max-w-[700px] text-base leading-7 text-label-secondary">{desc}</p>}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="sr-only z-[600] rounded-lg bg-white px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-ring">
        跳到主要内容
      </a>
      <Nav />
      <main id="main-content">
        <section className="relative min-h-[700px] overflow-hidden pt-16 sm:min-h-[740px]">
          <div className="absolute inset-0"><HeroCanvas className="h-full w-full" /></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/35 to-transparent" />
          <div className="relative mx-auto flex min-h-[636px] max-w-6xl flex-col justify-end px-4 pb-16 lg:min-h-[676px] lg:px-8 lg:pb-20">
            <p className="animate-fade-up text-xs text-label-tertiary">通元问科 · 企业人工智能转型服务</p>
            <h1 className="animate-fade-up mt-4 max-w-[920px] text-4xl font-semibold leading-[1.2] tracking-[-0.025em] text-label-primary text-balance sm:text-5xl lg:text-6xl" style={{ animationDelay: '80ms' }}>
              让企业 AI 进入实际工作
            </h1>
            <p className="animate-fade-up mt-6 max-w-[680px] text-base leading-7 text-label-secondary" style={{ animationDelay: '160ms' }}>
              面向供应链、制造与企业知识场景，提供从场景识别、项目设计到小范围验证与落地协同的服务。
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <Button size="lg" onClick={() => (window.location.href = '/contact')}>商务咨询</Button>
              <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />} onClick={() => (window.location.href = '/projects')}>
                查看项目实践
              </Button>
            </div>
          </div>
        </section>

        <section className="relative border-t border-separator">
          <SectionMarks />
          <div className="mx-auto max-w-6xl px-4 py-20 lg:px-8 lg:py-24">
            <Reveal><SectionHead index="01" label="服务领域" title="供应链、制造与企业知识" /></Reveal>
            <div className="mt-10 divide-y divide-separator border-y border-separator">
              {SCENARIO_GROUPS.map((group, index) => (
                <Reveal key={group.id} delay={index * 50}>
                  <Link to={`/services#${group.id}`} className="group grid gap-3 py-7 md:grid-cols-[56px_0.65fr_1.3fr_auto] md:items-center md:gap-8 focus-ring">
                    <span className="text-xs tabular-nums text-label-quaternary">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-xl font-medium text-label-primary">{group.label}</h3>
                    <p className="text-sm leading-6 text-label-secondary">{group.title}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-label-tertiary group-hover:text-label-primary">了解方向 <ArrowRight size={14} /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-[#fafaf9]">
          <SectionMarks />
          <div className="mx-auto max-w-6xl px-4 py-20 lg:px-8 lg:py-24">
            <Reveal><SectionHead index="02" label="项目实践" title={RESEARCH_KB_PROJECT.cardTitle} desc={RESEARCH_KB_PROJECT.cardSummary} /></Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.28fr_0.72fr] lg:items-start">
              <Reveal>
                <Link to={RESEARCH_KB_PROJECT.href} className="group block rounded-[24px] bg-[#eef3f1] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e9efec] focus-ring sm:p-9 lg:p-11">
                  <p className="text-xs text-label-tertiary">一个实际问题</p>
                  <p className="mt-5 max-w-[700px] text-lg font-medium leading-8 text-label-primary">{RESEARCH_KB_PROJECT.homepageExample}</p>
                  <div className="mt-9 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/70 p-5"><p className="text-xs text-label-tertiary">工作内容</p><p className="mt-2 text-sm leading-6 text-label-secondary">{RESEARCH_KB_PROJECT.work}</p></div>
                    <div className="rounded-2xl bg-white/70 p-5"><p className="text-xs text-label-tertiary">关键决策</p><p className="mt-2 text-sm leading-6 text-label-secondary">{RESEARCH_KB_PROJECT.keyDecision}</p></div>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-label-primary">阅读项目 <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
              <Reveal delay={70} className="lg:mt-16">
                <Link to="/projects/settlement-coordination" className="group block rounded-[24px] bg-[#f4f1ec] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0ece5] focus-ring sm:p-8">
                  <p className="text-xs text-label-tertiary">供应链结算异常协同</p>
                  <h3 className="mt-14 text-xl font-semibold leading-snug text-label-primary">让处理经验回到组织流程</h3>
                  <p className="mt-4 text-sm leading-6 text-label-secondary">围绕合同、订单、回单与沟通记录之间的证据断裂，增加异常协同与证据归集能力。</p>
                  <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-label-primary">阅读项目 <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f5f4]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.35fr_0.65fr] md:items-end lg:px-8 lg:py-20">
            <Reveal>
              <SectionHead index="03" label="工作方法" title={METHODOLOGY_META.homepageTitle} desc={METHODOLOGY_META.homepageSummary} />
            </Reveal>
            <Reveal delay={70} className="md:text-right">
              <Link to="/approach" className="group inline-flex items-center gap-1.5 text-sm font-medium text-label-primary focus-ring">了解工作方法 <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" /></Link>
            </Reveal>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20">
            <Reveal>
              <SectionHead
                index="04"
                label="关于我们"
                title="我们在项目中负责什么"
                desc="通元问科负责定义业务问题、设计验证路径并组织多方协同，让项目边界与客户关系在不同实施伙伴之间保持连续。"
              />
            </Reveal>
            <Reveal delay={60}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-label-secondary">
                <span>定义问题与项目边界</span>
                <span>设计验证与实施路径</span>
                <span>组织业务、数据与技术协同</span>
                <Link to="/about" className="group inline-flex items-center gap-1.5 font-medium text-label-primary focus-ring">
                  了解通元问科 <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <SiteCta />
      </main>
      <Footer />
    </div>
  )
}
