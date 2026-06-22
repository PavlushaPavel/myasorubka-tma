import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, ChatBubble } from '../components/ui'
import { SPIRAL } from '../data/content'

export const Stage07Spiral = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="DEADLOCK" tone="red" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={2} /></div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(21px, 6.2vw, 28px)', marginBottom: 10, lineHeight: 1.14 }}>{SPIRAL.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>{SPIRAL.lead}</p>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {SPIRAL.dialogue.map((d, i) => (
          <ChatBubble key={i} side={d.who} delay={0.15 + i * 0.25}>
            {d.text}
          </ChatBubble>
        ))}
      </div>

      <Reveal delay={0.15 + SPIRAL.dialogue.length * 0.25}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(212,59,54,0.35)' }}>
          <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.55 }}>{SPIRAL.tail}</p>
        </div>
      </Reveal>

      <Reveal delay={0.25 + SPIRAL.dialogue.length * 0.25} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(8, 'scan') }}>{SPIRAL.cta}</button>
      </Reveal>
    </div>
  )
}
