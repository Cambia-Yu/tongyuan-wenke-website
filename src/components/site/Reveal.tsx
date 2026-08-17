import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * 滚动显现容器：使用 TYWK Motion Tokens 完成一次克制入场。
 * 尊重 prefers-reduced-motion（直接呈现，无动画）。
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [shown, setShown] = useState(reduceMotion)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduceMotion])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(var(--tywk-motion-distance))',
        transition: `opacity var(--tywk-motion-slow) var(--tywk-ease-standard) ${delay}ms, transform var(--tywk-motion-slow) var(--tywk-ease-standard) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
