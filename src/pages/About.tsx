import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import SiteCta from '@/components/site/SiteCta'

const RESPONSIBILITIES = [
  ['业务问题定义', '把企业诉求转化为能够讨论、验证和交付的具体问题。'],
  ['场景与项目设计', '判断 AI 应介入哪一段工作，并明确首期范围与技术边界。'],
  ['项目治理', '组织业务、数据、技术和交付角色，推动关键决定被记录和执行。'],
  ['客户关系与方法资产', '持续理解业务现场，把项目经验沉淀为可以复用的判断与工具。'],
]

const COLLABORATORS = [
  ['客户团队', '提供业务事实，确认规则、使用方式和最终业务结果'],
  ['通元问科', '定义问题、设计验证，并组织业务与技术协同'],
  ['技术伙伴', '在确认范围内完成平台、开发、集成与部署'],
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <header className="pt-28 sm:pt-32 lg:pt-36">
          <div className="mx-auto max-w-5xl px-4 pb-16 lg:px-8 lg:pb-20">
            <p className="text-xs font-medium tracking-[0.08em] text-label-tertiary">关于我们</p>
            <h1 className="mt-5 max-w-[760px] text-[2.6rem] font-semibold leading-[1.16] tracking-[-0.035em] text-label-primary text-balance sm:text-5xl">
              通元问科
            </h1>
            <p className="mt-6 max-w-[760px] text-xl leading-9 text-label-primary sm:text-2xl sm:leading-10">
              连接企业业务判断与 AI 工程实施
            </p>
            <div className="mt-8 max-w-[720px] space-y-4 text-base leading-7 text-label-secondary">
              <p>我们参与业务问题定义、场景判断、项目设计和项目治理，并与客户团队及技术伙伴共同完成实施。</p>
              <p>我们关注哪些工作值得改变、改变到什么程度，以及新的能力如何进入已有系统和责任关系。</p>
            </div>
          </div>
        </header>

        <section id="responsibility" className="scroll-mt-28 bg-[#f3f5f3]">
          <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8 lg:py-20">
            <p className="text-xs text-label-tertiary">负责范围</p>
            <h2 className="mt-4 [font-family:var(--tywk-font-sans)] text-2xl font-semibold leading-snug tracking-[-0.02em] text-label-primary sm:text-3xl">长期负责的部分</h2>
            <p className="mt-5 max-w-[720px] text-base leading-7 text-label-secondary">具体项目可以与不同的开发、平台和集成伙伴协作，但业务价值、项目边界与客户关系需要保持连续。</p>

            <div className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-2">
              {RESPONSIBILITIES.map(([title, desc], index) => (
                <article key={title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="pt-1 text-xs tabular-nums text-label-quaternary">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg font-medium text-label-primary">{title}</h3>
                    <p className="mt-2 max-w-[28rem] text-sm leading-7 text-label-secondary">{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="collaboration" className="scroll-mt-28">
          <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8 lg:py-20">
            <p className="text-xs text-label-tertiary">合作关系</p>
            <h2 className="mt-4 [font-family:var(--tywk-font-sans)] text-2xl font-semibold leading-snug tracking-[-0.02em] text-label-primary sm:text-3xl">合作模式</h2>
            <p className="mt-5 max-w-[720px] text-base leading-7 text-label-secondary">三方围绕同一项业务任务协作，各自保留清晰的判断和实施责任。</p>

            <div className="mt-10 bg-[#eef2ee] px-6 py-8 sm:px-8 sm:py-10">
              <div className="grid gap-5 md:grid-cols-[1fr_auto_1.12fr_auto_1fr] md:items-start md:gap-7">
                {COLLABORATORS.map(([title, desc], index) => (
                  <div key={title} className="contents">
                    <article>
                      <p className="text-xs tabular-nums text-label-quaternary">{String(index + 1).padStart(2, '0')}</p>
                      <h3 className="mt-3 text-lg font-medium text-label-primary">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-label-secondary">{desc}</p>
                    </article>
                    {index < COLLABORATORS.length - 1 && (
                      <span aria-hidden="true" className="text-label-quaternary md:pt-10">→</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-[760px] text-sm leading-7 text-label-secondary md:mt-10">
                客户保留业务判断权，通元问科保持问题与项目边界连续，技术伙伴在明确范围内完成实施。
              </p>
            </div>
          </div>
        </section>

        <SiteCta />
      </main>
      <Footer />
    </div>
  )
}
