import { Link } from 'react-router'
import { Logo } from './Nav'

const LINKS = [
  { label: '服务领域', href: '/services' },
  { label: '项目实践', href: '/projects' },
  { label: '工作方法', href: '/approach' },
  { label: '洞察', href: '/insights' },
  { label: '关于我们', href: '/about' },
  { label: '商务咨询', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-sm text-sm leading-6 text-dark-secondary">
              面向供应链、制造与企业知识场景，帮助企业从真实业务问题出发，推进可验证、可治理的 AI 项目。
            </p>
          </div>
          <div>
            <h2 className="text-xs text-dark-tertiary">浏览</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {LINKS.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-dark-secondary transition-colors hover:text-dark-primary focus-ring">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs text-dark-tertiary">服务领域</h2>
            <ul className="mt-5 space-y-3 text-sm text-dark-secondary">
              <li>供应链计划与异常协同</li>
              <li>制造现场的质量与生产决策</li>
              <li>企业知识与经验沉淀</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-dark-separator pt-6 text-xs text-dark-tertiary md:flex-row md:items-center">
          <span>© 2026 通元问科</span>
          <span>企业 AI，落到业务现场。</span>
        </div>
      </div>
    </footer>
  )
}
