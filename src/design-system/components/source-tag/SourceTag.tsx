import './source-tag.css'

export interface TywkSourceTagProps {
  /** 来源编号，如 01、02；对应证据清单中的条目 */
  index: string
  children: string
}

/**
 * TYWK/Status/SourceTag — 材料来源标签。
 * 标记一段结论对应的证据来源（系统记录、业务文件、访谈纪要等），
 * 与项目案例中的证据清单编号保持一致。
 */
export function SourceTag({ index, children }: TywkSourceTagProps) {
  return (
    <span className="tywk-source-tag">
      <span className="tywk-source-tag__index">{index}</span>
      {children}
    </span>
  )
}
