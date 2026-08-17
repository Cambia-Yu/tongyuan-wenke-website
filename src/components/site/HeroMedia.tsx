import { useEffect, useState } from 'react'

/**
 * 首屏背景媒体轮播。
 * 当前为空：首屏由等值线场动效担任背景。
 * 启用方式：将视频文件放入 public/hero/，在 HERO_MEDIA 中添加条目即可，
 * 视频将以不透明覆盖层接管背景，多段视频自动交叉淡入轮播。
 */

export interface HeroMediaItem {
  src: string
  poster?: string
}

export const HERO_MEDIA: HeroMediaItem[] = [
  // 示例：{ src: '/hero/brand-01.mp4', poster: '/hero/brand-01.jpg' },
]

const DURATION_MS = 8000

export default function HeroMedia({ items }: { items: HeroMediaItem[] }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const timer = setInterval(() => setIdx((i) => (i + 1) % items.length), DURATION_MS)
    return () => clearInterval(timer)
  }, [items.length])

  if (items.length === 0) return null

  return (
    <>
      {items.map((m, i) => (
        <video
          key={m.src}
          src={m.src}
          poster={m.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {items.length > 1 && (
        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
          {items.map((m, i) => (
            <button
              key={m.src}
              type="button"
              aria-label={`切换到第 ${i + 1} 段`}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'w-6 bg-[rgba(0,0,0,0.6)]' : 'w-1.5 bg-[rgba(0,0,0,0.25)]'
              }`}
            />
          ))}
        </div>
      )}
    </>
  )
}
