import { useMemo, useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * 轻量语法高亮：只处理注释 / 字符串 / 关键字 / 数字 / 标签，
 * 不引入大型高亮依赖。
 */

const KEYWORDS = new Set([
  'import', 'export', 'from', 'default', 'function', 'return', 'const', 'let', 'var',
  'type', 'interface', 'extends', 'implements', 'new', 'if', 'else', 'for', 'while',
  'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'async',
  'await', 'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined',
  'void', 'string', 'number', 'boolean',
])

function tokenize(line: string, lang: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // 注释（整行）
  if (/^\s*(\/\/|\/\*|\*|<!--)/.test(line) && lang !== 'css') {
    return [<span key="c" className="tok-comment">{line}</span>]
  }
  if (lang === 'css' && /^\s*(\/\*|\*)/.test(line)) {
    return [<span key="c" className="tok-comment">{line}</span>]
  }

  const pattern = /(\/\*.*?\*\/|\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.-]*|\/>|>)|(\b\d+(?:\.\d+)?(?:px|rem|em|ms|s|%)?\b)|([\w-]+(?==))/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0

  const pushPlain = (text: string) => {
    if (!text) return
    // 关键字着色
    const parts = text.split(/(\b)/)
    nodes.push(
      ...parts.map((part, index) => {
        if (KEYWORDS.has(part)) return <span key={`${key++}-${index}`} className="tok-keyword">{part}</span>
        return part
      }),
    )
  }

  while ((match = pattern.exec(line)) !== null) {
    pushPlain(line.slice(last, match.index))
    const [full, comment, str, tag, num, attr] = match
    if (comment) nodes.push(<span key={key++} className="tok-comment">{comment}</span>)
    else if (str) nodes.push(<span key={key++} className="tok-string">{str}</span>)
    else if (tag) nodes.push(<span key={key++} className="tok-tag">{tag}</span>)
    else if (num) nodes.push(<span key={key++} className="tok-number">{num}</span>)
    else if (attr) nodes.push(<span key={key++} className="tok-attr">{attr}</span>)
    last = match.index + full.length
  }
  pushPlain(line.slice(last))
  return nodes
}

export function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: string }) {
  const lines = useMemo(() => code.replace(/\n$/, '').split('\n'), [code])
  return (
    <pre className="dl-code">
      <code>
        {lines.map((line, index) => (
          <span key={index} className="dl-code__line">
            {line ? tokenize(line, lang) : ' '}
          </span>
        ))}
      </code>
    </pre>
  )
}

export function CopyButton({ text, label = '复制' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button type="button" className="dl-copy" onClick={copy} aria-live="polite">
      {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
      {copied ? '已复制' : label}
    </button>
  )
}
