import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import EditorialMarkdown, { splitMarkdownDocument } from '@/components/site/EditorialMarkdown'
import { ProjectHero, ProjectToc } from '@/components/site/ProjectArticleChrome'
import SiteCta from '@/components/site/SiteCta'
import ZoomableImage from '@/components/site/ZoomableImage'
import projectSource from '@/content/settlement-coordination.md?raw'

const SECTION_META: Record<string, { id: string; navLabel: string }> = {
  概述: { id: 'overview', navLabel: '概述' },
  业务背景: { id: 'background', navLabel: '业务背景' },
  挑战: { id: 'challenge', navLabel: '挑战' },
  方案概览: { id: 'solution', navLabel: '方案概览' },
  模型与规则: { id: 'model-rule-boundary', navLabel: '模型与规则' },
  判断路径: { id: 'decision-path', navLabel: '判断路径' },
  公开边界: { id: 'validation', navLabel: '公开边界' },
  项目经验: { id: 'lessons', navLabel: '项目经验' },
  结语: { id: 'closing', navLabel: '结语' },
}

export default function PracticeArticle() {
  const document = splitMarkdownDocument(projectSource)
  const tocItems = document.sections.map((section) => ({
    label: SECTION_META[section.title]?.navLabel ?? section.title,
    href: `#${SECTION_META[section.title]?.id ?? section.title}`,
  }))

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Nav />
      <main id="project-content">
        <article className="mx-auto max-w-6xl px-4 pb-24 pt-24 lg:px-8 lg:pt-32">
          <ProjectHero
            eyebrow="供应链结算 · 异常处理"
            title={document.title}
            summary={document.summary}
            disclosure="客户信息、业务数据与具体金额均作脱敏处理"
            meta={[
              { label: '业务场景', value: '供应链结算异常处理' },
              { label: '核心结构', value: '原系统之上的异常协同层' },
              { label: '职责边界', value: '规则计算、模型解释、人员确认' },
            ]}
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14">
            <ProjectToc items={tocItems} />

            <div>
              {document.sections.map((section, index) => (
                <section
                  id={SECTION_META[section.title]?.id ?? section.title}
                  key={section.title}
                  className="scroll-mt-28 py-12 first:pt-0"
                >
                  <div className="mb-7 grid gap-3 sm:grid-cols-[52px_1fr] sm:items-baseline">
                    <span className="text-xs tabular-nums text-label-quaternary">{String(index + 1).padStart(2, '0')}</span>
                    <h2 className="text-2xl font-semibold tracking-[-0.015em] text-label-primary sm:text-3xl">{section.title}</h2>
                  </div>
                  <EditorialMarkdown content={section.content} />
                  {section.title === '方案概览' ? (
                    <>
                      <p className="mt-10 max-w-[46rem] text-[15px] leading-8 text-label-secondary">
                        三层架构确定之后，还需要回答一笔异常进入协同层后，各类材料和计算分别经过什么处理，业务人员在哪一步确认，以及哪些信息回到原系统、哪些作为处理历史留下。
                      </p>
                      <ZoomableImage
                        src="/projects/settlement-coordination/business-evidence-to-history-path.png"
                        alt="合同、订单、系统记录、供应商说明和沟通记录汇入异常上下文，模型负责信息提取和语义解释，规则与 SQL 负责金额、税率和口径校验，业务人员核对后形成业务结论；正式记录由原系统保存，证据链与判断过程沉淀为可检索的历史处理路径"
                        title="从原始业务依据到可检索历史处理路径"
                        caption="模型、规则与业务人员分别承担不同职责；正式交易结果仍由原系统保存，异常处理依据与判断过程另行沉淀。点击图片可放大查看。"
                      />
                    </>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </article>
        <SiteCta title="讨论结算异常" />
      </main>
      <Footer />
    </div>
  )
}
