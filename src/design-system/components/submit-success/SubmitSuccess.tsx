import { Check } from 'lucide-react'
import { Button } from '../button/Button'
import './submit-success.css'

export interface TywkSubmitSuccessProps {
  /** 进入动画，默认开启；嵌在即时替换的表单位置时保持开启即可 */
  animate?: boolean
  /** 提供后显示「再提交一个问题」按钮 */
  onReset?: () => void
}

/**
 * TYWK/Feedback/SubmitSuccess — 咨询提交成功状态。
 * 文案固定为「已收到您的咨询申请，请耐心等候回复。」，不随意改写。
 */
export function SubmitSuccess({ animate = true, onReset }: TywkSubmitSuccessProps) {
  return (
    <div
      className={`tywk-submit-success ${animate ? 'tywk-submit-success--enter tywk-motion-safe' : ''}`}
      role="status"
    >
      <p className="tywk-submit-success__kicker">
        <span className="tywk-submit-success__mark" aria-hidden="true">
          <Check size={12} strokeWidth={3} />
        </span>
        提交成功
      </p>
      <h3 className="tywk-submit-success__title">已收到您的咨询申请，请耐心等候回复。</h3>
      <p className="tywk-submit-success__body">
        我们会先判断问题是否属于通元问科的服务范围，再通过您留下的联系方式回复。
      </p>
      {onReset && (
        <div className="tywk-submit-success__action">
          <Button variant="secondary" size="md" onClick={onReset}>
            再提交一个问题
          </Button>
        </div>
      )}
    </div>
  )
}
