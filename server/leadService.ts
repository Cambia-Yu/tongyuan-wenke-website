import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

export const DEFAULT_LARK_BASE_TOKEN = 'DsJUbwBQGaluRssEJ8oclLvknVh'
export const DEFAULT_LARK_TABLE_ID = 'tblBoNbfcrzWDzE4'
export const DAILY_LEAD_LIMIT = 3

export const LEAD_RATE_LIMIT_MESSAGE = '已收到您的咨询申请。请耐心等候回复。'

const interestLabels: Record<string, string> = {
  'supply-chain': '供应链',
  manufacturing: '制造',
  knowledge: '企业知识',
  assessment: 'AI 项目判断与验证',
  partnership: '伙伴合作',
  other: '其他',
}

export interface LeadPayload {
  name?: unknown
  company?: unknown
  contact?: unknown
  interest?: unknown
  problem?: unknown
  website?: unknown
  sourceUrl?: unknown
  consent?: unknown
}

export interface ValidLead {
  name: string
  company: string
  contact: string
  interest: string
  problem: string
  sourceUrl: string
  consent: true
  submittedAt: string
  sourceKey?: string
}

export class LeadValidationError extends Error {}
export class LeadRateLimitError extends Error {}

interface RequestHeaders {
  [key: string]: string | string[] | undefined
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function parseLead(payload: LeadPayload): ValidLead | null {
  if (cleanText(payload.website, 200)) return null

  const name = cleanText(payload.name, 80)
  const company = cleanText(payload.company, 160)
  const contact = cleanText(payload.contact, 200)
  const interest = cleanText(payload.interest, 80)
  const problem = cleanText(payload.problem, 4000)
  const sourceUrl = cleanText(payload.sourceUrl, 1000)

  if (!name || !contact || !interest || payload.consent !== true) {
    throw new LeadValidationError('请完整填写必填项并确认信息使用说明')
  }

  return {
    name,
    company,
    contact,
    interest: interestLabels[interest] ?? '其他',
    problem,
    sourceUrl,
    consent: true,
    submittedAt: formatShanghaiTime(new Date()),
  }
}

export function toLarkFields(lead: ValidLead) {
  return {
    姓名: lead.name,
    公司或组织: lead.company,
    联系方式: lead.contact,
    咨询方向: lead.interest,
    补充说明: lead.problem,
    来源页面: lead.sourceUrl,
    线索来源: '官网',
    跟进状态: '新线索',
    提交时间: lead.submittedAt,
    隐私同意: lead.consent,
    ...(lead.sourceKey ? { 来源标识: lead.sourceKey } : {}),
  }
}

function formatShanghaiTime(date: Date) {
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}:${value.second}`
}

function getShanghaiDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${value.year}-${value.month}-${value.day}`
}

function firstHeaderValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || '' : value || ''
}

export function getRequestSourceKey(headers: RequestHeaders, remoteAddress = '') {
  const forwarded = firstHeaderValue(headers['x-forwarded-for']).split(',')[0]?.trim()
  const realIp = firstHeaderValue(headers['x-real-ip']).trim()
  const userAgent = firstHeaderValue(headers['user-agent']).trim().slice(0, 300)
  const address = forwarded || realIp || remoteAddress || 'unknown'
  const day = getShanghaiDate(new Date())
  const secret = process.env.LEAD_RATE_LIMIT_SECRET || process.env.LARK_APP_SECRET || 'tongyuan-wenke-local-rate-limit'
  const anonymousSource = createHash('sha256').update(`${secret}:${address}:${userAgent}`).digest('hex').slice(0, 24)
  return `${day}:${anonymousSource}`
}

function parseCliRecordCount(stdout: string) {
  const result = JSON.parse(stdout) as { ok?: boolean; data?: { record_id_list?: string[] } }
  if (!result.ok) throw new Error('无法读取飞书提交记录')
  return result.data?.record_id_list?.length || 0
}

