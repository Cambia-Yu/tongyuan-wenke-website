import settlementMd from '@/content/settlement-coordination.md?raw'

export interface Insight {
  id: string
  tag: string
  title: string
  desc: string
  date: string
  body: string
}

export const INSIGHTS_PUBLISHED: Insight[] = [
  {
    id: 'settlement-coordination',
    tag: '技术复盘',
    title: '供应链结算异常协同：架构与决策',
    desc: '如何在存量系统之上新增协同层、划分模型与规则的边界，以及一次测试偏差引发的决策转向。',
    date: '2026 年 8 月',
    body: settlementMd,
  },
]
