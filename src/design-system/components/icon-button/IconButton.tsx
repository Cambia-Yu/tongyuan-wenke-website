import { forwardRef, type ButtonHTMLAttributes } from 'react'
import './icon-button.css'

export interface TywkIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'md' | 'sm'
  /** 必填：图标按钮没有可见文字，必须提供可访问名称 */
  'aria-label': string
}

/**
 * TYWK/Action/IconButton — 仅图标的操作（关闭、展开、更多）。
 * 必须传 aria-label。
 */
export const IconButton = forwardRef<HTMLButtonElement, TywkIconButtonProps>(function IconButton(
  { size = 'md', className = '', children, ...rest },
  ref,
) {
  return (
    <button ref={ref} type="button" className={`tywk-icon-btn tywk-icon-btn--${size} ${className}`} {...rest}>
      {children}
    </button>
  )
})
