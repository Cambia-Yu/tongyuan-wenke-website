# 通元问科官网

通元问科企业官网与设计系统。网站用于说明服务领域、公开项目实践、工作方法与合作方式，并通过脱敏业务材料展示企业 AI 项目的判断、验证和实施过程。

## 当前主线（Canonical）

当前最终官网不是早期 React 的 `WebsiteDirection` 页面，也不是 `/legacy` 下的旧版 `Home`。

当前唯一主线由以下目录组成：

- `homepage-v8/`：当前首页 shell、视频 scrubber 与查询路由
- `blog/`：博客索引与 DeepSeek Harness 长文
- `cases/`：项目案例长文
- `domains/`：物流与供应链页面
- `shared/typography-v1.css`：当前统一字体规则

根路由 `/` 通过 `src/pages/CanonicalSite.tsx` 加载 `main/homepage-v8/index.html`，因此 clone 本仓库后执行 `npm run dev`，打开 `/` 应直接看到当前最终官网。

历史页面仅作为参考保留：

- `/direction-v1`：早期 Website Direction v1 设计方向页
- `/legacy`：更早的 React 官网

后续修改最终官网时，请优先修改上述 canonical 目录，不要再以 `src/pages/WebsiteDirection.tsx` 或 `src/pages/Home.tsx` 作为当前官网入口。

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Motion
- Canonical 静态页面层（HTML / CSS / JavaScript）

## 本地运行

```bash
npm install
npm run dev
```

默认打开：`http://localhost:3000/`

## 质量检查

```bash
npm run build
npm run lint
```

## 当前官网入口

- `/`：当前最终官网
- `/?page=blog`：博客索引
- `/?article=deepseek-harness`：DeepSeek Harness 长文
- `/?domain=supply-chain`：物流与供应链
- `/?case=supply-chain-research`：供应链研究案例
- `/?case=settlement-exception`：结算异常案例

## 历史 React 页面

- `/direction-v1`：Website Direction v1
- `/legacy`：早期 React 首页
- `/services`、`/projects`、`/approach` 等：旧 React 信息架构，保留作为历史实现与素材参考
- `/design-lab`：设计系统工作台

## 设计系统

- `DESIGN_SYSTEM.md`：设计系统说明
- `src/design-system/foundations/`：颜色、字体、间距与动效变量
- `src/design-system/components/`：可复用组件
- `src/pages/DesignLab/`：组件、模式和动效预览工作台

## 咨询表单

表单提交接口由 `api/leads.ts` 与 `server/leadService.ts` 实现。部署时根据 `.env.example` 配置飞书多维表格相关环境变量；不要把真实密钥提交到仓库。

## 内容说明

公开项目中的客户名称、内部资料、业务数据和界面信息均经过脱敏处理。项目状态、结果数字和客户评价只在具备公开依据时使用。
