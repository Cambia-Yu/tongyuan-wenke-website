import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

const FLOW = [
  ['01', 'Hero', '建立第一印象', '洞穴向光移动。滚动负责推进视频，白屏后自动显现正文。只保留一个核心命题：让企业 AI 进入实际工作。'],
  ['02', '服务领域', '回答“你们解决什么问题”', '供应链、制造、企业知识。不是产品目录，而是三个真实业务入口。'],
  ['03', '项目实践', '开始提供证据', '用真实项目说明问题如何被重新定义、边界如何收敛、关键工程决策如何形成。'],
  ['04', '工作方法', '解释为什么这样做', '从真实事项、证据、责任和验证开始；模型、规则、原系统与业务人员各自承担清晰职责。'],
  ['05', '关于我们', '解释通元问科的角色', '连接企业业务判断与 AI 工程实施，保持问题定义、项目边界与客户关系连续。'],
  ['06', '洞察', '长期输出判断', '把企业 AI、FDE、真实业务流程和技术变化沉淀为公开内容，而不是公司新闻。'],
]

const PAGES = [
  ['服务 / Services', '帮助企业判断“我的问题是否属于你们能处理的范围”', '供应链 · 制造 · 企业知识'],
  ['项目 / Projects', '证明能力，不把方案、原型或 PoC 写成已经生产上线', '真实问题 · 关键决策 · 边界 · 证据'],
  ['方法 / Approach', '把项目工作方式讲清楚，而不是堆方法论名词', '准入 · 还原任务 · 验证 · 阶段放行'],
  ['洞察 / Insights', '展示公司对企业 AI 的持续理解与判断', 'CEO Blog · 技术复盘 · 行业变化'],
  ['关于 / About', '说明我们负责什么、与客户和技术伙伴如何协作', '角色 · 责任 · 合作关系'],
  ['开始交流 / Contact', '把商务咨询变成一次有上下文的业务问题交流', '问题 · 场景 · 联系方式'],
]

const VISUAL = [
  ['Cinematic opening', 'Hero 使用冷黑蓝、真实空间、强纵深和可控光线。它是品牌开场，不延伸成整站主题公园。'],
  ['Editorial technology', '正文进入冷白背景、大字号、强网格和大量留白。更接近高端技术出版物，而不是传统咨询公司或 SaaS。'],
  ['Evidence over decoration', '优先展示项目材料、架构片段、工作轨迹、证据关系。减少无意义卡片、粒子、渐变和“AI 图标”。'],
  ['Quiet motion', '动画只服务信息切换与空间连续性。元素不四处飞入；滚动、渐显和状态切换保持缓慢、连续、有物理感。'],
]

const TOKENS = [
  ['#05070A', '夜黑', 'Hero / 深色状态'],
  ['#0D1622', '蓝黑', '洞穴与深色层次'],
  ['#F7F9FA', '冷白', '正文主背景'],
  ['#E9EEF2', '雾灰', '分区与弱强调'],
  ['#161A1D', '墨黑', '正文主文字'],
  ['#7D8B96', '冷灰', '辅助文字与元信息'],
]

