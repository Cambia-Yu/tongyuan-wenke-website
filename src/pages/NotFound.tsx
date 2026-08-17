import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="mx-auto flex min-h-[70vh] max-w-[760px] flex-col justify-center px-4 pb-20 pt-28">
        <p className="text-xs tabular-nums text-label-tertiary">404 · 页面不存在</p>
        <h1 className="mt-4 text-3xl font-semibold text-label-primary">页面不存在</h1>
        <p className="mt-4 text-base leading-7 text-label-secondary">链接可能已经调整或删除。</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-label-primary focus-ring">
          <ArrowLeft size={15} />
          返回首页
        </Link>
      </main>
      <Footer />
    </div>
  )
}
