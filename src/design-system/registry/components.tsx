/**
 * 通元问科设计系统 · 组件 Registry
 * 机器可读的组件清单：其他 AI 先读这里，再按 sourcePath 查源码。
 * 新增组件时必须在此登记，否则工作台不会展示。
 */

import { ArrowRight, X } from 'lucide-react'
import { ArticleRail } from '../components/article-rail/ArticleRail'
import { Button } from '../components/button/Button'
import { Checkbox } from '../components/checkbox/Checkbox'
import { IconButton } from '../components/icon-button/IconButton'
import { Input } from '../components/input/Input'
import { Select } from '../components/select/Select'
import { SectionTabs } from '../components/section-tabs/SectionTabs'
import { SourceTag } from '../components/source-tag/SourceTag'
import { StatusBadge } from '../components/status-badge/StatusBadge'
import { SubmitSuccess } from '../components/submit-success/SubmitSuccess'
import { Textarea } from '../components/textarea/Textarea'
import { TextLink } from '../components/text-link/TextLink'
import type { ComponentEntry } from './types'

// 真实源码：预览与代码面板来自同一份实现
import buttonSource from '../components/button/Button.tsx?raw'
import buttonCss from '../components/button/button.css?raw'
import textLinkSource from '../components/text-link/TextLink.tsx?raw'
import textLinkCss from '../components/text-link/text-link.css?raw'
import iconButtonSource from '../components/icon-button/IconButton.tsx?raw'
import iconButtonCss from '../components/icon-button/icon-button.css?raw'
import inputSource from '../components/input/Input.tsx?raw'
import textareaSource from '../components/textarea/Textarea.tsx?raw'
import selectSource from '../components/select/Select.tsx?raw'
import checkboxSource from '../components/checkbox/Checkbox.tsx?raw'
import formsCss from '../components/forms/forms.css?raw'
import statusBadgeSource from '../components/status-badge/StatusBadge.tsx?raw'
import statusBadgeCss from '../components/status-badge/status-badge.css?raw'
import sourceTagSource from '../components/source-tag/SourceTag.tsx?raw'
import sourceTagCss from '../components/source-tag/source-tag.css?raw'
import articleRailSource from '../components/article-rail/ArticleRail.tsx?raw'
import articleRailCss from '../components/article-rail/article-rail.css?raw'
import sectionTabsSource from '../components/section-tabs/SectionTabs.tsx?raw'
import sectionTabsCss from '../components/section-tabs/section-tabs.css?raw'
import submitSuccessSource from '../components/submit-success/SubmitSuccess.tsx?raw'
import submitSuccessCss from '../components/submit-success/submit-success.css?raw'
import tokensCss from '../foundations/tokens.css?raw'

const UPDATED = '2026-08-14'

const SIZE_CONTROL = {
  name: 'size',
  label: '尺寸',
  options: [
    { value: 'lg', label: '大 44' },
    { value: 'md', label: '中 32' },
    { value: 'sm', label: '小 26' },
  ],
}

const BUTTON_STATE_CONTROL = {
  name: 'state',
  label: '状态',
  options: [
    { value: 'default', label: '默认' },
    { value: 'loading', label: '加载中' },
    { value: 'disabled', label: '禁用' },
  ],
}

const FIELD_STATE_CONTROL = {
  name: 'state',
  label: '状态',
  options: [
    { value: 'default', label: '默认' },
    { value: 'filled', label: '已填写' },
    { value: 'error', label: '错误' },
    { value: 'disabled', label: '禁用' },
  ],
}

function fieldStateProps(state: string) {
  return {
    error: state === 'error' ? '请填写这一项后再提交' : undefined,
    disabled: state === 'disabled',
    defaultValue: state === 'filled' || state === 'error' ? '示例内容' : undefined,
  }
}

