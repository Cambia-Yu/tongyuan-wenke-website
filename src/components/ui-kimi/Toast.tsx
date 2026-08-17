import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check } from 'lucide-react'

type ToastType = 'success' | 'info'

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

let pushToast: ((item: Omit<ToastItem, 'id'>) => void) | null = null

/** 轻量 Toast：成功 / 信息两种，顶部居中，3 秒自动消失（Kimi toast 规范） */
export function toast(message: string, type: ToastType = 'success') {
  pushToast?.({ type, message })
}

export function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([])

  useEffect(() => {
    pushToast = (item) => {
      const id = Date.now() + Math.random()
      setItems((prev) => [...prev.slice(-2), { ...item, id }])
      window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    }
    return () => {
      pushToast = null
    }
  }, [])

  if (items.length === 0) return null

  return createPortal(
    <div className="pointer-events-none fixed left-1/2 top-4 z-[1000] flex -translate-x-1/2 flex-col items-center gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          role="status"
          aria-live="polite"
          className="animate-toast-in flex min-h-10 max-w-[360px] items-center gap-2 rounded-xl bg-[#2b2b2b] px-3 py-2.5"
        >
          {t.type === 'success' && <Check size={20} className="shrink-0 text-[#16c456]" />}
          <span className="text-sm leading-5 text-white">{t.message}</span>
        </div>
      ))}
    </div>,
    document.body,
  )
}
