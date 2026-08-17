import { useEffect, useRef } from 'react'
import { contours } from 'd3-contour'
import { createNoise3D } from 'simplex-noise'

/**
 * 「等值线场」生成式背景。
 * 以三维单纯形噪声构造标量场，d3-contour 实时求解等值线，
 * 呈现地形测绘图般的精密质感。运动极缓慢，存在感低、质感高。
 */

const noise3D = createNoise3D()

// 标量场网格分辨率（格点数，非像素）
const COLS = 120
const ROWS = 72
// 等值线阈值层数
const LEVELS = 16
// 场空间缩放（值越小，等值线越舒展）
const FIELD_SCALE = 2.6

export default function HeroCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    const styles = getComputedStyle(document.documentElement)
    const accent = styles.getPropertyValue('--tywk-accent').trim() || '#416f59'
    const toRgba = (hex: string, alpha: number) => {
      const normalized = hex.replace('#', '')
      if (!/^[0-9a-f]{6}$/i.test(normalized)) return `rgba(65,111,89,${alpha})`
      const value = Number.parseInt(normalized, 16)
      return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`
    }
    const accentStroke = toRgba(accent, 0.24)

    const values = new Float32Array(COLS * ROWS)
    const gen = contours().size([COLS, ROWS]).smooth(true)
    const thresholds = Array.from({ length: LEVELS }, (_, i) => (i + 0.5) / LEVELS - 0.5)

    const drawFrame = (t: number) => {
      // 填充标量场：两层噪声叠加，近处舒展、远处有细节
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const x = (i / COLS) * FIELD_SCALE
          const y = (j / ROWS) * FIELD_SCALE * (ROWS / COLS)
          values[j * COLS + i] =
            noise3D(x, y, t) * 0.72 + noise3D(x * 2.3 + 40, y * 2.3 + 40, t * 1.4) * 0.28
        }
      }

      ctx.clearRect(0, 0, w, h)

      const sx = w / (COLS - 1)
      const sy = h / (ROWS - 1)

      const multipolys = gen.thresholds(thresholds)(Array.from(values))
      multipolys.forEach((mp, idx) => {
        // 零值层使用统一品牌强调色，其余为发丝线；隔层略深，形成层级
        const isZero = idx === Math.floor(LEVELS / 2)
        const isMajor = idx % 4 === 0
        ctx.strokeStyle = isZero
          ? accentStroke
          : isMajor
            ? 'rgba(0,0,0,0.13)'
            : 'rgba(0,0,0,0.065)'
        ctx.lineWidth = isZero ? 1 : 1
        ctx.beginPath()
        for (const polygon of mp.coordinates) {
          for (const ring of polygon) {
            for (let k = 0; k < ring.length; k++) {
              const [gx, gy] = ring[k]
              const px = gx * sx
              const py = gy * sy
              if (k === 0) ctx.moveTo(px, py)
              else ctx.lineTo(px, py)
            }
            ctx.closePath()
          }
        }
        ctx.stroke()
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // 时间推进极缓慢：等值线以近乎察觉不到的速度流动
    let last = 0
    let t = 0
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
      last = now
      t += dt * 0.045
      drawFrame(t)
      raf = requestAnimationFrame(tick)
    }

    resize()
    if (reduced) {
      drawFrame(0.6)
    } else {
      raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) drawFrame(0.6)
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
