import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels } from '../components/ui'
import { LONGREAD3 } from '../data/content'

export const Stage10Longread3 = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="UPGRADE PATH" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(23px, 6.8vw, 31px)', marginBottom: 16 }}>{LONGREAD3.title}</h1>
      </Reveal>

      {/* old waiting mindset */}
      <Reveal delay={0.12}>
        <div className="panel" style={{ marginBottom: 12, borderColor: 'rgba(255,42,42,0.25)' }}>
          {LONGREAD3.before.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '7px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <span style={{ color: 'var(--text)', fontSize: 13.5, fontWeight: 600, flexShrink: 0, minWidth: 96 }}>{b.q}</span>
              <span style={{ color: 'var(--red-soft)', fontSize: 13.5, lineHeight: 1.4 }}>{b.a}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: 'var(--red-soft)', marginBottom: 22 }}>
          {LONGREAD3.beforeTail}
        </p>
      </Reveal>

      {/* the turn */}
      <Reveal delay={0.28}>
        <div className="panel" style={{ marginBottom: 14, borderColor: 'rgba(0,217,255,0.45)', background: 'rgba(0,217,255,0.05)', boxShadow: 'var(--glow-cyan)' }}>
          <SystemLabel tone="cyan">{LONGREAD3.turnLabel}</SystemLabel>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, lineHeight: 1.3, color: 'var(--text)', margin: '10px 0 14px' }}>
            {LONGREAD3.turn}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LONGREAD3.now.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--cyan)', fontWeight: 700, lineHeight: 1.5, flexShrink: 0 }}>→</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.5 }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.36}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(255,177,59,0.45)', background: 'rgba(255,177,59,0.05)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, lineHeight: 1.35, color: 'var(--amber-soft)' }}>
            {LONGREAD3.punch}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.44} style={{ marginTop: 'auto', paddingTop: 6 }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(15, 'scan') }}>
          {LONGREAD3.cta}
        </button>
      </Reveal>
    </div>
  )
}
