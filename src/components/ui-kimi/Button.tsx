import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 26 | 32 | 44

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const SIZE_STYLES: Record<Size, string> = {
  44: 'h-11 rounded-xl px-3.5 text-base font-medium gap-1.5',
  32: 'h-8 rounded-[10px] px-2.5 text-sm font-medium gap-1',
  26: 'h-[26px] rounded-lg px-2 text-xs font-medium gap-0.5',
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'bg-[rgba(0,0,0,0.9)] text-white hover:bg-[rgba(37,37,37,1)] active:bg-[rgba(0,0,0,0.905)]',
  secondary: 'bg-[rgba(0,0,0,0.03)] text-label-primary hover:bg-[rgba(0,0,0,0.05)]',
  outline:
    'border border-[rgba(0,0,0,0.13)] bg-transparent text-label-primary hover:bg-[rgba(0,0,0,0.03)]',
}

/**
 * Kimi Web Button：primary / secondary / outline，尺寸 44 / 32 / 26。
 * 规范见 kimi-design-skill references/components-web/button.md
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 32, leftIcon, rightIcon, className = '', children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`inline-flex select-none items-center justify-center whitespace-nowrap transition-all duration-200 focus-ring active:translate-y-px disabled:pointer-events-none disabled:text-label-quaternary disabled:bg-[rgba(0,0,0,0.03)] ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
})
