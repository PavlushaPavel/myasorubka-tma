import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, OptionChip, ReactionPanel } from '../components/ui'
import { CHALLENGE } from '../data/content'
import { getRole } from '../data/roles'
import { useAppStore } from '../store/useAppStore'

export const Stage03Challenge = () => {
  const { impact, select, notify } = useTelegramHaptics()
  const roleId = useAppStore((s) => s.role)
  const role = getRole(roleId ?? 'director') ?? getRole('director')!
  const [picked, setPicked] = useState<string | null>(null)

  const pick = (key: string) => {
    if (picked) return
    setPicked(key)
    if (key === CHALLENGE.correctKey) notify('success')
    else select()
  }

  const isCorrect = picked === CHALLENGE.correctKey

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="RAPID INTERROGATION" tone="red" />

      <Reveal delay={0.05}>
        <ProgressLevels current={1} />
      </Reveal>

      {/* role-personalized setup */}
      <Reveal delay={0.12}>
        <div className="evidence" style={{ marginTop: 16, marginBottom: 16 }}>
          <SystemLabel tone="amber">ВВОДНАЯ</SystemLabel>
          <h1 style={{ fontSize: 'clamp(21px, 6vw, 28px)', margin: '8px 0 12px' }}>{role.hireTitle}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {role.setup.map((s, i) => (
              <p key={i} style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.45 }}>{s}</p>
            ))}
          </div>
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid rgba(212,59,54,0.25)',
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <span className="sys sys-red" style={{ marginTop: 2, flexShrink: 0 }}>ЧЕРЕЗ МЕСЯЦ</span>
            <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.4, fontWeight: 500 }}>«{role.complaint}»</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <h2 style={{ fontSize: 'clamp(20px, 5.5vw, 26px)', marginBottom: 16 }}>{CHALLENGE.question}</h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CHALLENGE.options.map((opt, i) => {
          let state: 'idle' | 'correct' | 'wrong' = 'idle'
          if (picked === opt.key) state = opt.key === CHALLENGE.correctKey ? 'correct' : 'wrong'
          return (
            <Reveal key={opt.key} delay={0.28 + i * 0.06}>
              <OptionChip text={opt.text} selected={opt.key === picked} state={state} onToggle={() => pick(opt.key)} />
            </Reveal>
          )
        })}
      </div>

      {picked && (
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 18 }}
        >
          <ReactionPanel label={isCorrect ? CHALLENGE.goodLabel : CHALLENGE.trapLabel} tone={isCorrect ? 'cyan' : 'red'}>
            {isCorrect ? CHALLENGE.goodReaction : CHALLENGE.trapReaction}
          </ReactionPanel>
          <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(4, 'scan') }}>
            {isCorrect ? 'Показать цепочку' : 'Показать, где тебя делают крайним'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
