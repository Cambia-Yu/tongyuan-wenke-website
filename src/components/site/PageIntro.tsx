export default function PageIntro({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string
  title: string
  desc: string
}) {
  return (
    <header className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="pointer-events-none absolute -right-32 top-8 h-[360px] w-[360px] rounded-full bg-[#e9f2ee] opacity-70 blur-[90px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[22%] top-28 h-40 w-40 rounded-full bg-[#edf1f6] opacity-80 blur-[70px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 lg:px-8 lg:pb-20">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium tracking-[0.08em] text-label-tertiary">{eyebrow}</p>
          <h1 className="mt-6 max-w-[940px] text-[2.35rem] font-semibold leading-[1.12] tracking-[-0.045em] text-label-primary text-balance sm:text-[3.3rem] lg:text-[3.65rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-[720px] text-[15px] leading-7 text-label-secondary sm:text-base">{desc}</p>
        </div>
      </div>
    </header>
  )
}
