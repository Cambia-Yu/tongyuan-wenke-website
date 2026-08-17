import Contact from '@/components/site/Contact'

export default function SiteCta({
  title = '商务咨询',
  desc = '留下联系方式和想讨论的问题，我们会通过你提供的方式回复。',
}: {
  title?: string
  desc?: string
}) {
  return (
    <section className="bg-[#f1f3f0]">
      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-20">
        <p className="text-xs text-label-tertiary">商务咨询</p>
        <h2 className="mt-3 text-2xl font-semibold leading-snug text-label-primary sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-[620px] text-sm leading-7 text-label-secondary">{desc}</p>
        <div className="mt-8 rounded-[26px] bg-white p-6 shadow-[0_20px_60px_rgba(29,38,33,0.055)] sm:p-9">
          <Contact />
        </div>
      </div>
    </section>
  )
}
