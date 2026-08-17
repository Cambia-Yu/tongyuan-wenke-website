import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import EditorialMarkdown, { splitMarkdownDocument } from '@/components/site/EditorialMarkdown'
import { ProjectHero, ProjectToc } from '@/components/site/ProjectArticleChrome'
import SiteCta from '@/components/site/SiteCta'
import ZoomableImage from '@/components/site/ZoomableImage'
import projectSource from '@/content/supply-chain-research-kb-poc.md?raw'

const SECTION_META: Record<string, { id: string; navLabel: string }> = {
  资料现状: { id: 'existing-knowledge', navLabel: '资料现状' },
  首期范围: { id: 'poc-scope', navLabel: '首期范围' },
  资料入库: { id: 'ingestion', navLabel: '资料入库' },
  检索与来源: { id: 'retrieval', navLabel: '检索与来源' },
  初稿生成: { id: 'drafting', navLabel: '初稿生成' },
  人工审核: { id: 'review', navLabel: '人工审核' },
  资料边界: { id: 'document-boundary', navLabel: '资料边界' },
  核心验证: { id: 'acceptance', navLabel: '核心验证' },
  公开边界: { id: 'disclosure', navLabel: '公开边界' },
  项目资产: { id: 'assets', navLabel: '项目资产' },
}

export default function ResearchKnowledgeProject() {
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
            eyebrow="供应链行业研究 · 企业知识库"
            title={document.title}
            summary={document.summary}
            disclosure="客户名称、内部资料、业务数据和界面信息均作脱敏处理"
            meta={[
              { label: '业务场景', value: '研究资料检索与报告初稿' },
              { label: '核心流程', value: '解析、检索、生成与溯源' },
              { label: '使用边界', value: '研究人员审核后进入编辑' },
            ]}
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14">
            <ProjectToc items={tocItems} />

            <div>
              {document.sections.map((section, index) => (
                <section
                  id={SECTION_META[section.title]?.id ?? section.title}
                  key={section.title}
                  className={`scroll-mt-28 py-12 first:pt-0 ${index === 2 || index === 6 ? 'project-evidence' : ''}`}
                >
                  <div className={index === 2 || index === 6 ? 'rounded-[24px] bg-[#f2f4f2] p-6 sm:p-8' : ''}>
                    <div className="mb-7 grid gap-3 sm:grid-cols-[52px_1fr] sm:items-baseline">
                      <span className="text-xs tabular-nums text-label-quaternary">{String(index + 1).padStart(2, '0')}</span>
                      <h2 className="text-2xl font-semibold tracking-[-0.015em] text-label-primary sm:text-3xl">{section.title}</h2>
                    </div>
                    <EditorialMarkdown content={section.content} />
                    {section.title === '首期范围' ? (
                      <ZoomableImage
                        src="/projects/supply-chain-research-kb-poc/authorized-materials-to-traceable-draft.png"
                        alt="授权资料经过受控导入、文本解析、内容分块和知识索引后进入知识检索，检索结果携带相关内容片段与来源引用，辅助生成结构化初稿并由研究人员审核；扫描件、复杂表格和图片内容列为前期另行评估范围"
                        title="从授权资料到可追溯初稿"
                        caption="授权资料经过解析、索引与检索进入初稿辅助流程，来源信息和研究人员审核构成核心控制点。点击图片可放大查看。"
                      />
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
        <SiteCta title="讨论研究知识库" />
      </main>
      <Footer />
    </div>
  )
}
