import { useEffect, useState } from 'react'

const CANONICAL_URL =
  'https://raw.githubusercontent.com/Cambia-Yu/tongyuan-wenke-website/main/homepage-v8/index.html'

export default function CanonicalSite() {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch(`${CANONICAL_URL}?v=${Date.now()}`, { cache: 'no-store' })
        if (!response.ok) throw new Error(`canonical homepage ${response.status}`)
        const html = await response.text()
        if (cancelled) return
        document.open()
        document.write(html)
        document.close()
      } catch (error) {
        console.error('Unable to load canonical website', error)
        if (!cancelled) setFailed(true)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (failed) {
    return (
      <main style={{ minHeight: '100vh', background: '#05070a', color: '#d9e0ec', padding: 32, fontFamily: 'system-ui, sans-serif' }}>
        官网加载失败，请刷新页面重试。
      </main>
    )
  }

  return <div style={{ minHeight: '100vh', background: '#05070a' }} />
}
