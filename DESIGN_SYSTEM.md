# 通元问科设计系统（TYWK Design System）

本仓库的官方设计系统。官网、后台与后续产品共用这一套视觉与交互标准。

**其他 AI 进入本项目后，请先阅读本文件，再从 Registry 查找组件，不要重新发明已有组件。**

## 入口

| 内容 | 位置 |
| --- | --- |
| 设计系统工作台（可视化浏览、代码复制） | 官网 `/design-lab` |
| 基础变量（颜色 / 字体 / 间距 / 圆角 / 阴影 / 动效） | `src/design-system/foundations/tokens.css` |
| 组件实现 | `src/design-system/components/<name>/` |
| 动效样板 | `src/design-system/motion/` |
| 组件 Registry（机器可读清单） | `src/design-system/registry/components.tsx` |
| 分类清单 | `src/design-system/registry/categories.ts` |
| Registry 类型定义 | `src/design-system/registry/types.ts` |
| 工作台页面源码 | `src/pages/DesignLab/` |

## 命名规则

组件稳定 ID 形如：`TYWK/<分类>/<名称>[/<变体>]`，跨版本不变。例如：

- `TYWK/Action/Button/Primary`
- `TYWK/Action/Button/Secondary`
- `TYWK/Action/TextLink`
- `TYWK/Form/Input`
- `TYWK/Form/Textarea`
- `TYWK/Form/Select`
- `TYWK/Form/Checkbox`
- `TYWK/Status/StatusBadge`
- `TYWK/Status/SourceTag`
- `TYWK/Navigation/ArticleRail`
- `TYWK/Feedback/SubmitSuccess`

动效 ID 形如 `TYWK/Motion/MenuOpenClose`、`TYWK/Motion/ContentEnter`。

## 如何查找和使用组件

1. 打开 `src/design-system/registry/components.tsx`，按 ID 或名称检索。
2. Registry 条目包含：`sourcePath`（源码位置）、`maturity`（成熟度）、`usage`/`avoid`（适用与不适用场景）、`dependencies`、`a11y`（无障碍说明）、`related`、`code.usage`（使用示例）。
3. 从统一出口导入：

```tsx
import { Button, Input, StatusBadge, SubmitSuccess } from '@/design-system/components'

<Button variant="primary" size="md">提交咨询</Button>
<Input label="联系方式" required placeholder="手机、微信或企业邮箱" />
```

4. 视觉一律引用 `tokens.css` 中的 `--tywk-*` 变量，不写死色值、字号、圆角。

## 成熟度规则

| 状态 | 含义 | 能否进入正式官网 |
| --- | --- | --- |
| `draft` | 草稿，API 与视觉未确认 | 否 |
| `review` | 评审中，可在工作台试用 | 否 |
| `stable` | 稳定，契约冻结 | 可以 |
| `deprecated` | 废弃，仅保留兼容 | 禁止新增使用 |

## 如何新增组件

1. 在 `src/design-system/components/<name>/` 下创建 `<Name>.tsx` 与同目录样式文件，样式只使用 `--tywk-*` 变量。
2. 在 `src/design-system/components/index.ts` 导出。
3. 在 `src/design-system/registry/components.tsx` 登记完整条目（ID、slug、成熟度、适用/不适用、源码 raw 导入、使用示例）。
4. 在工作台 `/design-lab?component=<slug>` 检查预览、状态切换与代码面板。
5. 初始成熟度一律为 `draft`，经评审后升 `review`，进入官网前必须达到 `stable`。

**禁止事项**

- 禁止绕过 Registry 在页面里硬编码与已有组件重复的按钮、输入框、状态标记。
- 禁止把 shadcn/ui、Magic UI 等组件库默认视觉直接拼进页面；开源库只提供行为基础（如 Radix 的无障碍交互），视觉必须使用 TYWK Tokens。
- 禁止大面积线框、无意义粒子与漂浮装饰、为了「AI 感」的过度渐变。
- 标题末尾不加句号；反馈文案克制，不自言自语。

## 现有官网 → 设计系统迁移映射（下一阶段执行，需确认后逐页迁移）

| 现有实现 | 目标组件 | 说明 |
| --- | --- | --- |
| `src/components/ui-kimi/Button.tsx` | `TYWK/Action/Button/Primary`、`TYWK/Action/Button/Secondary` | API 已兼容（variant/size），可直接替换 |
| `src/components/site/Nav.tsx` | `TYWK/Navigation/SiteHeader`（待建立） | 下拉菜单逻辑保留：单目标直链、多目标悬浮 |
| 原 `SectionNavAside` | `TYWK/Navigation/ArticleRail` | 已完成；工作方法与项目详情页共用，旧实现已移除 |
| 原 `SectionNavBar` | `TYWK/Navigation/SectionTabs` | 已完成；服务领域、项目实践与关于我们共用，旧实现已移除 |
| `src/components/site/Contact.tsx` 表单字段 | `TYWK/Form/Input`、`Textarea`、`Select`、`Checkbox` | 字段与校验逻辑不变，替换控件层 |
| `Contact.tsx` 提交成功分支 | `TYWK/Feedback/SubmitSuccess` | 文案统一为「已收到您的咨询申请，请耐心等候回复。」 |
| `index.css` 中的 `material-link` | `TYWK/Action/TextLink` | 下划线划入动效一致 |
| `src/components/ui-kimi/Toast.tsx` | `TYWK/Feedback/Toast`（待评审） | 保留行为，迁移视觉到 Tokens |
| 页面硬编码的项目卡片 | `TYWK/Content/ProjectCard`（待建立） | 从 /projects 与首页提取 |

## 技术说明

- 框架：React 19 + Vite 7 + TypeScript，路由 react-router v7。
- 工作台代码面板使用 Vite `?raw` 导入真实源码，预览与代码永远来自同一份实现。
- 语法高亮为自实现轻量方案（`src/pages/DesignLab/CodeBlock.tsx`），无大型依赖。
- 标题字体 Noto Serif SC Variable 通过 `@fontsource-variable/noto-serif-sc` 本地打包，含完整系统回退栈。
- 所有动效遵循 `prefers-reduced-motion`：进入/开合类动画降级为瞬时切换，循环动画停止。