export const COMPONENTS: ComponentEntry[] = [
  {
    id: 'TYWK/Action/Button/Primary',
    slug: 'button-primary',
    name: '主按钮 Primary Button',
    category: 'actions',
    maturity: 'stable',
    description: '每屏唯一的主要行动按钮，用于提交、确认、进入下一步。',
    usage: ['表单提交', '页面主要行动（商务咨询、查看项目）', '流程的下一步确认'],
    avoid: ['同一屏出现多个 Primary', '用 Primary 做删除等破坏性操作而不加二次确认', '纯导航场景（应使用 TextLink）'],
    sourcePath: 'src/design-system/components/button/Button.tsx',
    dependencies: [],
    a11y: '原生 button 元素，支持键盘与焦点环；加载态设置 aria-busy 并禁用重复提交。',
    related: ['TYWK/Action/Button/Secondary', 'TYWK/Action/TextLink'],
    updatedAt: UPDATED,
    controls: [SIZE_CONTROL, BUTTON_STATE_CONTROL],
    defaultProps: { size: 'md', state: 'default' },
    render: (props) => (
      <Button
        variant="primary"
        size={props.size as 'lg' | 'md' | 'sm'}
        loading={props.state === 'loading'}
        disabled={props.state === 'disabled'}
        rightIcon={<ArrowRight size={15} />}
      >
        提交咨询
      </Button>
    ),
    code: {
      react: buttonSource,
      css: buttonCss,
      tokens: tokensCss,
      usage: `import { Button } from '@/design-system/components'

<Button variant="primary" size="md">提交咨询</Button>
<Button variant="primary" size="lg" loading>正在提交</Button>`,
    },
  },
  {
    id: 'TYWK/Action/Button/Secondary',
    slug: 'button-secondary',
    name: '次按钮 Secondary Button',
    category: 'actions',
    maturity: 'stable',
    description: '次要行动按钮，与 Primary 搭配出现，视觉权重更低。',
    usage: ['与主按钮并列的次要操作（查看案例、返回）', '工具区的辅助操作（重新播放、重置）'],
    avoid: ['作为页面最主要的行动', '连续堆叠三个以上次按钮'],
    sourcePath: 'src/design-system/components/button/Button.tsx',
    dependencies: [],
    a11y: '同 Primary：原生 button、焦点环、aria-busy。',
    related: ['TYWK/Action/Button/Primary'],
    updatedAt: UPDATED,
    controls: [SIZE_CONTROL, BUTTON_STATE_CONTROL],
    defaultProps: { size: 'md', state: 'default' },
    render: (props) => (
      <Button
        variant="secondary"
        size={props.size as 'lg' | 'md' | 'sm'}
        loading={props.state === 'loading'}
        disabled={props.state === 'disabled'}
      >
        查看项目实践
      </Button>
    ),
    code: {
      react: buttonSource,
      css: buttonCss,
      tokens: tokensCss,
      usage: `import { Button } from '@/design-system/components'

<Button variant="secondary" size="md">查看项目实践</Button>`,
    },
  },
  {
    id: 'TYWK/Action/TextLink',
    slug: 'text-link',
    name: '文字链接 Text Link',
    category: 'actions',
    maturity: 'stable',
    description: '正文与导航中的文字链接，下划线仅在悬浮时划入。',
    usage: ['正文内引用来源或相关页面', '「查看全部」「阅读更多」等出口', '面包屑中的可点击层级'],
    avoid: ['作为主要行动（应使用 Button）', '按钮式的大面积点击区域'],
    sourcePath: 'src/design-system/components/text-link/TextLink.tsx',
    dependencies: [],
    a11y: '原生 a 元素；焦点时同样显示下划线，焦点环可见。',
    related: ['TYWK/Action/Button/Primary'],
    updatedAt: UPDATED,
    controls: [
      {
        name: 'tone',
        label: '类型',
        options: [
          { value: 'accent', label: '强调' },
          { value: 'quiet', label: '弱化' },
        ],
      },
      {
        name: 'arrow',
        label: '箭头',
        options: [
          { value: 'with', label: '带箭头' },
          { value: 'without', label: '无箭头' },
        ],
      },
    ],
    defaultProps: { tone: 'accent', arrow: 'with' },
    render: (props) => (
      <TextLink href="#" tone={props.tone as 'accent' | 'quiet'} withArrow={props.arrow === 'with'} onClick={(e) => e.preventDefault()}>
        查看供应链知识库项目
      </TextLink>
    ),
    code: {
      react: textLinkSource,
      css: textLinkCss,
      usage: `import { TextLink } from '@/design-system/components'

<TextLink href="/projects/supply-chain-research-kb-poc" withArrow>
  查看供应链知识库项目
</TextLink>`,
    },
  },
  {
    id: 'TYWK/Action/IconButton',
    slug: 'icon-button',
    name: '图标按钮 Icon Button',
    category: 'actions',
    maturity: 'review',
    description: '仅图标的操作按钮，用于关闭、展开、更多等辅助动作。',
    usage: ['关闭浮层或菜单', '工具区辅助操作'],
    avoid: ['没有公认含义的图标单独承担关键操作', '省略 aria-label'],
    sourcePath: 'src/design-system/components/icon-button/IconButton.tsx',
    dependencies: [],
    a11y: '必须提供 aria-label；焦点环可见。',
    related: ['TYWK/Action/Button/Secondary'],
    updatedAt: UPDATED,
    controls: [
      {
        name: 'size',
        label: '尺寸',
        options: [
          { value: 'md', label: '中 32' },
          { value: 'sm', label: '小 26' },
        ],
      },
      BUTTON_STATE_CONTROL,
    ],
    defaultProps: { size: 'md', state: 'default' },
    render: (props) => (
      <IconButton aria-label="关闭" size={props.size as 'md' | 'sm'} disabled={props.state === 'disabled'}>
        <X size={props.size === 'sm' ? 14 : 16} />
      </IconButton>
    ),
    code: {
      react: iconButtonSource,
      css: iconButtonCss,
      usage: `import { IconButton } from '@/design-system/components'

<IconButton aria-label="关闭菜单"><X size={16} /></IconButton>`,
    },
  },
  {
    id: 'TYWK/Navigation/SectionTabs',
    slug: 'section-tabs',
    name: '横向章节导航 Section Tabs',
    category: 'navigation',
    maturity: 'stable',
    description: '栏目型页面的横向悬浮章节导航，跟随滚动高亮当前区域。',
    usage: ['服务领域、项目列表、关于我们等栏目页', '同页 2–5 个并列章节'],
    avoid: ['长文章目录（使用 ArticleRail）', '跨页面主导航（使用 SiteHeader）'],
    sourcePath: 'src/design-system/components/section-tabs/SectionTabs.tsx',
    dependencies: [],
    a11y: 'nav 元素带 aria-label；当前章节使用 aria-current=location；窄屏可横向滚动且不隐藏链接。',
    related: ['TYWK/Navigation/ArticleRail'],
    updatedAt: UPDATED,
    controls: [
      {
        name: 'active',
        label: '当前章节',
        options: [
          { value: '#supply-chain', label: '供应链' },
          { value: '#manufacturing', label: '制造' },
          { value: '#knowledge', label: '企业知识' },
        ],
      },
    ],
    defaultProps: { active: '#supply-chain' },
    render: (props) => (
      <SectionTabs
        label="服务领域"
        activeHref={props.active}
        items={[
          { label: '供应链', href: '#supply-chain' },
          { label: '制造', href: '#manufacturing' },
          { label: '企业知识', href: '#knowledge' },
        ]}
      />
    ),
    code: {
      react: sectionTabsSource,
      css: sectionTabsCss,
      tokens: tokensCss,
      usage: `import { SectionTabs } from '@/design-system/components'

<SectionTabs
  label="服务领域"
  items={[
    { label: '供应链', href: '#supply-chain' },
    { label: '制造', href: '#manufacturing' },
    { label: '企业知识', href: '#knowledge' },
  ]}
/>`,
    },
  },
  {
    id: 'TYWK/Form/Input',
    slug: 'input',
    name: '单行输入 Input',
    category: 'forms',
    maturity: 'stable',
    description: '带标签、说明与错误提示的单行输入框，与咨询表单共用同一实现。',
    usage: ['姓名、联系方式等短文本', '需要格式校验并给出错误提示的字段'],
    avoid: ['多行长文本（使用 Textarea）', '只读展示信息（直接排版，不用禁用态冒充）'],
    sourcePath: 'src/design-system/components/input/Input.tsx',
    dependencies: [],
    a11y: 'label 通过 htmlFor 关联；错误信息用 role=alert 朗读；aria-invalid 标记错误态。',
    related: ['TYWK/Form/Textarea', 'TYWK/Form/Select', 'TYWK/Form/Checkbox'],
    updatedAt: UPDATED,
    controls: [FIELD_STATE_CONTROL],
    defaultProps: { state: 'default' },
    render: (props) => (
      <div style={{ maxWidth: 320 }}>
        <Input label="联系方式" required placeholder="手机、微信或企业邮箱" {...fieldStateProps(props.state)} />
      </div>
    ),
    code: {
      react: inputSource,
      css: formsCss,
      tokens: tokensCss,
      usage: `import { Input } from '@/design-system/components'

<Input label="联系方式" required placeholder="手机、微信或企业邮箱" />
<Input label="姓名" required error="请填写姓名后再提交" />`,
    },
  },
  {
    id: 'TYWK/Form/Textarea',
    slug: 'textarea',
    name: '多行输入 Textarea',
    category: 'forms',
    maturity: 'stable',
    description: '多行文本输入，用于问题描述等较长内容，允许纵向拉伸。',
    usage: ['补充说明、问题描述', '需要 2 行以上的自由文本'],
    avoid: ['单行即可完成的字段', '富文本编辑场景（本系统不提供富文本）'],
    sourcePath: 'src/design-system/components/textarea/Textarea.tsx',
    dependencies: [],
    a11y: '同 Input：label 关联、role=alert 错误提示、aria-invalid。',
    related: ['TYWK/Form/Input'],
    updatedAt: UPDATED,
    controls: [FIELD_STATE_CONTROL],
    defaultProps: { state: 'default' },
    render: (props) => (
      <div style={{ maxWidth: 320 }}>
        <Textarea label="补充说明" placeholder="简单说明当前问题、已有系统或希望讨论的内容" {...fieldStateProps(props.state)} />
      </div>
    ),
    code: {
      react: textareaSource,
      css: formsCss,
      usage: `import { Textarea } from '@/design-system/components'

<Textarea label="补充说明" placeholder="简单说明当前问题、已有系统或希望讨论的内容" />`,
    },
  },
  {
    id: 'TYWK/Form/Select',
    slug: 'select',
    name: '下拉选择 Select',
    category: 'forms',
    maturity: 'review',
    description: '样式化的原生下拉选择，保留移动端系统选择器与键盘操作。',
    usage: ['固定选项中的单选（咨询方向、所在行业）', '选项超过 4 个时的单选'],
    avoid: ['2–3 个选项（使用平铺单选）', '需要搜索的长列表（待后续组件）'],
    sourcePath: 'src/design-system/components/select/Select.tsx',
    dependencies: [],
    a11y: '原生 select，完整键盘与屏幕阅读器支持。',
    related: ['TYWK/Form/Input', 'TYWK/Form/Checkbox'],
    updatedAt: UPDATED,
    controls: [FIELD_STATE_CONTROL],
    defaultProps: { state: 'default' },
    render: (props) => (
      <div style={{ maxWidth: 320 }}>
        <Select label="想讨论的方向" required {...fieldStateProps(props.state)}>
          <option value="">请选择</option>
          <option value="supply-chain">供应链计划与异常协同</option>
          <option value="manufacturing">制造质量、设备与生产决策</option>
          <option value="knowledge">企业知识与经验复用</option>
        </Select>
      </div>
    ),
    code: {
      react: selectSource,
      css: formsCss,
      usage: `import { Select } from '@/design-system/components'

<Select label="想讨论的方向" required>
  <option value="">请选择</option>
  <option value="supply-chain">供应链计划与异常协同</option>
</Select>`,
    },
  },
  {
    id: 'TYWK/Form/Checkbox',
    slug: 'checkbox',
    name: '勾选确认 Checkbox',
    category: 'forms',
    maturity: 'review',
    description: '样式化的原生勾选框，用于知情同意与多选确认。',
    usage: ['信息使用授权确认', '多项可叠加的选择'],
    avoid: ['互斥单选（应使用单选组）', '开关式即时生效设置（待 Switch 组件）'],
    sourcePath: 'src/design-system/components/checkbox/Checkbox.tsx',
    dependencies: [],
    a11y: '原生 input[type=checkbox]，label 整行可点，焦点环可见。',
    related: ['TYWK/Form/Input'],
    updatedAt: UPDATED,
    controls: [
      {
        name: 'state',
        label: '状态',
        options: [
          { value: 'unchecked', label: '未勾选' },
          { value: 'checked', label: '已勾选' },
          { value: 'disabled', label: '禁用' },
        ],
      },
    ],
    defaultProps: { state: 'unchecked' },
    render: (props) => (
      <Checkbox
        label="同意通元问科仅将以上信息用于回复本次咨询"
        defaultChecked={props.state === 'checked'}
        disabled={props.state === 'disabled'}
      />
    ),
    code: {
      react: checkboxSource,
      css: formsCss,
      usage: `import { Checkbox } from '@/design-system/components'

<Checkbox label="同意通元问科仅将以上信息用于回复本次咨询" />`,
    },
  },
  {
    id: 'TYWK/Status/StatusBadge',
    slug: 'status-badge',
    name: '状态标记 Status Badge',
    category: 'status',
    maturity: 'stable',
    description: '事实状态标记：已确认、仍待验证、已核实等，只陈述状态不作装饰。',
    usage: ['项目阶段与验证状态', '材料核实状态（已核实 / 待补充）', '系统运行状态'],
    avoid: ['营销式标签（「热门」「推荐」）', '可点击的筛选条件（那不是状态）'],
    sourcePath: 'src/design-system/components/status-badge/StatusBadge.tsx',
    dependencies: [],
    a11y: '状态以文字表达，颜色不是唯一信息载体；pending 呼吸动画遵循减少动态效果设置。',
    related: ['TYWK/Status/SourceTag'],
    updatedAt: UPDATED,
    controls: [
      {
        name: 'tone',
        label: '类型',
        options: [
          { value: 'success', label: '成功 / 已确认' },
          { value: 'pending', label: '进行中 / 待验证' },
          { value: 'error', label: '错误' },
          { value: 'neutral', label: '中性' },
        ],
      },
    ],
    defaultProps: { tone: 'success' },
    render: (props) => {
      const label = { success: '已经确认', pending: '仍待验证', error: '提交失败', neutral: '边界已记录' }[props.tone] ?? '已经确认'
      return <StatusBadge tone={props.tone as 'success' | 'pending' | 'error' | 'neutral'}>{label}</StatusBadge>
    },
    code: {
      react: statusBadgeSource,
      css: statusBadgeCss,
      tokens: tokensCss,
      usage: `import { StatusBadge } from '@/design-system/components'

<StatusBadge tone="success">已经确认</StatusBadge>
<StatusBadge tone="pending">仍待验证</StatusBadge>`,
    },
  },
  {
    id: 'TYWK/Status/SourceTag',
    slug: 'source-tag',
    name: '来源标签 Source Tag',
    category: 'status',
    maturity: 'stable',
    description: '证据来源标签，把一段结论关联到具体材料编号。',
    usage: ['案例叙事中的依据标注', '数据与结论的来源追溯', '与证据清单编号一一对应'],
    avoid: ['与证据无关的装饰性编号', '替代正文中的完整引用说明'],
    sourcePath: 'src/design-system/components/source-tag/SourceTag.tsx',
    dependencies: [],
    a11y: '纯文本标记，编号与名称同时呈现，不依赖颜色。',
    related: ['TYWK/Status/StatusBadge'],
    updatedAt: UPDATED,
    controls: [
      {
        name: 'kind',
        label: '示例',
        options: [
          { value: 'record', label: '系统记录' },
          { value: 'doc', label: '业务文件' },
          { value: 'interview', label: '访谈纪要' },
        ],
      },
    ],
    defaultProps: { kind: 'record' },
    render: (props) => {
      const map: Record<string, [string, string]> = {
        record: ['01', '系统记录'],
        doc: ['02', '业务文件'],
        interview: ['03', '访谈纪要'],
      }
      const [index, label] = map[props.kind] ?? map.record
      return <SourceTag index={index}>{label}</SourceTag>
    },
    code: {
      react: sourceTagSource,
      css: sourceTagCss,
      usage: `import { SourceTag } from '@/design-system/components'

<SourceTag index="01">系统记录</SourceTag>
<SourceTag index="02">业务文件</SourceTag>`,
    },
  },
  {
    id: 'TYWK/Navigation/ArticleRail',
    slug: 'article-rail',
    name: '纵向文章导航 Article Rail',
    category: 'navigation',
    maturity: 'stable',
    description: '长文章的纵向悬浮导航，跟随滚动高亮当前章节。',
    usage: ['项目详情页、长文章页', '章节超过 3 个的长内容'],
    avoid: ['栏目切换（使用横向栏目导航）', '短页面（直接滚动即可）'],
    sourcePath: 'src/design-system/components/article-rail/ArticleRail.tsx',
    dependencies: [],
    a11y: 'nav 元素带 aria-label；当前章节用 aria-current=location 标记；sticky 定位不遮挡内容。',
    related: ['TYWK/Action/TextLink'],
    updatedAt: UPDATED,
    controls: [
      {
        name: 'active',
        label: '当前章节',
        options: [
          { value: '#problem', label: '问题现场' },
          { value: '#scope', label: '范围收敛' },
          { value: '#verify', label: '验证链路' },
          { value: '#boundary', label: '责任边界' },
        ],
      },
    ],
    defaultProps: { active: '#problem' },
    render: (props) => (
      <div style={{ maxWidth: 240 }}>
        <ArticleRail
          label="项目章节"
          activeHref={props.active}
          items={[
            { label: '问题现场', href: '#problem' },
            { label: '范围收敛', href: '#scope' },
            { label: '验证链路', href: '#verify' },
            { label: '责任边界', href: '#boundary' },
          ]}
        />
      </div>
    ),
    code: {
      react: articleRailSource,
      css: articleRailCss,
      usage: `import { ArticleRail } from '@/design-system/components'

<ArticleRail
  label="项目章节"
  items={[
    { label: '问题现场', href: '#problem' },
    { label: '范围收敛', href: '#scope' },
  ]}
/>`,
    },
  },
  {
    id: 'TYWK/Feedback/SubmitSuccess',
    slug: 'submit-success',
    name: '提交成功 Submit Success',
    category: 'feedback',
    maturity: 'stable',
    description: '表单提交成功后的替换状态，文案固定、克制、不含口语化自言自语。',
    usage: ['咨询表单提交成功后原位替换表单', '任何异步提交的成功确认'],
    avoid: ['用作页面顶部的全局公告', '叠加 Toast 重复播报同一结果'],
    sourcePath: 'src/design-system/components/submit-success/SubmitSuccess.tsx',
    dependencies: ['TYWK/Action/Button/Secondary'],
    a11y: 'role=status，提交完成后结果被辅助技术自动播报；进入动画遵循减少动态效果设置。',
    related: ['TYWK/Form/Input', 'TYWK/Action/Button/Primary'],
    updatedAt: UPDATED,
    controls: [
      {
        name: 'action',
        label: '操作区',
        options: [
          { value: 'with', label: '含「再提交」' },
          { value: 'without', label: '仅结果' },
        ],
      },
    ],
    defaultProps: { action: 'with' },
    render: (props) => <SubmitSuccess onReset={props.action === 'with' ? () => {} : undefined} />,
    code: {
      react: submitSuccessSource,
      css: submitSuccessCss,
      tokens: tokensCss,
      usage: `import { SubmitSuccess } from '@/design-system/components'

{state === 'success' && <SubmitSuccess onReset={resetForm} />}`,
    },
  },
]

export function getComponentBySlug(slug: string | null): ComponentEntry | undefined {
  return COMPONENTS.find((entry) => entry.slug === slug)
}

export function getComponentsByCategory(category: string): ComponentEntry[] {
  return COMPONENTS.filter((entry) => entry.category === category)
}
