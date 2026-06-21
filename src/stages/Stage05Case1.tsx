import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, RiskTag } from '../components/ui'
import { NodeGraph } from '../components/NodeGraph'
import { CASE1, CHAIN } from '../data/content'

export const Stage05Case1 = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="CASE FILE OPEN" tone="amber" />

      <Reveal delay={0.05}>
        <ProgressLevels current={1} />
      </Reveal>

      <Reveal delay={0.12}>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', marginTop: 16, marginBottom: 16 }}>
          {CASE1.title}
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <div
          className="evidence"
          style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 22, padding: '18px 18px' }}
        >
          <span
            style={{
              flexShrink: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 40,
              color: 'var(--red)',
              lineHeight: 0.7,
              textShadow: '0 0 18px rgba(212,59,54,0.5)',
            }}
          >
            “
          </span>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 20,
              lineHeight: 1.3,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
            }}
          >
            {CASE1.lead}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div style={{ marginBottom: 12 }}>
          <SystemLabel tone="cyan">RESULT CHAIN</SystemLabel>
        </div>
      </Reveal>

      <Reveal delay={0.34}>
        <div className="panel" style={{ marginBottom: 22 }}>
          <NodeGraph nodes={CHAIN} breakFrom={3} />
        </div>
      </Reveal>

      <Reveal delay={0.42}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
          {CASE1.body}
        </p>
      </Reveal>

      <Reveal delay={0.5}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
          {CASE1.deaths.map((d) => (
            <RiskTag key={d}>{d}</RiskTag>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.58} style={{ marginTop: 'auto', paddingTop: 18 }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(6, 'scan') }}>
          {CASE1.cta}
        </button>
      </Reveal>
    </div>
  )
}
