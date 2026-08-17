export type Domain = 'supply' | 'manufacturing'

export interface Prototype {
  id: string
  name: string
  en: string
  domain: Domain
  /** 一句话人话：非技术高管 3 秒看懂 */
  plain: string
  tagline: string
  pain: string
  solution: string
  capabilities: string[]
  /** 接入的企业系统 */
  integrations: string[]
  /** 部署方式 */
  deployment: string
  /** 三层架构简述 */
  arch: { layer: string; desc: string }[]
  metrics: { label: string; value: string }[]
  status: '已投产' | '演示原型'
  /** 界面示意图（线框风格），可选 */
  image?: string
}

export const DOMAINS: { key: Domain | 'all'; label: string; en: string }[] = [
  { key: 'all', label: '全部', en: 'All' },
  { key: 'supply', label: '供应链管理', en: 'Supply Chain' },
  { key: 'manufacturing', label: '制造业', en: 'Manufacturing' },
]

/**
 * 未核实的历史方案草稿。
 * 不得直接用于公开页面；其中“已投产”标签与量化指标均缺少当前仓库可追溯的授权与口径。
 */
export const PROTOTYPES: Prototype[] = [
  {
    id: 'demand-sense',
    name: '需求预测系统',
    en: 'DemandSense',
    domain: 'supply',
    plain: '提前算准每个产品未来会卖多少，让备货不再靠猜。',
    tagline: '多源数据驱动的 SKU 级需求预测',
    pain: '传统预测依赖人工经验与单一历史销量，促销、季节、渠道变化难以捕捉，预测偏差长期居高不下，直接导致缺货与积压并存。',
    solution:
      '系统融合历史订单、渠道库存与市场信号，由预测引擎自动生成 SKU 级滚动预测，并对每一次波动给出可读的归因解释；计划员可用对话方式追问与调整，结果直接回写计划系统。',
    capabilities: ['SKU 级滚动预测', '预测偏差自动归因', '促销 / 季节因子建模', '对话式计划调整'],
    integrations: ['ERP', 'OMS', 'WMS'],
    deployment: '私有化部署 · 数据不出域',
    arch: [
      { layer: '数据层', desc: '订单 / 库存 / 渠道数据定时同步，统一口径清洗' },
      { layer: '智能层', desc: '时序预测模型 + 大模型归因解释，双引擎校验' },
      { layer: '应用层', desc: '计划员工作台，预测结果一键回写 ERP' },
    ],
    metrics: [
      { label: '预测准确率提升', value: '+18%' },
      { label: '计划制定周期', value: '-60%' },
    ],
    status: '已投产',
    image: '/images/wireframe-forecast.jpg',
  },
  {
    id: 'restock-ai',
    name: '智能补货与库存优化系统',
    en: 'ReStock AI',
    domain: 'supply',
    plain: '自动决定每个仓库每天该补什么、补多少，不缺货也不积压。',
    tagline: '从静态安全库存到动态补货决策',
    pain: '静态安全库存策略无法适应需求波动，畅销品缺货与滞销品积压并存，大量现金流被库存占用。',
    solution:
      '系统基于需求预测与服务水平目标，每天动态计算每个仓库、每个 SKU 的补货点与补货量，给出附带权衡说明的补货建议，经计划员确认后自动回写 ERP 生成采购单。',
    capabilities: ['动态安全库存计算', '多仓协同补货', '缺货风险提前预警', '采购单自动回写'],
    integrations: ['ERP', 'WMS', 'SRM'],
    deployment: '私有化部署 · 数据不出域',
    arch: [
      { layer: '数据层', desc: '库存快照 / 在途订单 / 预测数据每日对齐' },
      { layer: '智能层', desc: '库存优化引擎，服务水平约束下求最优补货量' },
      { layer: '应用层', desc: '补货建议工作台，人审后回写 ERP' },
    ],
    metrics: [
      { label: '库存周转提升', value: '+25%' },
      { label: '缺货率下降', value: '-30%' },
    ],
    status: '已投产',
    image: '/images/wireframe-restock.jpg',
  },
  {
    id: 'route-pilot',
    name: '物流调度优化系统',
    en: 'RoutePilot',
    domain: 'supply',
    plain: '几分钟排好全天配送路线，成本更低，插单也能自动重排。',
    tagline: '城配与干线运输的智能调度引擎',
    pain: '人工排线耗时长、装载率低；临时插单与异常路况导致计划频繁失效，运输成本持续攀升。',
    solution:
      '调度引擎综合订单、车型、时效窗与实时路况，分钟级生成最优配送方案；异常事件触发自动局部重排，并向调度员推送可解释的调整建议，全程留痕可审计。',
    capabilities: ['自动排线与拼载', '时效窗约束求解', '异常自动局部重排', '在途风险预警'],
    integrations: ['TMS', 'OMS', 'GPS 平台'],
    deployment: '混合云部署',
    arch: [
      { layer: '数据层', desc: '订单 / 车辆 / 路况数据实时接入' },
      { layer: '智能层', desc: '运筹优化求解器 + 大模型异常处置建议' },
      { layer: '应用层', desc: '调度驾驶舱，方案一键下发司机端' },
    ],
    metrics: [
      { label: '运输成本下降', value: '-12%' },
      { label: '车辆装载率提升', value: '+15%' },
    ],
    status: '演示原型',
  },
  {
    id: 'supplier-radar',
    name: '供应商风险雷达系统',
    en: 'SupplierRadar',
    domain: 'supply',
    plain: '提前几周发现供应商要出问题，留出时间换备选方案。',
    tagline: '穿透多级供应链的风险预警网络',
    pain: '二级、三级供应商不可见，断供、舆情、地缘风险往往事后才被发现，企业缺乏提前干预的窗口期。',
    solution:
      '系统构建多级供应关系图谱，持续扫描交付、财务、舆情与外部事件信号，评估风险沿供应链的传导路径并分级预警，同时给出备选供应商与应对预案。',
    capabilities: ['多级供应图谱构建', '风险传导路径分析', '分级预警自动推送', '备选方案推荐'],
    integrations: ['SRM', 'ERP', '外部舆情数据源'],
    deployment: '混合云部署',
    arch: [
      { layer: '数据层', desc: '内部交付数据 + 外部公开情报持续汇聚' },
      { layer: '智能层', desc: '图谱推理 + 风险分级模型' },
      { layer: '应用层', desc: '风险驾驶舱，预警直达采购负责人' },
    ],
    metrics: [
      { label: '风险预警提前', value: '2-4 周' },
      { label: '供应中断损失', value: '-40%' },
    ],
    status: '演示原型',
  },
  {
    id: 'vision-qc',
    name: '视觉质检系统',
    en: 'VisionQC',
    domain: 'manufacturing',
    plain: '用相机代替人眼盯产线，缺陷当场拦截，还能追溯原因。',
    tagline: '产线缺陷的实时识别与归因',
    pain: '人工目检易疲劳、标准不一，漏检流入下游造成批量返工；缺陷数据沉淀在本地，无法反哺工艺改进。',
    solution:
      '视觉模型在产线实时检测表面缺陷，系统自动分类、定位并关联当班工艺参数，生成归因报告推送至工艺与质量工程师，让每一次缺陷都成为改进的输入。',
    capabilities: ['毫秒级缺陷检测', '缺陷自动分类定位', '工艺参数关联归因', '小样本快速冷启动'],
    integrations: ['MES', 'QMS', '产线工控机'],
    deployment: '边缘计算 + 私有化部署',
    arch: [
      { layer: '数据层', desc: '工业相机图像流 + MES 工艺参数实时对齐' },
      { layer: '智能层', desc: '边缘端视觉模型推理，云端持续迭代' },
      { layer: '应用层', desc: '质检工位终端 + 质量归因看板' },
    ],
    metrics: [
      { label: '缺陷检出率', value: '99.2%' },
      { label: '质检人力下降', value: '-50%' },
    ],
    status: '已投产',
    image: '/images/wireframe-vision.jpg',
  },
  {
    id: 'machine-pulse',
    name: '设备预测性维护系统',
    en: 'MachinePulse',
    domain: 'manufacturing',
    plain: '在设备坏掉之前就知道它快坏了，提前安排检修不停产。',
    tagline: '从故障后维修到预测性维护',
    pain: '关键设备突发故障造成非计划停机；定期保养又过度维护，备件库存与维修成本双高。',
    solution:
      '系统采集振动、温度、电流等传感数据，评估设备健康度并预测剩余寿命，自动生成维护工单与备件建议，并与 MES 排产联动，把检修安排进生产间隙。',
    capabilities: ['设备健康度评分', '剩余寿命预测', '维护工单自动生成', 'MES 排产联动'],
    integrations: ['MES', 'EAM', 'SCADA'],
    deployment: '边缘计算 + 私有化部署',
    arch: [
      { layer: '数据层', desc: '传感器数据高频采集，边缘侧预处理' },
      { layer: '智能层', desc: '健康度模型 + 剩余寿命预测' },
      { layer: '应用层', desc: '设备驾驶舱，工单直达维修班组' },
    ],
    metrics: [
      { label: '非计划停机下降', value: '-35%' },
      { label: '维护成本下降', value: '-22%' },
    ],
    status: '已投产',
  },
  {
    id: 'craft-opt',
    name: '工艺参数优化系统',
    en: 'CraftOpt',
    domain: 'manufacturing',
    plain: '把老师傅的最优手感变成系统里的标准参数，换人不掉良率。',
    tagline: '让每一条产线都运行在最优参数上',
    pain: '工艺参数依赖老师傅经验，换型与原料批次波动时良率起伏大，经验难以沉淀复制，人走艺失。',
    solution:
      '系统以历史生产数据构建工艺数字孪生，在安全约束空间内搜索最优参数组合并给出置信度；每一次验证结果回流，沉淀为可复用的企业工艺知识库。',
    capabilities: ['工艺数字孪生', '参数寻优推荐', '良率波动归因', '工艺知识沉淀'],
    integrations: ['MES', 'SCADA', 'LIMS'],
    deployment: '私有化部署 · 数据不出域',
    arch: [
      { layer: '数据层', desc: '历史批次数据 + 实时工艺参数统一建模' },
      { layer: '智能层', desc: '数字孪生仿真 + 贝叶斯寻优' },
      { layer: '应用层', desc: '工艺工程师工作台，参数建议带置信度' },
    ],
    metrics: [
      { label: '良率提升', value: '+5.8%' },
      { label: '换型调参时间', value: '-45%' },
    ],
    status: '演示原型',
  },
  {
    id: 'plan-forge',
    name: '智能生产排程系统',
    en: 'PlanForge',
    domain: 'manufacturing',
    plain: '几秒钟排出全厂生产计划，插单来了只动该动的部分。',
    tagline: '多约束下的秒级排产与动态重排',
    pain: '多品种小批量模式下，人工排程需数小时且难以兼顾交期、换型与产能；一张插单往往意味着全盘重排。',
    solution:
      '排程引擎综合交期、工艺路线、设备产能与物料齐套性，秒级生成可执行的排产计划；插单与异常触发局部重排，影响范围实时可视化，排程员保留最终拍板权。',
    capabilities: ['多约束自动排程', '插单局部重排', '物料齐套性校验', '排程影响可视化'],
    integrations: ['ERP', 'MES', 'APS'],
    deployment: '私有化部署 · 数据不出域',
    arch: [
      { layer: '数据层', desc: '订单 / BOM / 产能日历 / 库存齐套数据' },
      { layer: '智能层', desc: '约束求解引擎 + 大模型排程解释' },
      { layer: '应用层', desc: '排程甘特工作台，方案一键下发 MES' },
    ],
    metrics: [
      { label: '排程效率提升', value: '10×' },
      { label: '订单准交率', value: '+9%' },
    ],
    status: '演示原型',
    image: '/images/wireframe-schedule.jpg',
  },
]
