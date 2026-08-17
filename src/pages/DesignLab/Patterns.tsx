import { useState } from 'react'
import { Button, Checkbox, Input, Select, StatusBadge, SubmitSuccess, Textarea } from '@/design-system/components'

/**
 * Patterns：组件组合成的页面模式。
 * 这里只说明组合方式，不引入独立样式；视觉全部来自组件与 Tokens。
 */
export default function Patterns() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="dl-foundation">
      <header className="dl-foundation__head">
        <h1>Patterns 页面模式</h1>
        <p>组件如何组合成真实页面区块。以下模式全部复用 Registry 中的组件，不产生新样式。</p>
      </header>

      <section className="dl-block">
        <h2>咨询表单</h2>
        <p className="dl-prose">
          组合：Input × 2 + Select + Textarea + Checkbox + Button/Primary。
          提交成功后原位替换为 SubmitSuccess。与官网 /contact 的表单字段一一对应。
        </p>
        <div className="dl-pattern">
          {submitted ? (
            <SubmitSuccess onReset={() => setSubmitted(false)} />
          ) : (
            <form
              className="dl-pattern__form"
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)
              }}
            >
              <div className="dl-pattern__grid">
                <Input label="姓名" required placeholder="怎么称呼你" />
                <Input label="联系方式" required placeholder="手机、微信或企业邮箱" />
              </div>
              <Select label="想讨论的方向" required>
                <option value="">请选择</option>
                <option value="supply-chain">供应链计划与异常协同</option>
                <option value="manufacturing">制造质量、设备与生产决策</option>
                <option value="knowledge">企业知识与经验复用</option>
                <option value="assessment">AI 项目判断与验证</option>
                <option value="other">其他问题</option>
              </Select>
              <Textarea label="补充说明" placeholder="简单说明当前问题、已有系统或希望讨论的内容" />
              <Checkbox label="同意通元问科仅将以上信息用于回复本次咨询" />
              <Button type="submit" variant="primary" size="lg">提交咨询</Button>
            </form>
          )}
        </div>
      </section>

      <section className="dl-block">
        <h2>项目案例叙事的开头</h2>
        <p className="dl-prose">
          组合：章节标记 + 卡片标题 + 正文 + StatusBadge。
          用于 /projects 详情页开头的「问题现场」段落，状态标记陈述事实而不是装饰。
        </p>
        <div className="dl-pattern dl-pattern--prose">
          <p className="dl-pattern__kicker">项目实践 · 供应链知识库 PoC</p>
          <h3>把历史规划报告变成可追溯的研究知识库</h3>
          <p>
            历史报告和政策资料分散，研究任务需要反复查找、整理和回溯依据。
            PoC 将这一过程拆成资料解析、建立索引、按需求召回相关片段和展示来源，
            研究人员仍负责判断材料是否适用。
          </p>
          <div className="dl-pattern__row">
            <StatusBadge tone="success">范围已确认</StatusBadge>
            <StatusBadge tone="pending">检索效果仍待验证</StatusBadge>
          </div>
        </div>
      </section>

      <section className="dl-block">
        <h2>栏目页标题</h2>
        <p className="dl-prose">
          组合：章节标记（衬线小标题规则）+ 页面标题 + 一句话说明。标题末尾不使用句号。
        </p>
        <div className="dl-pattern dl-pattern--prose">
          <p className="dl-pattern__kicker">服务领域</p>
          <h3>从真实事项进入，先验证再扩大</h3>
          <p>围绕供应链、制造与企业知识三类高频决策场景，把 AI 能力收敛为可验证的工作流程。</p>
        </div>
      </section>
    </div>
  )
}
