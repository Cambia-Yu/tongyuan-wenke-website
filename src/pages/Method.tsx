import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import PageIntro from '@/components/site/PageIntro'
import SiteCta from '@/components/site/SiteCta'
import { ArticleRail } from '@/design-system/components'

const JUDGEMENTS = [
  ['这件事真的发生过吗', '先看一项近期发生、结果已知的业务事项。谁触发、谁处理、耗时与返工发生在哪里，都要能回到事实。'],
  ['完成它依赖什么证据', '查看实际使用的系统记录、文件、消息、规则和专家判断。没有代表性样本，就不能把演示效果当成项目依据。'],
  ['谁使用，谁对结果负责', '业务负责人、经办人、规则确认人和技术角色需要进入同一张责任表。没有使用者和责任岗位，项目不进入实施。'],
]

const PROCESS = [
  ['取一个真实事项', '不从“建设一个平台”开始，而从最近发生的一笔差异、一次报告任务或一个具体判断开始。', '真实事项样本与首期边界'],
  ['把工作重新走一遍', '沿着角色、证据、系统、规则和结果还原现场，找出信息在哪断开、判断在哪反复。', '当前流程与任务定义'],
  ['只验证最关键的未知', '用历史样本测试最可能让方案失效的假设，不为尚未证明的部分提前建设完整系统。', '验证计划、评测样本与错误记录'],
  ['通过后再进入实际工作', '只有结果达到约定标准、风险有控制方式、维护责任明确，能力才接入正式流程。', '阶段结论与生产接入方案'],
]

const METHOD_NAV = [
  { label: '项目判断', href: '#judgement' },
  { label: '工作过程', href: '#process' },
  { label: '责任边界', href: '#responsibility' },
  { label: '阶段放行', href: '#decision' },
  { label: '交付与条件', href: '#conditions' },
]

function SectionHead({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[48px_1fr] sm:items-start">
      <span className="pt-1 text-xs tabular-nums text-label-quaternary">{index}</span>
      <div>
        <p className="text-xs text-label-tertiary">{label}</p>
        <h2 className="mt-4 max-w-[680px] text-3xl font-semibold leading-tight tracking-[-0.025em] text-label-primary sm:text-4xl">{title}</h2>
      </div>
    </div>
  )
}

