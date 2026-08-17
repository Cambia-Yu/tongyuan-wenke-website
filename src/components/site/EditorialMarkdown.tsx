import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type MarkdownSection = {
  title: string
  content: string
}

export function splitMarkdownDocument(source: string) {
  const body = source.replace(/^---[\s\S]*?---\s*/, '').trim()
  const firstSection = body.indexOf('\n## ')
  const opening = firstSection === -1 ? body : body.slice(0, firstSection)
  const sectionSource = firstSection === -1 ? '' : body.slice(firstSection + 1)
  const openingLines = opening.split('\n').filter(Boolean)

  const sections = sectionSource
    .split(/\n(?=## )/)
    .map((block) => {
      const [heading = '', ...content] = block.split('\n')
      return {
        title: heading.replace(/^##\s+/, '').trim(),
        content: content.join('\n').trim(),
      }
    })
    .filter((section) => section.title)

  return {
    title: (openingLines[0] || '').replace(/^#\s+/, ''),
    summary: openingLines.slice(1).join('\n').trim(),
    sections,
  }
}

export default function EditorialMarkdown({ content, compact = false }: { content: string; compact?: boolean }) {
  return (
    <div className={`editorial-markdown ${compact ? 'editorial-markdown-compact' : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="markdown-table-shell">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
