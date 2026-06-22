import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, OptionChip, ReactionPanel } from '../components/ui'
import { CHALLENGE } from '../data/content'

export const Stage05Challenge = () => {
  const { impact, select, notify } = useTelegramHaptics()
  const [picked, setPicked] = useState<string | null>(null)

  const pick = (key: string) => {
    if (picked) return
    setPicked(key)
    if (key === CHALLENGE.correctKey) notify('success')
    else select()
  }

  const isCorrect = picked === CHALLENGE.correctKey
  const reaction = picked ? CHALLENGE.reactions[picked] : null

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="YOUR MOVE" tone="red" />

      <Reveal delay={0.05}>
        <ProgressLevels current={1} />
      </Reveal>

      <Reveal delay={0.12}>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', marginTop: 16, marginBottom: 14 }}>{CHALLENGE.title}</h1>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(212,59,54,0.3)' }}>
          <SystemLabel tone="red">{CHALLENGE.recapLabel}</SystemLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {CHALLENGE.recap.map((r) => (
              <span key={r} className="tag tag-red">{r}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <h2 style={{ fontSize: 'clamp(18px, 5vw, 22px)', marginBottom: 14 }}>{CHALLENGE.question}</h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CHALLENGE.options.map((opt, i) => {
          let state: 'idle' | 'correct' | 'wrong' = 'idle'
          if (picked === opt.key) state = opt.key === CHALLENGE.correctKey ? 'correct' : 'wrong'
          return (
            <Reveal key={opt.key} delay={0.3 + i * 0.06}>
              <OptionChip text={opt.text} selected={opt.key === picked} state={state} onToggle={() => pick(opt.key)} />
            </Reveal>
          )
        })}
      </div>

      {reaction && (
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 18 }}
        >
          <ReactionPanel label={reaction.label} tone={isCorrect ? 'cyan' : 'red'}>
            {reaction.text}
          </ReactionPanel>
          <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(6, 'scan') }}>
            {CHALLENGE.cta}
          </button>
        </motion.div>
      )}
    </div>
  )
}
