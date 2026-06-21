import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, ManifestList } from '../components/ui'
import { LONGREAD2 } from '../data/content'

export const Stage06Longread2 = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="MISSING BRIEF" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={2} /></div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(23px, 6.8vw, 31px)', marginBottom: 14 }}>{LONGREAD2.title}</h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{LONGREAD2.intro}</p>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ marginBottom: 8 }}><SystemLabel tone="cyan">ДОЛЖНЫ БЫЛИ ДАТЬ</SystemLabel></div>
        <div style={{ marginBottom: 20 }}>
          <ManifestList items={LONGREAD2.should} tone="cyan" />
        </div>
      </Reveal>

      <Reveal delay={0.26}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, textTransform: 'uppercase', color: 'var(--red-soft)', marginBottom: 12 }}>
          {LONGREAD2.butHeader}
        </p>
        <div className="panel" style={{ marginBottom: 22, borderColor: 'rgba(212,59,54,0.25)' }}>
          {LONGREAD2.reality.map((r, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5, marginTop: i ? 9 : 0, paddingLeft: 12, borderLeft: '2px solid rgba(212,59,54,0.4)' }}>
              {r}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.34}>
        <div
          className="panel"
          style={{ marginBottom: 14, borderColor: 'rgba(211,161,74,0.5)', background: 'linear-gradient(160deg, rgba(211,161,74,0.1), rgba(17,21,30,0.9))', boxShadow: 'var(--glow-amber)' }}
        >
          <SystemLabel tone="amber">{LONGREAD2.turnLabel}</SystemLabel>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, lineHeight: 1.3, color: 'var(--text)', margin: '10px 0' }}>
            {LONGREAD2.turn}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6 }}>{LONGREAD2.turnBody}</p>
        </div>
      </Reveal>

      <Reveal delay={0.42} style={{ marginTop: 'auto', paddingTop: 6 }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(7, 'scan') }}>
          {LONGREAD2.cta}
        </button>
      </Reveal>
    </div>
  )
}