export default function Method() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Nav />
      <main>
        <PageIntro eyebrow="工作方法" title="AI 项目的判断与验证" desc="先确认问题真实、结果可验证、责任有人承担，再决定是否投入建设。" />

        <article className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14 lg:px-8">
          <aside className="hidden lg:block"><ArticleRail label="工作方法" items={METHOD_NAV} /></aside>

          <div className="min-w-0">
            <section id="judgement" className="scroll-mt-28 pb-20">
              <SectionHead index="01" label="项目判断" title="先判断是否值得做" />
              <p className="mt-7 max-w-[690px] text-base leading-8 text-label-secondary">我们不先讨论模型、Agent 或系统形态。只要下面三个问题还有一个说不清，项目就应该补证、缩小或暂缓。</p>
              <div className="mt-10 max-w-[760px] divide-y divide-separator border-y border-separator">
                {JUDGEMENTS.map(([title, body], index) => (
                  <div key={title} className="grid gap-3 py-7 sm:grid-cols-[36px_190px_1fr] sm:gap-6">
                    <span className="text-xs tabular-nums text-label-quaternary">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-base font-semibold leading-6 text-label-primary">{title}</h3>
                    <p className="text-[15px] leading-7 text-label-secondary">{body}</p>
                  </div>
                ))}
              </div>
              <aside className="mt-12 max-w-[760px] rounded-[22px] bg-[#f0f3f1] px-6 py-8 sm:px-9">
                <p className="text-xs text-label-tertiary">真实项目中的转向</p>
                <p className="mt-5 text-lg leading-8 text-label-primary">一个供应链结算项目最初被描述为“提高对账效率”。现场还原后发现，ERP、CRM 已经存在，真正反复消耗时间的是合同、回单、供应商说明和沟通记录之间的证据断裂。项目因此转向异常协同与证据归集，没有重做交易系统。</p>
                <Link to="/projects/settlement-coordination" className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-label-primary focus-ring">查看项目实践 <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
              </aside>
            </section>

            <section id="process" className="scroll-mt-28 border-t border-separator py-20">
              <SectionHead index="02" label="工作过程" title="从一件事开始" />
              <p className="mt-7 max-w-[690px] text-base leading-8 text-label-secondary">每一步都要形成可以检查的结果。下一步不是默认发生，而是由上一阶段的证据决定。</p>
              <div className="mt-12 max-w-[760px]">
                {PROCESS.map(([title, body, output], index) => (
                  <div key={title} className="grid gap-4 border-t border-separator py-8 first:border-t-0 first:pt-0 sm:grid-cols-[48px_1fr]">
                    <span className="text-xs tabular-nums text-label-quaternary">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-label-primary">{title}</h3>
                      <p className="mt-3 text-[15px] leading-7 text-label-secondary">{body}</p>
                      <p className="mt-4 text-xs leading-5 text-label-tertiary">形成：{output}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="responsibility" className="scroll-mt-28 border-t border-separator py-20">
              <SectionHead index="03" label="责任边界" title="明确人和系统的职责" />
              <div className="mt-12 grid max-w-[760px] gap-10 md:grid-cols-3">
                {[
                  ['模型', '理解与解释', '从非结构化材料中提取信息、理解语义、组织上下文并生成建议。'],
                  ['规则与原系统', '计算与正式记录', '金额计算、权限控制、交易、审批与审计继续由确定性规则和原系统承担。'],
                  ['业务人员', '确认与负责', '判断材料是否适用、结论能否采信，并对最终业务决定负责。'],
                ].map(([label, title, body]) => <div key={label}><p className="text-xs text-label-tertiary">{label}</p><h3 className="mt-4 text-lg font-semibold text-label-primary">{title}</h3><p className="mt-3 text-sm leading-7 text-label-secondary">{body}</p></div>)}
              </div>
              <p className="mt-12 max-w-[760px] rounded-[20px] bg-[#eef3f1] px-6 py-5 text-base leading-8 text-label-primary">一次结算测试中，模型处理税率精度时出现数千元偏差。此后金额计算交给规则执行，模型只负责提取和解释。</p>
            </section>

            <section id="decision" className="scroll-mt-28 border-t border-separator py-20">
              <SectionHead index="04" label="阶段放行" title="项目只按证据继续" />
              <p className="mt-7 max-w-[690px] text-base leading-8 text-label-secondary">每次阶段评审只做三种决定。没有达到约定标准，不把“再优化一下”当成默认答案。</p>
              <dl className="mt-10 grid max-w-[760px] gap-8 sm:grid-cols-3">
                <div><dt className="text-lg font-semibold text-label-primary">继续</dt><dd className="mt-2 text-sm leading-6 text-label-secondary">关键假设已经通过</dd></div>
                <div><dt className="text-lg font-semibold text-label-primary">调整</dt><dd className="mt-2 text-sm leading-6 text-label-secondary">任务或技术路线需要改变</dd></div>
                <div><dt className="text-lg font-semibold text-label-primary">停止</dt><dd className="mt-2 text-sm leading-6 text-label-secondary">价值或条件不再成立</dd></div>
              </dl>
              <aside className="mt-12 max-w-[760px] rounded-[22px] bg-[#f4f1ec] px-6 py-8 sm:px-9">
                <p className="text-xs text-label-tertiary">知识库项目的范围收敛</p>
                <p className="mt-4 text-base leading-8 text-label-primary">供应链研究机构知识库早期曾指向直接生成报告。梳理资料与验收边界后，首期改为验证资料入库、检索、引用、报告初稿与来源追溯，没有把自动生成正式对外报告写入承诺。</p>
                <Link to="/projects/supply-chain-research-kb-poc" className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-label-primary focus-ring">查看项目实践 <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
              </aside>
            </section>

            <section id="conditions" className="scroll-mt-28 border-t border-separator pt-20">
              <SectionHead index="05" label="交付与条件" title="留下可用资产" />
              <p className="mt-7 max-w-[690px] text-base leading-8 text-label-secondary">除了原型或工作台，项目还会留下任务定义、系统边界、评测样本、错误记录和责任表。</p>
              <div className="mt-12 grid max-w-[760px] gap-12 sm:grid-cols-2">
                <div><h3 className="text-xl font-semibold text-label-primary">适合启动</h3><ul className="mt-5 space-y-3 text-[15px] leading-7 text-label-secondary"><li>有一项近期真实业务事项</li><li>有明确负责人和实际使用者</li><li>材料可以合规取得，结果能够核对</li></ul></div>
                <div><h3 className="text-xl font-semibold text-label-primary">先不要启动</h3><ul className="mt-5 space-y-3 text-[15px] leading-7 text-label-secondary"><li>只有宽泛的 AI 建设目标</li><li>真实样本、数据权利或业务口径不清</li><li>错误风险无法得到控制</li></ul></div>
              </div>
            </section>
          </div>
        </article>
        <SiteCta desc="带来一项最近发生、结果可以核对的业务问题。我们先完成项目准入与任务拆解，再决定下一步。" />
      </main>
      <Footer />
    </div>
  )
}
