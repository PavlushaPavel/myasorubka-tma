import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { CaseBar, ProgressLevels, SystemLabel } from '../components/ui'
import { useCountUp } from '../hooks/useCountUp'
import { useAppStore } from '../store/useAppStore'
import { VERDICTS } from '../data/content'

export const Stage09Verdict = () => {
  const { select } = useTelegramHaptics()
  const getScore = useAppStore((s) => s.score)
  const [s] = useState(() => getScore())

  const animated = useCountUp({ from: 0, to: s, duration: 1500, active: true })
  const v = VERDICTS.find((x) => s >= x.min && s <= x.max) ?? VERDICTS[0]

  return (
    <div className="screen">
      <CaseBar id="CASE #002" status="INVESTIGATION STATUS" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      <SystemLabel tone="cyan">INVESTIGATION STATUS</SystemLabel>

      {/* Gauge */}
      <div style={{ textAlign: 'center', margin: '26px 0 10px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          ЛУПА ВКЛЮЧЕНА НА
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(56px, 22vw, 72px)', lineHeight: 1, color: 'var(--cyan)', textShadow: '0 0 28px rgba(51,214,230,0.6)', marginTop: 6 }}>
          {animated}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 10, borderRadius: 6, background: 'rgba(231,236,243,0.1)', overflow: 'hidden', margin: '14px 0 26px', border: '1px solid var(--border)' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${s}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%', background: 'var(--cyan)', boxShadow: 'var(--glow-cyan)', borderRadius: 6 }}
        />
      </div>

      {/* Verdict card */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="panel"
        style={{ marginBottom: 22, borderColor: 'rgba(51,214,230,0.35)' }}
      >
        <h2 style={{ fontSize: 'clamp(21px, 6vw, 27px)', textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: 12 }}>
          {v.title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{v.body}</p>
      </motion.div>

      <button className="btn btn-primary" onClick={() => { select(); navigateScreen(10, 'scan') }}>
        Открыть антислив-набор
      </button>
    </div>
  )
}
