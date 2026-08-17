import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { ArticleRail } from '@/design-system/components'

export type ProjectMetaItem = {
  label: string
  value: string
}

export type ProjectTocItem = {
  label: string
  href: string
}

export function ProjectHero({
  eyebrow,
  title,
  summary,
  disclosure,
  meta,
}: {
  eyebrow: string
  title: string
  summary: string
  disclosure: string
  meta: ProjectMetaItem[]
}) {
  return (
    <>
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-label-tertiary transition-colors hover:text-label-primary focus-ring">
        <ArrowLeft size={15} />
        返回项目实践
      </Link>

      <header className="mt-10 max-w-[980px]">
        <p className="text-xs tracking-[0.06em] text-label-tertiary">{eyebrow}</p>
        <h1 className="mt-7 max-w-[920px] text-[2.35rem] font-semibold leading-[1.16] tracking-[-0.035em] text-label-primary text-balance sm:text-[3.3rem] lg:text-[3.65rem]">{title}</h1>
        <p className="mt-7 max-w-[760px] text-[15px] leading-7 text-label-secondary sm:text-base">{summary}</p>
        <p className="mt-5 text-[11px] leading-5 text-label-quaternary">{disclosure}</p>
      </header>

      <div className="mt-12 grid max-w-[920px] gap-3 sm:grid-cols-3">
        {meta.map((item) => (
          <div key={item.label} className="rounded-2xl bg-white/75 px-5 py-4 shadow-[0_14px_38px_rgba(23,31,27,0.045)]">
            <p className="text-xs text-label-tertiary">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-label-primary">{item.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export function ProjectToc({ items }: { items: ProjectTocItem[] }) {
  return (
    <aside className="hidden lg:block">
      <ArticleRail items={items} />
    </aside>
  )
}
