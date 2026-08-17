import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import './button.css'

export type TywkButtonVariant = 'primary' | 'secondary'
export type TywkButtonSize = 'lg' | 'md' | 'sm'

export interface TywkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary 用于每屏唯一的主要行动；secondary 用于次要行动 */
  variant?: TywkButtonVariant
  /** lg=44 移动端主按钮，md=32 默认，sm=26 紧凑工具区 */
  size?: TywkButtonSize
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

/**
 * TYWK/Action/Button — 主按钮与次按钮。
 * 每屏只出现一个 Primary；加载态保留宽度、禁止重复提交。
 */
export const Button = forwardRef<HTMLButtonElement, TywkButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, className = '', children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`tywk-btn tywk-btn--${variant} tywk-btn--${size} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="tywk-btn__spinner" aria-hidden="true" />}
      {!loading && leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  )
})
