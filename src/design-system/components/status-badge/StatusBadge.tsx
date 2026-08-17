import './status-badge.css'

export type TywkStatusTone = 'success' | 'pending' | 'error' | 'neutral'

export interface TywkStatusBadgeProps {
  tone?: TywkStatusTone
  children: string
}

/**
 * TYWK/Status/StatusBadge — 状态与验证标记。
 * 用于 已确认 / 仍待验证 / 已核实 / 待补充 等事实状态，不用于装饰性标签。
 */
export function StatusBadge({ tone = 'neutral', children }: TywkStatusBadgeProps) {
  return (
    <span className={`tywk-status tywk-status--${tone}`}>
      <span className="tywk-status__dot" aria-hidden="true" />
      {children}
    </span>
  )
}
