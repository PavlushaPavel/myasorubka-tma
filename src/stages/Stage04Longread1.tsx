import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, RiskTag } from '../components/ui'
import { NodeGraph } from '../components/NodeGraph'
import { LONGREAD1, CHAIN } from '../data/content'

export const Stage04Longread1 = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="BRIEFING" tone="amber" />

      <Reveal delay={0.05}>
        <ProgressLevels current={1} />
      </Reveal>

      <Reveal delay={0.12}>
        <h1 style={{ fontSize: 'clamp(23px, 6.8vw, 31px)', marginTop: 16, marginBottom: 14 }}>{LONGREAD1.title}</h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{LONGREAD1.intro}</p>
      </Reveal>

      {/* equals = маркетинг (the lie) */}
      <Reveal delay={0.26}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
          {LONGREAD1.equals.map((e) => (
            <span key={e} className="tag tag-amber" style={{ opacity: 0.85 }}>{e}</span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, textTransform: 'uppercase', color: 'var(--red-soft)', marginBottom: 12 }}>
          {LONGREAD1.butHeader}
        </p>
      </Reveal>

      <Reveal delay={0.38}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(212,59,54,0.25)' }}>
          {LONGREAD1.buts.map((b, i) => (
            <p key={i} style={{ color: 'var(--text)', fontSize: 13.5, lineHeight: 1.5, marginTop: i ? 9 : 0, paddingLeft: 12, borderLeft: '2px solid rgba(212,59,54,0.4)' }}>
              {b}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.44}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: 20 }}>
          {LONGREAD1.split}
        </p>
      </Reveal>

      <Reveal delay={0.5}>
        <div style={{ marginBottom: 12 }}><SystemLabel tone="cyan">RESULT CHAIN · ЦА → ПРОДАЖА</SystemLabel></div>
      </Reveal>

      <Reveal delay={0.56}>
        <div className="panel" style={{ marginBottom: 18 }}>
          <NodeGraph nodes={CHAIN} breakFrom={4} />
        </div>
      </Reveal>

      <Reveal delay={0.62}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{LONGREAD1.chainNote}</p>
      </Reveal>

      <Reveal delay={0.68}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
          {LONGREAD1.holes.map((h) => (
            <RiskTag key={h}>{h}</RiskTag>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.74}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{LONGREAD1.holesTail}</p>
      </Reveal>

      <Reveal delay={0.8}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(51,214,230,0.45)', background: 'rgba(51,214,230,0.05)', boxShadow: 'var(--glow-cyan)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, lineHeight: 1.35, color: 'var(--text)' }}>
            {LONGREAD1.formula}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.86} style={{ marginTop: 'auto', paddingTop: 6 }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(5, 'scan') }}>
          {LONGREAD1.cta}
        </button>
      </Reveal>
    </div>
  )
}
