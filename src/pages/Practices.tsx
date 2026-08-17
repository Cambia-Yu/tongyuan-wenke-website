import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import PageIntro from '@/components/site/PageIntro'
import SiteCta from '@/components/site/SiteCta'

const PROJECTS = [
  {
    number: '01',
    eyebrow: '供应链行业研究 · 企业知识库',
    title: '供应链研究知识库 PoC',
    summary: '历史研究报告、政策与标准资料分散。项目先验证资料能否稳定进入解析、检索与来源追溯流程，再评估结构化初稿生成。',
    image: '/projects/supply-chain-research-kb-poc/cover.png',
    imageAlt: '历史规划报告、检索结果、来源引用与研究初稿组成的脱敏项目材料',
    href: '/projects/supply-chain-research-kb-poc',
  },
  {
    number: '02',
    eyebrow: '供应链结算 · 异常处理',
    title: '供应链结算异常协同',
    summary: '结算差异发生后，合同、订单、回单、供应商说明与沟通记录仍需人工串联。项目在原系统之上设计异常协同层，并重新划分模型、规则与人工职责。',
    image: '/projects/settlement-coordination/cover.png',
    imageAlt: '合同、订单、回单、沟通记录和核对判断组成的脱敏结算异常材料',
    href: '/projects/settlement-coordination',
  },
]

export default function Practices() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Nav />
      <main>
        <PageIntro
          eyebrow="项目实践"
          title="企业 AI 项目实践"
          desc="两个项目分别处理专业资料复用与结算异常协同，记录业务问题、解决方案和关键工程取舍。"
        />

        <section className="mx-auto max-w-6xl px-4 pb-24 pt-10 lg:px-8 lg:pb-32 lg:pt-16">
          <div className="space-y-16 lg:space-y-24">
            {PROJECTS.map((project, index) => (
              <article key={project.href} className="group grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
                <Link
                  to={project.href}
                  className={`block overflow-hidden rounded-[28px] bg-[#efece5] shadow-[0_24px_70px_rgba(39,45,41,0.07)] focus-ring ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  aria-label={`阅读项目：${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="aspect-[16/9] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </Link>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 text-xs text-label-tertiary">
                    <span className="tabular-nums">{project.number}</span>
                    <span>{project.eyebrow}</span>
                  </div>
                  <h2 className="mt-5 text-[1.85rem] font-semibold leading-[1.28] tracking-[-0.025em] text-label-primary sm:text-[2.15rem]">
                    <Link to={project.href} className="focus-ring">{project.title}</Link>
                  </h2>
                  <p className="mt-5 max-w-[34rem] text-[15px] leading-8 text-label-secondary">{project.summary}</p>
                  <Link to={project.href} className="group/link mt-7 inline-flex items-center gap-2 text-sm font-medium text-label-primary focus-ring">
                    阅读完整项目
                    <ArrowUpRight size={16} className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-20 max-w-3xl text-xs leading-6 text-label-tertiary">
            客户名称、内部资料、业务数据和界面信息均作脱敏处理。
          </p>
        </section>

        <SiteCta title="讨论一个业务问题" />
      </main>
      <Footer />
    </div>
  )
}
