/**
 * 工程图纸对位标记：区块分隔线两端的细小「+」，
 * 取自制图与印刷中的规线语言，传递精密感而不增加视觉密度。
 * 仅在大屏显示。
 */
export default function SectionMarks() {
  const base =
    'pointer-events-none absolute top-[-7px] select-none text-sm font-light leading-none text-[rgba(0,0,0,0.16)]'
  return (
    <>
      <span aria-hidden="true" className={`${base} left-2 hidden lg:block`}>
        +
      </span>
      <span aria-hidden="true" className={`${base} right-2 hidden lg:block`}>
        +
      </span>
    </>
  )
}
