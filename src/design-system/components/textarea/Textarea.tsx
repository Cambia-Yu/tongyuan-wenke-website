import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'
import '../forms/forms.css'

export interface TywkTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
}

/**
 * TYWK/Form/Textarea — 多行输入。
 * 允许纵向拉伸，最小高度 96px。
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TywkTextareaProps>(function Textarea(
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
      <textarea
        ref={ref}
        id={fieldId}
        className="tywk-field__control tywk-field__control--area"
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
