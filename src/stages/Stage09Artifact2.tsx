import { useEffect } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, UnlockFrame } from '../components/ui'
import { ARTIFACT2 } from '../data/content'

export const Stage09Artifact2 = () => {
  const { impact, select } = useTelegramHaptics()
  useEffect(() => { impact('heavy') }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="ARTEFACT VAULT" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      <div style={{ marginBottom: 16 }}>
        <UnlockFrame accent="cyan">
          <div className="panel" style={{ borderColor: 'rgba(51,214,230,0.4)', background: 'linear-gradient(160deg, rgba(51,214,230,0.08), rgba(17,21,30,0.9))', boxShadow: 'var(--glow-cyan)' }}>
            <SystemLabel tone="cyan">{ARTIFACT2.unlockLabel}</SystemLabel>
            <h1 style={{ fontSize: 'clamp(26px, 8vw, 36px)', margin: '12px 0 10px' }}>{ARTIFACT2.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{ARTIFACT2.body}</p>
          </div>
        </UnlockFrame>
      </div>

      {/* weak offer being replaced */}
      <Reveal delay={0.12}>
        <div className="panel" style={{ marginBottom: 14, borderColor: 'rgba(212,59,54,0.35)', background: 'rgba(212,59,54,0.05)' }}>
          <SystemLabel tone="red">БЫЛО</SystemLabel>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.4, marginTop: 8, textDecoration: 'line-through', textDecorationColor: 'rgba(212,59,54,0.6)' }}>
            {ARTIFACT2.weak}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ marginBottom: 10 }}><SystemLabel tone="cyan">СТАЛО · ПОД СЕГМЕНТЫ</SystemLabel></div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 16 }}>
        {ARTIFACT2.offers.map((o, i) => (
          <Reveal key={o.seg} delay={0.22 + i * 0.07}>
            <div className="panel" style={{ padding: '12px 14px' }}>
              <span className="tag tag-amber">{o.seg}</span>
              <p style={{ color: 'var(--text)', fontSize: 13.5, lineHeight: 1.45, marginTop: 8 }}>{o.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.6}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6, marginBottom: 18 }}>{ARTIFACT2.note}</p>
      </Reveal>

      <button className="btn btn-primary" onClick={() => { impact('light'); window.open(ARTIFACT2.link, '_blank') }}>
        {ARTIFACT2.cta}
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => { select(); navigateScreen(14, 'scan') }}>
        {ARTIFACT2.nextCta}
      </button>
    </div>
  )
}
