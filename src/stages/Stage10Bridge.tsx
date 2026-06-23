import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, ManifestList } from '../components/ui'
import { BRIDGE } from '../data/content'

export const Stage10Bridge = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="HANDOVER" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(22px, 6.2vw, 29px)', marginBottom: 16, lineHeight: 1.14 }}>{BRIDGE.title}</h1>
      </Reveal>

      <Reveal delay={0.12}>
        <div style={{ marginBottom: 8 }}><SystemLabel tone="cyan">{BRIDGE.shouldHead.toUpperCase()}</SystemLabel></div>
        <div style={{ marginBottom: 20 }}>
          <ManifestList items={BRIDGE.should} tone="cyan" />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: 'var(--red-soft)', marginBottom: 12 }}>{BRIDGE.butHead}</p>
        <div className="panel" style={{ marginBottom: 16, borderColor: 'rgba(255,42,42,0.25)' }}>
          {BRIDGE.reality.map((r, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5, marginTop: i ? 9 : 0, paddingLeft: 12, borderLeft: '2px solid rgba(255,42,42,0.4)' }}>{r}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: 'var(--text)', marginBottom: 16 }}>{BRIDGE.thenLine}</p>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(0,217,255,0.45)', background: 'rgba(0,217,255,0.05)', boxShadow: 'var(--glow-cyan)' }}>
          <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.55 }}>{BRIDGE.turn}</p>
        </div>
      </Reveal>

      <Reveal delay={0.36} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(12, 'scan') }}>{BRIDGE.cta}</button>
      </Reveal>
    </div>
  )
}
