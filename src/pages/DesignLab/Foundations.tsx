import { CodeBlock, CopyButton } from './CodeBlock'

/* ============================================================
   Foundations 页面：Color / Typography / Layout / Radius·Shadow / Motion
   ============================================================ */

function FoundationHead({ title, desc }: { title: string; desc: string }) {
  return (
    <header className="dl-foundation__head">
      <h1>{title}</h1>
      <p>{desc}</p>
    </header>
  )
}

/* ---------- Color ---------- */

const COLOR_GROUPS: { title: string; colors: { name: string; token: string; value: string; usage: string; dark?: boolean }[] }[] = [
  {
    title: '背景与填充',
    colors: [
      { name: '页面背景', token: '--tywk-page-bg', value: '#ffffff', usage: '全站页面底色' },
      { name: '内容背景', token: '--tywk-surface', value: '#ffffff', usage: '卡片、浮层、选中态表面' },
      { name: '纸面填充', token: '--tywk-paper', value: '#f4f5f3', usage: '栏目导航底、成功态容器、分区背景' },
      { name: '一级填充', token: '--tywk-fill-1', value: 'rgba(0,0,0,0.03)', usage: '次按钮底、控件 hover 底' },
      { name: '二级填充', token: '--tywk-fill-2', value: 'rgba(0,0,0,0.05)', usage: '次按钮 hover、按下态' },
      { name: '深色区域', token: '--tywk-dark-surface', value: '#121212', usage: '页脚等深色区块', dark: true },
    ],
  },
  {
    title: '文字',
    colors: [
      { name: '主文字', token: '--tywk-text-primary', value: 'rgba(0,0,0,0.9)', usage: '标题、正文重点、按钮文字' },
      { name: '次文字', token: '--tywk-text-secondary', value: 'rgba(0,0,0,0.6)', usage: '正文、辅助说明' },
      { name: '弱化文字', token: '--tywk-text-tertiary', value: 'rgba(0,0,0,0.45)', usage: '标签、表单说明、元信息' },
      { name: '最弱文字', token: '--tywk-text-quaternary', value: 'rgba(0,0,0,0.3)', usage: '占位符、禁用文字、编号' },
    ],
  },
  {
    title: '边界',
    colors: [
      { name: '分隔线', token: '--tywk-separator', value: 'rgba(0,0,0,0.13)', usage: '明确分隔线、输入框描边' },
      { name: '弱化边界', token: '--tywk-border-subtle', value: 'rgba(0,0,0,0.06)', usage: '卡片内阴影式描边、浮层边缘' },
    ],
  },
  {
    title: '品牌强调',
    colors: [
      { name: '品牌绿', token: '--tywk-accent', value: '#416f59', usage: '导航激活线、勾选态、强调链接' },
      { name: '品牌绿加深', token: '--tywk-accent-deep', value: '#2c5643', usage: '正文内强调链接文字' },
      { name: '品牌绿浅底', token: '--tywk-accent-soft', value: 'rgba(65,111,89,0.1)', usage: '强调态浅底' },
      { name: '墨色按钮底', token: '--tywk-ink', value: 'rgba(0,0,0,0.9)', usage: '主按钮背景' },
    ],
  },
  {
    title: '状态',
    colors: [
      { name: '成功', token: '--tywk-success', value: '#3f7a5e', usage: '已确认、提交成功' },
      { name: '提醒', token: '--tywk-warning', value: '#a15c1f', usage: '仍待验证、待补充' },
      { name: '错误', token: '--tywk-error', value: '#b4232f', usage: '表单错误、提交失败' },
      { name: '禁用文字', token: '--tywk-disabled-text', value: 'rgba(0,0,0,0.3)', usage: '禁用态文字' },
      { name: '焦点环', token: '--tywk-focus-ring', value: 'rgba(22,99,74,0.75)', usage: '所有可交互元素的 focus-visible 描边' },
    ],
  },
]

