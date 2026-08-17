import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import {
  LeadRateLimitError,
  LeadValidationError,
  assertLeadRateLimitViaLarkCli,
  getRequestSourceKey,
  parseLead,
  writeLeadViaLarkCli,
  type LeadPayload,
} from './server/leadService'

async function readJsonBody(request: IncomingMessage) {
  const chunks: Buffer[] = []
  for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as LeadPayload
}

function localLeadApi() {
  const attachMiddleware = (server: { middlewares: { use: (path: string, handler: (req: IncomingMessage, res: ServerResponse) => void) => void } }) => {
    server.middlewares.use('/api/leads', async (request, response) => {
      if (request.method !== 'POST') {
        response.statusCode = 405
        response.end('Method Not Allowed')
        return
      }

      try {
        const lead = parseLead(await readJsonBody(request))
        if (!lead) {
          response.statusCode = 204
          response.end()
          return
        }
        lead.sourceKey = getRequestSourceKey(request.headers, request.socket.remoteAddress)
        await assertLeadRateLimitViaLarkCli(lead.sourceKey)
        const recordId = await writeLeadViaLarkCli(lead)
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify({ ok: true, recordId }))
      } catch (error) {
        if (error instanceof LeadRateLimitError) {
          response.statusCode = 429
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ ok: false, code: 'submission_limit_reached', message: error.message }))
          return
        }
        if (error instanceof LeadValidationError) {
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ ok: false, message: error.message }))
          return
        }
        console.error('Lead submission failed', error)
        response.statusCode = 500
        response.end('Unable to save lead')
      }
    })
  }

  return {
    name: 'local-lead-api',
    configureServer: attachMiddleware,
    configurePreviewServer: attachMiddleware,
  }
}

// https://vite.dev/config/
export default defineConfig({
  // 官网按域名根路径部署；使用绝对资源路径，保证实践页等深层 URL 可直接访问。
  base: '/',
  plugins: [inspectAttr(), react(), localLeadApi()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
