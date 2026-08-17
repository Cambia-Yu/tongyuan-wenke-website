import { forwardRef, useId, type SelectHTMLAttributes } from 'react'
import '../forms/forms.css'

export interface TywkSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
}

/**
 * TYWK/Form/Select — 下拉选择。
 * 使用原生 select 样式化，保留移动端系统选择器与完整键盘操作。
 */
export const Select = forwardRef<HTMLSelectElement, TywkSelectProps>(function Select(
  { label, hint, error, required = false, className = '', id, children, ...rest },
  ref,
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const messageId = `${fieldId}-message`

  return (
    <div className={`tywk-field ${error ? 'tywk-field--error' : ''} ${className}`}>
      {label && (
        <label className="tywk-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="tywk-field__required" aria-hidden="true">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={fieldId}
        className="tywk-field__control tywk-field__control--select"
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={hint || error ? messageId : undefined}
        {...rest}
      >
        {children}
      </select>
      {error ? (
        <p className="tywk-field__error" id={messageId} role="alert">{error}</p>
      ) : hint ? (
        <p className="tywk-field__hint" id={messageId}>{hint}</p>
      ) : null}
    </div>
  )
})