export function FoundationColor() {
  return (
    <div className="dl-foundation">
      <FoundationHead
        title="Color 颜色"
        desc="全部颜色以 CSS 变量维护在 src/design-system/foundations/tokens.css。组件只允许引用变量，不写死色值。"
      />
      {COLOR_GROUPS.map((group) => (
        <section key={group.title} className="dl-block">
          <h2>{group.title}</h2>
          <div className="dl-color-grid">
            {group.colors.map((color) => (
              <div key={color.token} className="dl-color-card">
                <span
                  className="dl-color-card__swatch"
                  style={{ background: `var(${color.token})` }}
                  aria-hidden="true"
                />
                <div className="dl-color-card__body">
                  <strong>{color.name}</strong>
                  <code>{color.token}</code>
                  <span className="dl-color-card__value">{color.value}</span>
                  <p>{color.usage}</p>
                </div>
                <CopyButton text={`var(${color.token})`} label="复制变量" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

/* ---------- Typography ---------- */

const TYPE_SCALE: {
  name: string
  token: string
  family: 'serif' | 'sans'
  size: string
  weight: string
  line: string
  tracking: string
  usage: string
  mobile: string
  sample: string
}[] = [
  { name: '品牌标题', token: '--tywk-text-display', family: 'serif', size: '40px / 2.5rem', weight: '600', line: '1.25', tracking: '-0.015em', usage: '首页首屏主标题', mobile: '约 30px', sample: '从真实任务开始验证 AI 价值' },
  { name: '页面标题', token: '--tywk-text-page', family: 'serif', size: '32px / 2rem', weight: '600', line: '1.3', tracking: '-0.015em', usage: '各栏目页开头', mobile: '约 26px', sample: 'AI 项目的判断与验证' },
  { name: '章节标题', token: '--tywk-text-section', family: 'serif', size: '24px / 1.5rem', weight: '600', line: '1.4', tracking: '-0.015em', usage: '页面内章节', mobile: '约 21px', sample: '先确认问题真实，再决定投入' },
  { name: '卡片标题', token: '--tywk-text-card', family: 'sans', size: '17px / 1.0625rem', weight: '600', line: '1.5', tracking: '0', usage: '项目卡片、信息块标题', mobile: '相同', sample: '把历史规划报告变成可追溯的研究知识库' },
  { name: '正文', token: '--tywk-text-body', family: 'sans', size: '16px / 1rem', weight: '400', line: '1.8', tracking: '0', usage: '长文段落', mobile: '相同', sample: '历史报告和政策资料分散，研究任务需要反复查找、整理和回溯依据。' },
  { name: '辅助文字', token: '--tywk-text-small', family: 'sans', size: '14px / 0.875rem', weight: '400', line: '1.65', tracking: '0', usage: '摘要、表单控件、说明段落', mobile: '相同', sample: '我们会先判断问题是否属于服务范围，再通过留下的联系方式回复。' },
  { name: '标签', token: '--tywk-text-caption', family: 'sans', size: '12px / 0.75rem', weight: '400', line: '1.5', tracking: '0.04em', usage: '章节标记、表单标签、状态', mobile: '相同', sample: '项目阶段' },
  { name: '按钮文字', token: '—', family: 'sans', size: '14–16px', weight: '500', line: '1', tracking: '0', usage: '按钮、导航项', mobile: '相同', sample: '提交咨询' },
  { name: '数据与编号', token: '--tywk-text-data', family: 'sans', size: '13px / 0.8125rem', weight: '400', line: '1.5', tracking: '0', usage: '编号、时间、来源序号（等宽数字）', mobile: '相同', sample: '01 系统记录 · 2026-08-13' },
]

export function FoundationTypography() {
  return (
    <div className="dl-foundation">
      <FoundationHead
        title="Typography 字体"
        desc="标题使用思源宋体可变字重（Noto Serif SC Variable，本地打包加载），正文使用系统无衬线中文字体栈。任何一级都有系统回退，不依赖用户设备恰好装有某一字体。"
      />
      <section className="dl-block">
        <h2>字体家族</h2>
        <div className="dl-type-family">
          <div>
            <p className="dl-type-family__sample" style={{ fontFamily: 'var(--tywk-font-serif)' }}>
              通元问科 · 让 AI 在真实业务中承担责任
            </p>
            <code>--tywk-font-serif</code>
            <p>Noto Serif SC Variable → Source Han Serif SC → Noto Serif CJK SC → Songti SC → STSong → serif</p>
          </div>
          <div>
            <p className="dl-type-family__sample" style={{ fontFamily: 'var(--tywk-font-sans)' }}>
              通元问科 · 让 AI 在真实业务中承担责任
            </p>
            <code>--tywk-font-sans</code>
            <p>Hiragino Sans GB → PingFang SC → Noto Sans CJK SC → Microsoft YaHei → sans-serif</p>
          </div>
        </div>
      </section>
      <section className="dl-block">
        <h2>字阶</h2>
        <div className="dl-type-scale">
          {TYPE_SCALE.map((item) => (
            <div key={item.name} className="dl-type-row">
              <div className="dl-type-row__meta">
                <strong>{item.name}</strong>
                <dl>
                  <div><dt>字号</dt><dd>{item.size}</dd></div>
                  <div><dt>字重</dt><dd>{item.weight}</dd></div>
                  <div><dt>行高</dt><dd>{item.line}</dd></div>
                  <div><dt>字间距</dt><dd>{item.tracking}</dd></div>
                  <div><dt>移动端</dt><dd>{item.mobile}</dd></div>
                </dl>
                <p>适用：{item.usage}</p>
              </div>
              <p
                className="dl-type-row__sample"
                style={{
                  fontFamily: item.family === 'serif' ? 'var(--tywk-font-serif)' : 'var(--tywk-font-sans)',
                  fontSize: `var(${item.token}-size, ${item.size.split('/')[1]?.trim() ?? item.size})`,
                  fontWeight: Number(item.weight),
                  lineHeight: item.line,
                  letterSpacing: item.tracking,
                  fontVariantNumeric: item.name === '数据与编号' ? 'tabular-nums' : undefined,
                }}
              >
                {item.sample}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ---------- Layout & Spacing ---------- */

const SPACING_STEPS = [
  { token: '--tywk-space-1', px: '4px', usage: '图标与文字间隙' },
  { token: '--tywk-space-2', px: '8px', usage: '控件内部紧凑间距' },
  { token: '--tywk-space-3', px: '12px', usage: '控件内边距、列表项间距' },
  { token: '--tywk-space-4', px: '16px', usage: '卡片内边距、字段间距' },
  { token: '--tywk-space-6', px: '24px', usage: '区块内分组间距' },
  { token: '--tywk-space-8', px: '32px', usage: '卡片组间距' },
  { token: '--tywk-space-12', px: '48px', usage: '章节内间距' },
  { token: '--tywk-space-16', px: '64px', usage: '章节之间' },
  { token: '--tywk-space-24', px: '96px', usage: '页面大段落之间' },
]

const BREAKPOINTS = [
  { token: '--tywk-breakpoint-sm', value: '640px', meaning: '大屏手机横屏 / 小平板' },
  { token: '--tywk-breakpoint-md', value: '768px', meaning: '平板竖屏；导航由桌面切换为移动形态' },
  { token: '--tywk-breakpoint-lg', value: '1024px', meaning: '小桌面；页面留白由 16px 增至 32px' },
  { token: '--tywk-breakpoint-xl', value: '1280px', meaning: '标准桌面' },
]

export function FoundationLayout() {
  return (
    <div className="dl-foundation">
      <FoundationHead
        title="Layout 布局与间距"
        desc="内容最大宽度 1152px（max-w-6xl），长文章舒适行宽 736px（46rem）。间距基于 4px 基网，页面左右留白移动端 16px、桌面端 32px。"
      />
      <section className="dl-block">
        <h2>内容宽度</h2>
        <div className="dl-layout-demo">
          <div className="dl-layout-demo__row" style={{ maxWidth: '72rem' }}>
            <span>内容最大宽度 --tywk-content-max · 72rem / 1152px</span>
          </div>
          <div className="dl-layout-demo__row dl-layout-demo__row--prose" style={{ maxWidth: '46rem' }}>
            <span>长文章行宽 --tywk-prose-max · 46rem / 736px</span>
          </div>
        </div>
      </section>
      <section className="dl-block">
        <h2>间距体系</h2>
        <div className="dl-spacing-list">
          {SPACING_STEPS.map((step) => (
            <div key={step.token} className="dl-spacing-row">
              <span className="dl-spacing-row__bar" style={{ width: `var(${step.token})` }} aria-hidden="true" />
              <code>{step.token}</code>
              <span>{step.px}</span>
              <p>{step.usage}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="dl-block">
        <h2>响应式断点</h2>
        <div className="dl-spacing-list">
          {BREAKPOINTS.map((bp) => (
            <div key={bp.token} className="dl-spacing-row">
              <code>{bp.token}</code>
              <span>{bp.value}</span>
              <p>{bp.meaning}</p>
            </div>
          ))}
        </div>
        <p className="dl-note">移动端导航收起为抽屉菜单（&lt;768px）；平板与桌面仅留白和栅格列数变化，不改变信息层级。</p>
      </section>
    </div>
  )
}

/* ---------- Radius / Shadow / Border ---------- */

const RADII = [
  { token: '--tywk-radius-sm', value: '8px', usage: '标签、小控件' },
  { token: '--tywk-radius-md', value: '12px', usage: '按钮、输入框、菜单项' },
  { token: '--tywk-radius-lg', value: '16px', usage: '卡片、浮层' },
  { token: '--tywk-radius-xl', value: '20px', usage: '大型卡片、文章导航' },
  { token: '--tywk-radius-2xl', value: '24px', usage: '页面级容器' },
  { token: '--tywk-radius-full', value: '999px', usage: '胶囊状态、状态点' },
]

const SHADOWS = [
  { token: '--tywk-shadow-1', value: '0 6px 18px rgba(24,31,28,0.07)', usage: '选中态表面、轻量升起' },
  { token: '--tywk-shadow-2', value: '0 12px 36px rgba(28,35,31,0.09)', usage: '卡片悬浮' },
  { token: '--tywk-shadow-3', value: '0 18px 50px rgba(30,43,36,0.12)', usage: '下拉浮层、对话框' },
  { token: '--tywk-shadow-inset-line', value: 'inset 0 0 0 1px rgba(0,0,0,0.06)', usage: '卡片弱化描边（替代实线边框）' },
]

export function FoundationRadiusShadow() {
  return (
    <div className="dl-foundation">
      <FoundationHead
        title="Radius · Shadow · Border"
        desc="圆角柔和但克制，阴影只用于浮层与可交互升起。默认用内阴影式弱化描边，不让大面积线框成为设计语言。"
      />
      <section className="dl-block">
        <h2>圆角</h2>
        <div className="dl-radius-grid">
          {RADII.map((radius) => (
            <div key={radius.token} className="dl-radius-card">
              <span
                className="dl-radius-card__box"
                style={{ borderRadius: radius.token === '--tywk-radius-full' ? '999px' : `var(${radius.token})` }}
                aria-hidden="true"
              />
              <code>{radius.token}</code>
              <span>{radius.value}</span>
              <p>{radius.usage}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="dl-block">
        <h2>阴影与描边</h2>
        <div className="dl-radius-grid">
          {SHADOWS.map((shadow) => (
            <div key={shadow.token} className="dl-radius-card">
              <span className="dl-radius-card__box dl-radius-card__box--shadow" style={{ boxShadow: `var(${shadow.token})` }} aria-hidden="true" />
              <code>{shadow.token}</code>
              <p>{shadow.usage}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ---------- Motion tokens ---------- */

const MOTION_TOKENS = [
  { token: '--tywk-motion-instant', value: '120ms', usage: '按下、勾选等即时反馈' },
  { token: '--tywk-motion-fast', value: '200ms', usage: '悬浮、菜单开合、导航高亮' },
  { token: '--tywk-motion-base', value: '320ms', usage: '面板展开、内容切换' },
  { token: '--tywk-motion-slow', value: '560ms', usage: '内容进入、滚动揭示' },
  { token: '--tywk-ease-standard', value: 'cubic-bezier(0.16, 1, 0.3, 1)', usage: '默认缓动：快速起步、柔和落定' },
  { token: '--tywk-ease-out', value: 'cubic-bezier(0.23, 1, 0.32, 1)', usage: '颜色与透明度变化' },
  { token: '--tywk-motion-distance', value: '12px', usage: '进入与开合的位移基准' },
]

export function FoundationMotion() {
  return (
    <div className="dl-foundation">
      <FoundationHead
        title="Motion 动效变量"
        desc="所有动效服务于状态变化与阅读关系：快速起步、柔和落定、位移不超过 12px、不循环。开启「减少动态效果」时全部降级为瞬时状态切换。"
      />
      <section className="dl-block">
        <h2>时长、缓动与位移</h2>
        <div className="dl-spacing-list">
          {MOTION_TOKENS.map((item) => (
            <div key={item.token} className="dl-spacing-row">
              <code>{item.token}</code>
              <span>{item.value}</span>
              <p>{item.usage}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="dl-block">
        <h2>减少动态效果策略</h2>
        <CodeBlock
          lang="css"
          code={`@media (prefers-reduced-motion: reduce) {
  .tywk-motion-safe,
  .tywk-motion-safe::before,
  .tywk-motion-safe::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}
        />
        <p className="dl-note">所有带进入或开合动画的组件添加 .tywk-motion-safe 类即可获得统一的降级行为；循环动画（如待验证状态点）直接停止。</p>
      </section>
    </div>
  )
}
