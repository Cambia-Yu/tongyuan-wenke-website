import { Link, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import SiteCta from '@/components/site/SiteCta'
import { INSIGHTS_PUBLISHED } from '@/data/insights'

/**
 * 观点 · 文章页
 * 渲染对外展示文章（Markdown 源），含表格、代码块与工程配图。
 * 新增文章：在 data/insights.ts 扩充条目并放入 src/content/ 下的 md 文件即可。
 * （路由滚动由 ScrollManager 统一管理）
 */
export default function InsightArticle() {
  const { id } = useParams()
  const article = INSIGHTS_PUBLISHED.find((a) => a.id === id)

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="mx-auto max-w-[768px] px-4 pb-24 pt-40 text-center">
          <h1 className="text-xl font-medium text-label-primary">没有找到这篇文章</h1>
          <Link
            to="/insights"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-label-secondary hover:text-label-primary"
          >
            <ArrowLeft size={15} />
            返回洞察
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <article className="mx-auto max-w-6xl px-4 pb-24 pt-16 lg:px-8 lg:pt-24">
          <Link
          to="/insights"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-label-tertiary transition-colors hover:text-label-primary"
        >
          <ArrowLeft size={15} />
          洞察
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:gap-14">
          <div>
            <p className="text-xs text-label-tertiary">{article.tag}</p>
            <p className="mt-2 text-xs text-label-quaternary">{article.date}</p>
          </div>
          <div>
            <h1 className="max-w-[820px] text-3xl font-semibold leading-snug text-label-primary sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-[700px] text-base leading-7 text-label-secondary">{article.desc}</p>
          </div>
        </header>

        <div className="mt-12 grid gap-12 border-t border-separator pt-10 lg:grid-cols-[0.28fr_0.72fr] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs text-label-tertiary">文章内容</p>
              <ol className="mt-5 space-y-3 text-sm text-label-tertiary">
                {['问题定义', '目标与非目标', '总体架构', '关键设计决策', '形成的成果', '经验教训', '后续方向'].map((item, index) => (
                  <li key={item} className="grid grid-cols-[28px_1fr]">
                    <span className="text-xs tabular-nums text-label-quaternary">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          <div className="min-w-0 max-w-[768px]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null, // 标题已在头部呈现
              h2: ({ children }) => (
                <h2 className="mb-4 mt-12 text-xl font-medium text-label-primary">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-8 text-base font-semibold text-label-primary">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="my-4 text-base leading-7 text-label-secondary">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-label-primary">{children}</strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-4 border-l-2 border-separator pl-4 text-sm leading-6 text-label-tertiary [&>p]:my-1 [&>p]:text-sm [&>p]:leading-6 [&>p]:text-label-tertiary">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => <ul className="my-4 space-y-2 pl-1">{children}</ul>,
              ol: ({ children }) => (
                <ol className="my-4 list-decimal space-y-2 pl-6 text-label-secondary">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-base leading-7 text-label-secondary before:mr-2 before:text-label-quaternary before:content-['·']">
                  {children}
                </li>
              ),
              hr: () => <hr className="my-10 border-separator" />,
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto rounded-xl border border-separator">
                  <table className="w-full border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-fill-1">{children}</thead>,
              th: ({ children }) => (
                <th className="border-b border-separator px-4 py-3 text-left font-medium text-label-primary">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-separator px-4 py-3 align-top leading-6 text-label-secondary">
                  {children}
                </td>
              ),
              pre: ({ children }) => (
                <pre className="my-6 overflow-x-auto rounded-xl bg-fill-1 p-4 text-[13px] leading-6 text-label-primary">
                  {children}
                </pre>
              ),
              code: ({ children, className }) =>
                className ? (
                  <code className={className}>{children}</code>
                ) : (
                  <code className="rounded bg-fill-1 px-1.5 py-0.5 text-[13px] text-label-primary">
                    {children}
                  </code>
                ),
              img: ({ src, alt }) => (
                <span className="my-8 block">
                  <span className="block overflow-hidden rounded-xl border border-separator bg-white">
                    <img src={src} alt={alt ?? ''} className="w-full" />
                  </span>
                  {alt && (
                    <span className="mt-2 block text-xs text-label-quaternary">{alt}</span>
                  )}
                </span>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-[#1783ff] underline-offset-4 hover:underline">
                  {children}
                </a>
              ),
            }}
          >
            {article.body}
          </ReactMarkdown>
          </div>
        </div>

      </article>

      <SiteCta desc="针对反复核对、经验难以复用或跨系统协同问题，可直接整理具体业务情况。" />

      <Footer />
    </div>
  )
}
