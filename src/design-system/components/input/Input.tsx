import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import '../forms/forms.css'

export interface TywkInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
}

/**
 * TYWK/Form/Input — 单行输入。
 * label / hint / error 与控件通过 id 关联，供屏幕阅读器朗读。
 */
export const Input = forwardRef<HTMLInputElement, TywkInputProps>(function Input(
  { label, hint, error, required = false, className = '', id, ...rest },
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
      <input
        ref={ref}
        id={fieldId}
        className="tywk-field__control"
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={hint || error ? messageId : undefined}
        {...rest}
      />
      {error ? (
        <p className="tywk-field__error" id={messageId} role="alert">{error}</p>
      ) : hint ? (
        <p className="tywk-field__hint" id={messageId}>{hint}</p>
      ) : null}
    </div>
  )
})
