import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Button, Input, SubmitSuccess, Textarea } from '@/design-system/components'
import './contact.css'

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [interest, setInterest] = useState('')
  const [problem, setProblem] = useState('')
  const [website, setWebsite] = useState('')
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState('')

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !contact.trim() || !interest || !consent) {
      setError('请填写姓名、联系方式和咨询方向，并确认信息使用说明')
      setState('error')
      return
    }

    setError('')
    setState('sending')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          contact: contact.trim(),
          interest,
          problem: problem.trim(),
          website,
          sourceUrl: `${window.location.origin}${window.location.pathname}${window.location.hash}`,
          consent: true,
        }),
      })

      const result = await response.json().catch(() => ({})) as { message?: string }
      if (!response.ok) throw new Error(result.message || '暂时未能提交，请稍后再试')
      setState('success')
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : '暂时未能提交，请稍后再试')
      setState('error')
    }
  }

  const submitAnother = () => {
    setName('')
    setCompany('')
    setContact('')
    setInterest('')
    setProblem('')
    setWebsite('')
    setConsent(false)
    setError('')
    setState('idle')
  }

  if (state === 'success') {
    return <SubmitSuccess onReset={submitAnother} />
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="姓名" required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="怎么称呼你" />
        <Input label="公司或组织（选填）" value={company} onChange={(event) => setCompany(event.target.value)} autoComplete="organization" placeholder="公司或组织名称" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input label="联系方式" required value={contact} onChange={(event) => setContact(event.target.value)} autoComplete="email" placeholder="手机、微信或企业邮箱" />
        <label className="text-xs text-label-tertiary">想讨论的方向 <span aria-hidden="true">*</span>
          <select className="contact-select mt-2" value={interest} onChange={(event) => setInterest(event.target.value)}>
            <option value="">请选择</option>
            <option value="supply-chain">供应链计划与异常协同</option>
            <option value="manufacturing">制造质量、设备与生产决策</option>
            <option value="knowledge">企业知识与经验复用</option>
            <option value="assessment">AI 项目判断与验证</option>
            <option value="partnership">伙伴合作</option>
            <option value="other">其他问题</option>
          </select>
        </label>
      </div>

      <Textarea className="mt-4" label="补充说明（选填）" value={problem} onChange={(event) => setProblem(event.target.value)} placeholder="简单说明当前问题、已有系统或希望讨论的内容" />

      <label aria-hidden="true" className="absolute -left-[9999px]">网站<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>

      <label className="mt-4 flex items-start gap-2 text-xs leading-5 text-label-tertiary">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-4 w-4 rounded border-separator" />
        <span>同意通元问科仅将以上信息用于回复本次咨询</span>
      </label>

      {error && <p className="mt-3 text-xs text-[#b4232f]" role="alert">{error}</p>}

      <Button type="submit" size="lg" loading={state === 'sending'} className="mt-5 w-full" leftIcon={<Send size={15} />}>
        {state === 'sending' ? '正在提交' : '提交咨询'}
      </Button>
      <p className="mt-3 text-xs leading-5 text-label-tertiary">不会公开你的联系方式，也不会将信息用于无关推广。</p>
    </form>
  )
}
