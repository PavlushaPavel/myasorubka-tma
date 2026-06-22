import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ChatHeader, ChatBubble } from '../components/ui'
import { CHAT1 } from '../data/content'

export const Stage00Chat1 = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="INCOMING" tone="red" />

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(23px, 6.8vw, 31px)', marginBottom: 12 }}>{CHAT1.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>{CHAT1.lead}</p>
      </Reveal>

      <div className="panel" style={{ padding: '14px 14px 16px', marginBottom: 18 }}>
        <ChatHeader name={CHAT1.client} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {CHAT1.messages.map((m, i) => (
            <ChatBubble key={i} side="client" harsh={i === CHAT1.messages.length - 1} delay={0.2 + i * 0.35}>
              {m}
            </ChatBubble>
          ))}
        </div>
      </div>

      <Reveal delay={0.2 + CHAT1.messages.length * 0.35} style={{ marginTop: 'auto' }}>
        <button className="btn btn-danger" onClick={() => { impact('medium'); navigateScreen(1, 'scan') }}>
          {CHAT1.cta}
        </button>
      </Reveal>
    </div>
  )
}
