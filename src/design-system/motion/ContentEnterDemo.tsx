import { useState } from 'react'
import { Button } from '../components/button/Button'
import './motion-demos.css'

const DEMO_CARDS = [
  { title: '问题现场', copy: '历史报告分散在不同系统，研究任务需要反复查找依据。' },
  { title: '范围收敛', copy: '先把可验证的能力与尚未证明的目标分开。' },
  { title: '验证链路', copy: '每一段生成内容都能回到来源依据。' },
]

/**
 * TYWK/Motion/ContentEnter — 内容进入动效样板。
 * 560ms 内透明度 0→1、上移 12px，多元素依次延迟 80ms；
 * 只执行一次，不循环。
 */
export function ContentEnterDemo() {
  const [round, setRound] = useState(0)

  return (
    <div className="tywk-motion-demo">
      <Button variant="secondary" size="md" onClick={() => setRound((value) => value + 1)}>
        重新播放
      </Button>
      <div key={round} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {DEMO_CARDS.map((card) => (
          <div key={card.title} className="tywk-enter-demo__card is-entered tywk-motion-safe">
            <h4>{card.title}</h4>
            <p>{card.copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