function SectionTitle({ index, label, title, desc }: { index: string; label: string; title: string; desc?: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[150px_minmax(0,1fr)]">
      <div className="flex items-start gap-3 pt-1 text-xs uppercase tracking-[0.14em] text-[#7d8b96]">
        <span className="tabular-nums">{index}</span>
        <span>{label}</span>
      </div>
      <div>
        <h2 className="max-w-4xl text-[2rem] font-medium leading-[1.15] tracking-[-0.035em] text-[#161a1d] sm:text-[2.7rem]">{title}</h2>
        {desc && <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#66727b] sm:text-base sm:leading-8">{desc}</p>}
      </div>
    </div>
  )
}

export default function WebsiteDirection() {
  return (
    <div className="min-h-screen bg-[#f7f9fa] text-[#161a1d]">
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#f7f9fa]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#11161b] text-[11px] font-semibold text-white">问</span>
            <span className="text-sm font-medium">通元问科 · Website Direction v1</span>
          </div>
          <a href="/legacy" className="inline-flex items-center gap-1.5 text-xs text-[#66727b] transition-colors hover:text-[#161a1d]">
            查看旧版官网 <ArrowUpRight size={13} />
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#06090d] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(132,175,215,0.22),transparent_26%),radial-gradient(circle_at_58%_82%,rgba(67,103,137,0.18),transparent_30%)]" />
          <div className="relative mx-auto flex min-h-[72vh] max-w-[1380px] flex-col justify-between px-5 pb-10 pt-20 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12 lg:pb-16">
            <div className="max-w-5xl">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Website redesign · direction before execution</p>
              <h1 className="mt-8 max-w-5xl text-[3rem] font-medium leading-[0.98] tracking-[-0.055em] sm:text-[4.7rem] lg:text-[6.4rem]">
                让企业 AI<br />进入实际工作
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
                新官网不是给旧网站换一层皮肤。它要让访客依次理解：我们处理什么问题、怎样证明能力、为什么这样工作，以及怎样开始第一次合作。
              </p>
            </div>
            <div className="mt-20 grid gap-5 border-t border-white/12 pt-7 text-xs text-white/48 sm:grid-cols-3">
              <div><span className="block text-white/28">Opening</span><span className="mt-2 block text-white/72">洞穴视频 Hero · 已验证交互</span></div>
              <div><span className="block text-white/28">Body</span><span className="mt-2 block text-white/72">Editorial × Technology</span></div>
              <div><span className="block text-white/28">Priority</span><span className="mt-2 block text-white/72">内容证据高于视觉装饰</span></div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <SectionTitle index="01" label="Information architecture" title="首页是一条认知路径，不是一组栏目" desc="首页只做一件事：让第一次进入网站的人，在几分钟内建立对通元问科的完整判断。二级页面负责继续提供证据。" />

          <div className="mt-16 border-t border-black/10">
            {FLOW.map(([num, label, role, body]) => (
              <article key={num} className="grid gap-5 border-b border-black/10 py-8 sm:grid-cols-[72px_180px_0.8fr_1.35fr] sm:gap-8 sm:py-9">
                <span className="text-xs tabular-nums text-[#8a969f]">{num}</span>
                <h3 className="text-lg font-medium tracking-[-0.02em]">{label}</h3>
                <p className="text-sm font-medium leading-6 text-[#3c454c]">{role}</p>
                <p className="max-w-2xl text-sm leading-7 text-[#6a757d]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
            <SectionTitle index="02" label="Homepage flow" title="洞穴结束后，网站马上回到业务" desc="Hero 的戏剧性只负责开场。出洞、白化、服务领域自动显现以后，正文不继续追求场景化叙事，而是进入清晰、克制的企业技术内容。" />

            <div className="mt-16 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="min-h-[520px] rounded-[28px] bg-[#070b10] p-7 text-white sm:p-10 lg:p-12">
                <div className="flex h-full min-h-[430px] flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/35">00 — Hero</p>
                    <h3 className="mt-10 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl">从洞穴走向光</h3>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/52">滚动推进视频。到纯白屏时停止滚动接管，随后自动过渡到“服务领域”。不把白屏当页面，不把项目实践提前到第一屏。</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/38"><ArrowDownRight size={14} /> scroll-driven video → white handoff → services</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[28px] border border-black/[0.07] bg-[#f7f9fa] p-7 sm:p-8">
                  <p className="text-xs text-[#8a969f]">01 — 服务领域</p>
                  <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em]">三个业务入口</h3>
                  <p className="mt-4 text-sm leading-7 text-[#69757d]">供应链、制造、企业知识。强调问题和工作，不做产品 SKU 陈列。</p>
                </div>
                <div className="rounded-[28px] border border-black/[0.07] bg-[#edf1f4] p-7 sm:p-8">
                  <p className="text-xs text-[#7d8b96]">02 — 项目实践</p>
                  <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em]">用项目开始证明</h3>
                  <p className="mt-4 text-sm leading-7 text-[#66727b]">先给事实、问题和取舍，再谈能力。视觉更接近 case study，而不是营销卡片。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <SectionTitle index="03" label="Visual language" title="Cinematic opening，Editorial technology body" desc="视觉系统要同时容纳一个有记忆点的品牌开场和一个可信、可长期扩展的企业内容系统。" />

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {VISUAL.map(([title, body], index) => (
              <article key={title} className="min-h-[250px] rounded-[26px] border border-black/[0.07] bg-white p-7 sm:p-9">
                <p className="text-xs tabular-nums text-[#9aa4ab]">0{index + 1}</p>
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#68737b]">{body}</p>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-xs uppercase tracking-[0.14em] text-[#87939c]">Color direction</p>
            <div className="mt-5 grid gap-px overflow-hidden rounded-[22px] bg-black/10 sm:grid-cols-3 lg:grid-cols-6">
              {TOKENS.map(([hex, name, usage]) => (
                <div key={hex} className="bg-white">
                  <div className="h-28" style={{ backgroundColor: hex }} />
                  <div className="p-4">
                    <p className="text-xs font-medium">{name}</p>
                    <p className="mt-1 text-[11px] text-[#8a969f]">{hex}</p>
                    <p className="mt-3 text-xs leading-5 text-[#6e7981]">{usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a0e13] text-white">
          <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[150px_minmax(0,1fr)]">
              <div className="text-xs uppercase tracking-[0.14em] text-white/34">04 · Layout</div>
              <div>
                <h2 className="max-w-4xl text-[2.2rem] font-medium leading-[1.1] tracking-[-0.04em] sm:text-[3.2rem]">每种内容使用不同的视觉语法</h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/48">新版不再让所有页面都变成“标题 + 描述 + 三张卡片”。服务、项目、方法、洞察和关于我们应该有不同的阅读节奏。</p>
              </div>
            </div>

            <div className="mt-16 border-t border-white/12">
              {PAGES.map(([name, job, format]) => (
                <div key={name} className="grid gap-4 border-b border-white/12 py-8 md:grid-cols-[0.6fr_1.4fr_0.8fr] md:gap-10">
                  <h3 className="text-base font-medium text-white/88">{name}</h3>
                  <p className="text-sm leading-7 text-white/50">{job}</p>
                  <p className="text-xs leading-6 text-white/32">{format}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
            <SectionTitle index="05" label="Motion & responsive" title="动效不能破坏浏览器原生滚动" desc="Hero 是唯一允许更强交互接管的区域；离开 Hero 后，默认回到正常网页。移动端不强行复刻桌面构图，而是使用独立 9:16 视频和更紧凑的排版系统。" />

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <div><p className="text-xs text-[#8a969f]">Motion 01</p><h3 className="mt-4 text-lg font-medium">连续，而非跳页</h3><p className="mt-3 text-sm leading-7 text-[#69757d]">除了 Hero 白屏 handoff，不使用 scroll snap、整页阀门和反向滚动锁。</p></div>
              <div><p className="text-xs text-[#8a969f]">Motion 02</p><h3 className="mt-4 text-lg font-medium">显现，而非飞入</h3><p className="mt-3 text-sm leading-7 text-[#69757d]">正文以 opacity、轻微位移和状态切换为主，减少明显组件动画。</p></div>
              <div><p className="text-xs text-[#8a969f]">Responsive 03</p><h3 className="mt-4 text-lg font-medium">移动端重新构图</h3><p className="mt-3 text-sm leading-7 text-[#69757d]">Hero 使用 9:16 独立素材；项目、服务和文章根据内容重新排版，不做桌面版机械缩放。</p></div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.07] bg-[#eef2f5]">
          <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <p className="text-xs uppercase tracking-[0.14em] text-[#84919a]">Next build</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="max-w-4xl text-4xl font-medium leading-[1.06] tracking-[-0.04em] sm:text-5xl">先完成首页，再抽取整站视觉系统</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#65717a]">下一阶段：首页 Hero 接入已验证的视频交互，完成服务领域、项目实践、工作方法、About、Insights 与最终 CTA。首页确认后再迁移二级页面。</p>
              </div>
              <div className="text-xs text-[#8a969f]">Branch · redesign/website-v1</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