export async function assertLeadRateLimitViaLarkCli(sourceKey: string) {
  const baseToken = process.env.LARK_BASE_TOKEN || DEFAULT_LARK_BASE_TOKEN
  const tableId = process.env.LARK_TABLE_ID || DEFAULT_LARK_TABLE_ID
  const { stdout } = await execFileAsync('lark-cli', [
    'base',
    '+record-list',
    '--base-token',
    baseToken,
    '--table-id',
    tableId,
    '--field-id',
    '来源标识',
    '--filter-json',
    JSON.stringify({ logic: 'and', conditions: [['来源标识', '==', sourceKey]] }),
    '--limit',
    String(DAILY_LEAD_LIMIT),
    '--as',
    'bot',
    '--format',
    'json',
  ], { timeout: 20_000, maxBuffer: 1024 * 1024 })

  if (parseCliRecordCount(stdout) >= DAILY_LEAD_LIMIT) throw new LeadRateLimitError(LEAD_RATE_LIMIT_MESSAGE)
}

export async function writeLeadViaLarkCli(lead: ValidLead) {
  const baseToken = process.env.LARK_BASE_TOKEN || DEFAULT_LARK_BASE_TOKEN
  const tableId = process.env.LARK_TABLE_ID || DEFAULT_LARK_TABLE_ID
  const { stdout } = await execFileAsync('lark-cli', [
    'base',
    '+record-upsert',
    '--base-token',
    baseToken,
    '--table-id',
    tableId,
    '--json',
    JSON.stringify(toLarkFields(lead)),
    '--as',
    'bot',
    '--format',
    'json',
  ], { timeout: 20_000, maxBuffer: 1024 * 1024 })

  const result = JSON.parse(stdout) as { ok?: boolean; data?: { record?: { record_id_list?: string[] } } }
  if (!result.ok) throw new Error('飞书写入失败')
  return result.data?.record?.record_id_list?.[0]
}

async function getTenantAccessToken() {
  const appId = process.env.LARK_APP_ID
  const appSecret = process.env.LARK_APP_SECRET
  if (!appId || !appSecret) throw new Error('缺少 LARK_APP_ID 或 LARK_APP_SECRET')

  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  })
  const result = await response.json() as { code?: number; tenant_access_token?: string }
  if (!response.ok || result.code !== 0 || !result.tenant_access_token) {
    throw new Error('无法取得飞书应用访问令牌')
  }
  return result.tenant_access_token
}

export async function assertLeadRateLimitViaOpenApi(sourceKey: string) {
  const baseToken = process.env.LARK_BASE_TOKEN || DEFAULT_LARK_BASE_TOKEN
  const tableId = process.env.LARK_TABLE_ID || DEFAULT_LARK_TABLE_ID
  const token = await getTenantAccessToken()
  const params = new URLSearchParams({
    field_id: '来源标识',
    filter: JSON.stringify({ logic: 'and', conditions: [['来源标识', '==', sourceKey]] }),
    limit: String(DAILY_LEAD_LIMIT),
    offset: '0',
  })
  const response = await fetch(`https://open.feishu.cn/open-apis/base/v3/bases/${baseToken}/tables/${tableId}/records?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const result = await response.json() as { code?: number; data?: { record_id_list?: string[] } }
  if (!response.ok || result.code !== 0) throw new Error('无法读取飞书提交记录')
  if ((result.data?.record_id_list?.length || 0) >= DAILY_LEAD_LIMIT) {
    throw new LeadRateLimitError(LEAD_RATE_LIMIT_MESSAGE)
  }
}

export async function writeLeadViaOpenApi(lead: ValidLead) {
  const baseToken = process.env.LARK_BASE_TOKEN || DEFAULT_LARK_BASE_TOKEN
  const tableId = process.env.LARK_TABLE_ID || DEFAULT_LARK_TABLE_ID
  const token = await getTenantAccessToken()
  const response = await fetch(`https://open.feishu.cn/open-apis/base/v3/bases/${baseToken}/tables/${tableId}/records`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: toLarkFields(lead) }),
  })
  const result = await response.json() as { code?: number; data?: { record?: { record_id?: string } } }
  if (!response.ok || result.code !== 0) throw new Error('飞书写入失败')
  return result.data?.record?.record_id
}
