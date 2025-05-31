import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/log-to-notion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    })
    const data = await res.json()
    setReply(data.reply)
    setLoading(false)
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>命理问答系统</h1>
      <form onSubmit={handleSubmit}>
        <textarea rows={3} value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">提交</button>
      </form>
      {loading ? <p>生成中…</p> : <p><b>回复：</b>{reply}</p>}
    </main>
  )
}
