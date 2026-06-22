import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels } from '../components/ui'
import { CLIENT_SAYS } from '../data/content'

export const Stage06ClientSays = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="DECODE" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={2} /></div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(22px, 6.4vw, 29px)', marginBottom: 14, lineHeight: 1.12 }}>{CLIENT_SAYS.title}</h1>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(255,42,42,0.4)', background: 'rgba(255,42,42,0.05)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: 'var(--red-soft)' }}>{CLIENT_SAYS.opener}</p>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
        {CLIENT_SAYS.pairs.map((p, i) => (
          <Reveal key={i} delay={0.18 + i * 0.09}>
            <div className="panel" style={{ padding: '12px 14px' }}>
              <SystemLabel tone="faint">ОН НЕ ПИШЕТ</SystemLabel>
              <p style={{ color: 'var(--text-faint)', fontSize: 13, lineHeight: 1.4, marginTop: 6, marginBottom: 11, textDecoration: 'line-through', textDecorationColor: 'rgba(124,135,148,0.6)' }}>
                «{p.not}»
              </p>
              <SystemLabel tone="red">ОН ПИШЕТ</SystemLabel>
              <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.35, marginTop: 6, fontWeight: 600 }}>«{p.is}»</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.6} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(7, 'scan') }}>{CLIENT_SAYS.cta}</button>
      </Reveal>
    </div>
  )
}
