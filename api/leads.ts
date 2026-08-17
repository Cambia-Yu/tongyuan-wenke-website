import {
  LeadRateLimitError,
  LeadValidationError,
  assertLeadRateLimitViaOpenApi,
  getRequestSourceKey,
  parseLead,
  writeLeadViaOpenApi,
  type LeadPayload,
} from '../server/leadService'

interface ApiRequest {
  method?: string
  body?: LeadPayload | string
  headers?: Record<string, string | string[] | undefined>
  socket?: { remoteAddress?: string }
}

interface ApiResponse {
  status: (code: number) => ApiResponse
  json: (body: unknown) => void
  end: () => void
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    response.status(405).end()
    return
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) as LeadPayload : request.body || {}
    const lead = parseLead(body)
    if (!lead) {
      response.status(204).end()
      return
    }

    lead.sourceKey = getRequestSourceKey(request.headers || {}, request.socket?.remoteAddress)
    await assertLeadRateLimitViaOpenApi(lead.sourceKey)
    const recordId = await writeLeadViaOpenApi(lead)
    response.status(200).json({ ok: true, recordId })
  } catch (error) {
    if (error instanceof LeadRateLimitError) {
      response.status(429).json({ ok: false, code: 'submission_limit_reached', message: error.message })
      return
    }
    if (error instanceof LeadValidationError) {
      response.status(400).json({ ok: false, message: error.message })
      return
    }
    console.error('Lead submission failed', error)
    response.status(500).json({ ok: false, message: '暂时未能提交，请稍后再试' })
  }
}
