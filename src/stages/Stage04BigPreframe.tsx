import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels } from '../components/ui'
import { BIG_PREFRAME, LEVELS } from '../data/content'

export const Stage04BigPreframe = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="BRIEFING" tone="amber" />

      <Reveal delay={0.05}>
        <ProgressLevels current={1} />
      </Reveal>

      <Reveal delay={0.12}>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', marginTop: 16, marginBottom: 14 }}>
          {BIG_PREFRAME.title}
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="panel" style={{ marginBottom: 22 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.65 }}>
            {BIG_PREFRAME.intro}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div style={{ marginBottom: 12 }}>
          <SystemLabel tone="cyan">ПЯТЬ УРОВНЕЙ ДЕЛА</SystemLabel>
        </div>
      </Reveal>

      <div
        className="panel"
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 0, padding: '6px 16px' }}
      >
        {/* vertical case-map line */}
        <div
          style={{
            position: 'absolute',
            left: 30,
            top: 26,
            bottom: 26,
            width: 1,
            background: 'rgba(51,214,230,0.25)',
          }}
        />
        {LEVELS.map((lvl, i) => (
          <Reveal key={lvl.n} delay={0.34 + i * 0.08}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '14px 0',
                borderTop: i ? '1px solid var(--border)' : 'none',
              }}
            >
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  flexShrink: 0,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 18,
                  color: 'var(--cyan)',
                  textShadow: '0 0 10px rgba(51,214,230,0.5)',
                  lineHeight: 1,
                  width: 28,
                  textAlign: 'center',
                }}
              >
                0{lvl.n}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 16,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                  }}
                >
                  {lvl.title}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5, marginTop: 3 }}>
                  {lvl.desc}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.34 + LEVELS.length * 0.08 + 0.06} style={{ marginTop: 'auto', paddingTop: 18 }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(5, 'scan') }}>
          {BIG_PREFRAME.cta}
        </button>
      </Reveal>
    </div>
  )
}
