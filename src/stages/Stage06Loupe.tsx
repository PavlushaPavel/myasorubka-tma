import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { CaseBar, ProgressLevels, RiskTag, SystemLabel } from '../components/ui'
import { NodeGraph } from '../components/NodeGraph'
import { ForensicScanner } from '../components/ForensicScanner'
import { CHAIN, LOUPE } from '../data/content'

type Phase = 'idle' | 'scanning' | 'done'

export const Stage06Loupe = () => {
  const { impact, select } = useTelegramHaptics()
  const [phase, setPhase] = useState<Phase>('idle')

  const activate = () => {
    if (phase !== 'idle') return
    setPhase('scanning')
    impact('medium')
    setTimeout(() => { setPhase('done'); impact('heavy') }, 1900)
  }

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="STATUS: ANALYZING" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={2} /></div>

      <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', marginBottom: 8 }}>{LOUPE.title}</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>{LOUPE.sub}</p>

      <ForensicScanner scanning={phase === 'scanning'}>
        <SystemLabel tone="cyan">CHAIN BREAKDOWN MAP</SystemLabel>
        <div style={{ marginTop: 12 }}>
          <NodeGraph nodes={CHAIN} breakFrom={phase === 'done' ? 3 : -1} />
        </div>
      </ForensicScanner>

      {phase === 'idle' && (
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={activate}>
          Активировать Лупу
        </button>
      )}
      {phase === 'scanning' && (
        <p className="sys sys-cyan" style={{ textAlign: 'center', marginTop: 18 }}>СКАНИРОВАНИЕ ЦЕПОЧКИ…</p>
      )}

      {phase === 'done' && (
        <>
          {/* RISK LAYER */}
          <motion.div initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ duration: 0.5 }}
            className="panel" style={{ marginTop: 16, borderColor: 'rgba(212,59,54,0.3)' }}>
            <SystemLabel tone="red">RISK LAYER · ДО ЗАПУСКА</SystemLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0' }}>
              {LOUPE.riskFlags.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }}>
                  <RiskTag>{f}</RiskTag>
                </motion.div>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 12.5, lineHeight: 1.5 }}>{LOUPE.riskNote}</p>
          </motion.div>

          {/* FACT LAYER */}
          <motion.div initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ duration: 0.5, delay: 0.25 }}
            className="panel" style={{ marginTop: 12, borderColor: 'rgba(51,214,230,0.3)' }}>
            <SystemLabel tone="cyan">FACT LAYER · ПОСЛЕ ЗАПУСКА</SystemLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0' }}>
              {LOUPE.factChecks.map((f, i) => (
                <span key={i} className="tag tag-cyan">{f}</span>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 12.5, lineHeight: 1.5 }}>{LOUPE.factNote}</p>
          </motion.div>

          {/* formula */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ margin: '18px 0', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--text)' }}>
              {LOUPE.formula}
            </span>
          </motion.div>

          <button className="btn btn-primary" onClick={() => { select(); navigateScreen(7, 'scan') }}>
            {LOUPE.cta}
          </button>
        </>
      )}
    </div>
  )
}
