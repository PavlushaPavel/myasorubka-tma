import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel } from '../components/ui'
import { ESCALATION } from '../data/content'

export const Stage03Escalation = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="ESCALATION" tone="red" />

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', marginBottom: 8 }}>{ESCALATION.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>{ESCALATION.intro}</p>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {ESCALATION.steps.map((s, i) => {
          const red = s.tone === 'red'
          return (
            <Reveal key={i} delay={0.15 + i * 0.12}>
              <div
                className="panel"
                style={{
                  borderColor: red ? 'rgba(212,59,54,0.4)' : 'rgba(211,161,74,0.3)',
                  background: red ? 'rgba(212,59,54,0.06)' : 'rgba(211,161,74,0.04)',
                  marginLeft: i * 10,
                }}
              >
                <SystemLabel tone={red ? 'red' : 'amber'}>{s.label}</SystemLabel>
                <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.4, marginTop: 8, fontWeight: red ? 600 : 400 }}>{s.text}</p>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.7}>
        <div className="panel" style={{ marginBottom: 18 }}>
          {ESCALATION.tail.map((t, i) => (
            <p key={i} style={{ color: i === ESCALATION.tail.length - 1 ? 'var(--text)' : 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginTop: i ? 9 : 0, fontWeight: i === 1 ? 600 : 400 }}>{t}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.78} style={{ marginTop: 'auto' }}>
        <button className="btn btn-danger" onClick={() => { impact('medium'); navigateScreen(4, 'scan') }}>{ESCALATION.cta}</button>
      </Reveal>
    </div>
  )
}
