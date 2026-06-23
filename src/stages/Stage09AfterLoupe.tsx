import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, ManifestList, CinematicStrip } from '../components/ui'
import { AFTER_LOUPE } from '../data/content'
import phaseScan from '../assets/phase-scan.webp'

export const Stage09AfterLoupe = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="DEBRIEF" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={2} /></div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(23px, 6.6vw, 30px)', marginBottom: 14, lineHeight: 1.14 }}>{AFTER_LOUPE.title}</h1>
      </Reveal>

      <CinematicStrip src={phaseScan} label="MODE SHIFT / ОПРАВДАНИЯ → ДАННЫЕ" tone="cyan" position="50% 63%" />

      <Reveal delay={0.12}>
        <div className="panel" style={{ marginBottom: 16 }}>
          {AFTER_LOUPE.lead.map((l, i) => (
            <p key={i} style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.55, marginTop: i ? 8 : 0 }}>{l}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: 'var(--red-soft)', marginBottom: 10 }}>{AFTER_LOUPE.around}</p>
        <div style={{ marginBottom: 20 }}>
          <ManifestList items={AFTER_LOUPE.list} tone="red" />
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 12 }}>{AFTER_LOUPE.foldHead}</p>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(255,42,42,0.45)', background: 'rgba(255,42,42,0.06)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px, 5.6vw, 26px)', textTransform: 'uppercase', color: 'var(--red-soft)', lineHeight: 1.1 }}>{AFTER_LOUPE.fold}</p>
        </div>
      </Reveal>

      <Reveal delay={0.38} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(10, 'scan') }}>{AFTER_LOUPE.cta}</button>
      </Reveal>
    </div>
  )
}
