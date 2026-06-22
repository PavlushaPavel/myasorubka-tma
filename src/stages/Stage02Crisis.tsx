import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel } from '../components/ui'
import { CRISIS } from '../data/content'

export const Stage02Crisis = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="PRESSURE" tone="red" />

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(22px, 6.4vw, 29px)', marginBottom: 16, lineHeight: 1.12 }}>{CRISIS.title}</h1>
      </Reveal>

      <Reveal delay={0.12}>
        <div style={{ marginBottom: 6 }}><SystemLabel tone="red">{CRISIS.readLabel}</SystemLabel></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {CRISIS.read.map((r) => (
            <span key={r} className="tag tag-red">{r}</span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, marginBottom: 8 }}>{CRISIS.innerHead}</p>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 6.5vw, 28px)', textTransform: 'uppercase', color: 'var(--red-soft)', lineHeight: 1.1, marginBottom: 14 }}>
          {CRISIS.inner}
        </p>
        <div className="panel" style={{ marginBottom: 18 }}>
          {CRISIS.defense.map((d, i) => (
            <p key={i} style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.5, marginTop: i ? 6 : 0 }}>{d}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 12 }}>{CRISIS.butLine}</p>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(255,42,42,0.4)', background: 'rgba(255,42,42,0.05)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--red-soft)', letterSpacing: '0.02em' }}>{CRISIS.math}</p>
        </div>
      </Reveal>

      <Reveal delay={0.36}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 10 }}>{CRISIS.doubtHead}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          {CRISIS.doubts.map((d, i) => (
            <p key={i} style={{ color: 'var(--text-faint)', fontSize: 13.5, lineHeight: 1.45, paddingLeft: 11, borderLeft: '2px solid var(--border)', fontStyle: 'italic' }}>{d}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.44}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(255,177,59,0.45)', background: 'rgba(255,177,59,0.05)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, lineHeight: 1.35, color: 'var(--amber-soft)' }}>{CRISIS.punch}</p>
        </div>
      </Reveal>

      <Reveal delay={0.5} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(3, 'scan') }}>{CRISIS.cta}</button>
      </Reveal>
    </div>
  )
}
