# 通元问科官网

通元问科企业官网与设计系统。网站用于说明服务领域、公开项目实践、工作方法与合作方式，并通过脱敏业务材料展示企业 AI 项目的判断、验证和实施过程。

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Motion

## 本地运行

```bash
npm install
npm run dev
```

## 质量检查

```bash
npm run build
npm run lint
```

## 主要路由

- `/`：首页
- `/services`：服务领域
- `/projects`：项目实践
- `/projects/supply-chain-research-kb-poc`：供应链研究知识库 PoC
- `/projects/settlement-coordination`：供应链结算异常协同
- `/approach`：工作方法
- `/about`：关于我们
- `/contact`：商务咨询
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
