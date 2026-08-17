import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import PageIntro from '@/components/site/PageIntro'
import SiteCta from '@/components/site/SiteCta'

export default function Insights() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <PageIntro eyebrow="洞察" title="AI 项目复盘" desc="记录业务流程、系统架构与关键工程决策。" />
        <section className="border-t border-separator">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20">
            <Link to="/insights/settlement-coordination" className="group grid gap-5 border-y border-separator py-8 transition-colors duration-300 hover:bg-[rgba(22,99,74,0.025)] md:grid-cols-[56px_0.9fr_1.3fr_auto] md:items-start md:gap-8 md:px-4 focus-ring">
              <span className="text-xs tabular-nums text-label-quaternary">01</span>
              <div><p className="text-xs text-label-tertiary">技术复盘</p><h2 className="mt-3 text-lg font-medium leading-snug text-label-primary">供应链结算异常协同</h2></div>
              <p className="text-sm leading-6 text-label-secondary">如何在存量系统之上新增协同层，划分模型、规则与人的边界，并把处理经验沉淀为组织资产。</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-label-tertiary group-hover:text-label-primary">阅读全文 <ArrowRight size={15} /></span>
            </Link>
          </div>
        </section>
        <SiteCta />
      </main>
      <Footer />
    </div>
  )
}
