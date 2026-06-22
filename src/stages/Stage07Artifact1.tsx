import { useEffect } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, ManifestList, UnlockFrame } from '../components/ui'
import { ARTIFACT1 } from '../data/content'

export const Stage07Artifact1 = () => {
  const { impact, select } = useTelegramHaptics()
  useEffect(() => { impact('heavy') }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="ARTEFACT VAULT" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      {/* sealed evidence container unlocking */}
      <div style={{ marginBottom: 16 }}>
        <UnlockFrame accent="cyan">
          <div className="panel" style={{ borderColor: 'rgba(0,217,255,0.4)', background: 'linear-gradient(160deg, rgba(0,217,255,0.08), rgba(17,21,30,0.9))', boxShadow: 'var(--glow-cyan)' }}>
            <SystemLabel tone="cyan">{ARTIFACT1.unlockLabel}</SystemLabel>
            <h1 style={{ fontSize: 'clamp(26px, 8vw, 36px)', margin: '12px 0 10px' }}>{ARTIFACT1.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{ARTIFACT1.body}</p>
          </div>
        </UnlockFrame>
      </div>

      {/* task prompt */}
      <Reveal delay={0.12}>
        <div className="panel" style={{ marginBottom: 16 }}>
          <SystemLabel tone="faint">{ARTIFACT1.taskLabel}</SystemLabel>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.6, color: 'var(--ice)', marginTop: 10 }}>
            <span style={{ color: 'var(--cyan)' }}>{'> '}</span>{ARTIFACT1.task}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginBottom: 8 }}><SystemLabel tone="cyan">{ARTIFACT1.getTitle.toUpperCase()}</SystemLabel></div>
        <div style={{ marginBottom: 18 }}>
          <ManifestList items={ARTIFACT1.gets} tone="cyan" />
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(255,177,59,0.45)', background: 'rgba(255,177,59,0.05)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, lineHeight: 1.3, color: 'var(--amber-soft)' }}>
            {ARTIFACT1.punch}
          </p>
        </div>
      </Reveal>

      <button className="btn btn-primary" onClick={() => { impact('light'); window.open(ARTIFACT1.link, '_blank') }}>
        {ARTIFACT1.cta}
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => { select(); navigateScreen(12, 'scan') }}>
        {ARTIFACT1.nextCta}
      </button>
    </div>
  )
}
