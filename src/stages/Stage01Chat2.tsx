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
        <h1 style={{ fontSize: 'clamp(22px, 6.4vw, 29px)', marginBottom: 16 }}>{CHAT2.title}</h1>
      </Reveal>

      <div className="panel" style={{ padding: '14px 14px 16px', marginBottom: 18 }}>
        <ChatHeader name={CHAT2.client} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CHAT2.messages.map((m, i) => (
            <ChatBubble key={i} side="client" harsh={i >= CHAT2.messages.length - 2} delay={0.15 + i * 0.22}>
              {m}
            </ChatBubble>
          ))}
        </div>
      </div>

      <Reveal delay={0.15 + CHAT2.messages.length * 0.22} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(2, 'scan') }}>
          {CHAT2.cta}
        </button>
      </Reveal>
    </div>
  )
}
