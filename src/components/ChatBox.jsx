import { useState, useRef, useEffect } from 'react'
import { sendChatMessage } from '../api'

export default function ChatBox() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const endRef = useRef(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, busy, open])

  const send = async () => {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    setText('')
    setError(null)
    const history = messages.map((m) => ({ role: m.role, content: m.content }))
    setMessages((m) => [...m, { role: 'user', content: trimmed }])
    setBusy(true)
    try {
      const reply = await sendChatMessage(trimmed, history)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask about Tin"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>Ask about Tin</span>
            <button className="chat-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          <div className="chat-log">
            {messages.length === 0 && (
              <div className="chat-hint">
                Ask me anything about Tin&rsquo;s experience, projects, or
                skills.
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.role}`}>
                {m.content}
              </div>
            ))}
            {busy && <div className="bubble assistant typing">…</div>}
            {error && <div className="chat-error">{error}</div>}
            <div ref={endRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={text}
              placeholder="Ask a question..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              disabled={busy}
            />
            <button onClick={send} disabled={busy}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
