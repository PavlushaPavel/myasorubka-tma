import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ChatHeader, ChatBubble } from '../components/ui'
import { CHAT2 } from '../data/content'

export const Stage01Chat2 = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="INCOMING" tone="red" />

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(22px, 6.4vw, 29px)', marginBottom: 14 }}>{CHAT2.title}</h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="panel" style={{ marginBottom: 16, padding: '12px 14px', borderColor: 'rgba(255,42,42,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span className="sys sys-red">ДАВЛЕНИЕ КЛИЕНТА</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--red-soft)' }}>92%</span>
          </div>
          <div className="pressure-bar"><span style={{ width: '92%' }} /></div>
        </div>
      </Reveal>

      <div className="panel tg-chat" style={{ padding: 0, marginBottom: 18 }}>
        <ChatHeader name={CHAT2.client} />
        <div className="tg-message-list">
          {CHAT2.messages.map((m, i) => (
            <ChatBubble key={i} side="client" harsh={i >= CHAT2.messages.length - 2} delay={0.15 + i * 0.22}>
              {m}
            </ChatBubble>
          ))}
        </div>
      </div>

      <Reveal delay={0.15 + CHAT2.messages.length * 0.22} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(3, 'scan') }}>
          {CHAT2.cta}
        </button>
      </Reveal>
    </div>
  )
}
