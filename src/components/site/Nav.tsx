import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ChevronDown, Menu, X } from 'lucide-react'
import { RESEARCH_KB_PROJECT } from '@/data/siteContent'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" aria-label="通元问科首页" className="flex items-center gap-2 focus-ring">
      <span
        className={`flex h-[26px] w-[26px] items-center justify-center rounded-md text-[13px] font-semibold ${
          dark ? 'bg-white text-black' : 'bg-[rgba(0,0,0,0.9)] text-white'
        }`}
      >
        问
      </span>
      <span className={`text-base font-medium ${dark ? 'text-dark-primary' : 'text-label-primary'}`}>通元问科</span>
    </Link>
  )
}

const NAV_GROUPS = [
  {
    label: '首页',
    root: '/',
    links: [{ label: '首页', href: '/' }],
  },
  {
    label: '服务领域',
    root: '/services',
    links: [
      { label: '概述', href: '/services' },
      { label: '供应链', href: '/services#supply-chain' },
      { label: '制造', href: '/services#manufacturing' },
      { label: '企业知识', href: '/services#knowledge' },
    ],
  },
  {
    label: '项目实践',
    root: '/projects',
    links: [
      { label: '概述', href: '/projects' },
      { label: RESEARCH_KB_PROJECT.navLabel, href: RESEARCH_KB_PROJECT.href },
      { label: '供应链结算异常协同', href: '/projects/settlement-coordination' },
    ],
  },
  {
    label: '工作方法',
    root: '/approach',
    links: [
      { label: '项目判断与验证', href: '/approach' },
    ],
  },
  {
    label: '关于我们',
    root: '/about',
    links: [{ label: '关于我们', href: '/about' }],
  },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const location = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-[500] border-b border-transparent bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Logo />
        <nav aria-label="主导航" className="hidden h-full items-center gap-3 md:flex">
          {NAV_GROUPS.map((group) => {
            const active = location.pathname === group.root || location.pathname.startsWith(`${group.root}/`)
            const directLink = group.links.length <= 1

            if (directLink) {
              return (
                <Link
                  key={group.root}
                  to={group.links[0]?.href ?? group.root}
                  className={`rounded-lg px-2 py-1 text-sm transition-colors hover-fill-1 focus-ring ${
                    active ? 'font-medium text-label-primary' : 'text-label-secondary'
                  }`}
                >
                  {group.label}
                </Link>
              )
            }

            return (
              <div key={group.root} className="group relative flex h-full items-center">
                <span
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm transition-colors hover-fill-1 focus-ring ${
                    active ? 'font-medium text-label-primary' : 'text-label-secondary'
                  }`}
                >
                  {group.label}
                  <ChevronDown size={13} className="transition-transform duration-200 group-hover:rotate-180" />
                </span>
                <div className="invisible absolute left-1/2 top-full w-max min-w-[164px] -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-lg border border-separator bg-white p-1">
                    <div className="grid">
                      {group.links.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block whitespace-nowrap rounded-md px-3 py-2 text-sm text-label-primary transition-colors hover-fill-1 focus-ring"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <Link
            to="/contact"
            className="ml-1 inline-flex h-8 items-center rounded-[10px] bg-[rgba(0,0,0,0.9)] px-3 text-sm font-medium text-white transition-all hover:bg-[#252525] active:translate-y-px focus-ring"
          >
            商务咨询
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-lg p-1.5 text-label-primary hover-fill-1 focus-ring md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav aria-label="移动端主导航" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-separator bg-white px-4 py-3 md:hidden">
          {NAV_GROUPS.map((group) => {
            const expanded = mobileGroup === group.root
            if (group.links.length <= 1) {
              return (
                <Link
                  key={group.root}
                  to={group.links[0]?.href ?? group.root}
                  onClick={() => setOpen(false)}
                  className="block border-b border-separator px-2 py-4 text-base text-label-primary focus-ring"
                >
                  {group.label}
                </Link>
              )
            }
            return (
              <div key={group.root} className="border-b border-separator">
                <button
                  type="button"
                  onClick={() => setMobileGroup(expanded ? null : group.root)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between px-2 py-4 text-left text-base text-label-primary focus-ring"
                >
                  {group.label}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                </button>
                {expanded && (
                  <div className="grid gap-1 pb-3">
                    {group.links.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-2 py-3 text-sm font-medium text-label-primary hover-fill-1 focus-ring"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex h-11 items-center justify-center rounded-xl bg-[rgba(0,0,0,0.9)] px-4 text-base font-medium text-white focus-ring"
          >
            商务咨询
          </Link>
        </nav>
      )}
    </header>
  )
}
