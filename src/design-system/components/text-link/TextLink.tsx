import type { AnchorHTMLAttributes } from 'react'
import { ArrowRight } from 'lucide-react'
import './text-link.css'

export interface TywkTextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** quiet 用于正文内的次级引用链接 */
  tone?: 'accent' | 'quiet'
  /** 带右箭头，用于「查看全部」「阅读更多」等出口 */
  withArrow?: boolean
}

/**
 * TYWK/Action/TextLink — 文字链接。
 * 下划线仅在 hover / focus 时划入，正文阅读不被打扰。
 */
export function TextLink({ tone = 'accent', withArrow = false, className = '', children, ...rest }: TywkTextLinkProps) {
  return (
    <a className={`tywk-link ${tone === 'quiet' ? 'tywk-link--quiet' : ''} ${className}`} {...rest}>
      {children}
      {withArrow && <ArrowRight className="tywk-link__arrow" size={14} aria-hidden="true" />}
    </a>
  )
}
