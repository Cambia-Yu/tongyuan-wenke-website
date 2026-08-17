import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import '../forms/forms.css'

export interface TywkCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
}

/**
 * TYWK/Form/Checkbox — 勾选确认。
 * 原生 input 样式化，天然支持键盘与表单提交。
 */
export const Checkbox = forwardRef<HTMLInputElement, TywkCheckboxProps>(function Checkbox(
  { label, className = '', ...rest },
  ref,
) {
  return (
    <label className={`tywk-checkbox ${className}`}>
      <input ref={ref} type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  )
})
