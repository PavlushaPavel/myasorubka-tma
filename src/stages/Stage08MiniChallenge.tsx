import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, OptionChip, ReactionPanel } from '../components/ui'
import { MINI_CHALLENGE as M } from '../data/content'

export const Stage08MiniChallenge = () => {
  const { impact, select, notify } = useTelegramHaptics()
  const [sel, setSel] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const toggle = (key: string) => {
    if (submitted) return
    setSel((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]))
    select()
  }

  const submit = () => {
    if (!sel.length) return
    setSubmitted(true)
    impact('heavy')
    const hasTrap = M.options.some((o) => o.trap && sel.includes(o.key))
    notify(hasTrap ? 'error' : 'success')
  }

  const chipState = (key: string): 'idle' | 'correct' | 'wrong' => {
    if (!submitted || !sel.includes(key)) return 'idle'
    const opt = M.options.find((o) => o.key === key)
    if (opt?.trap) return 'wrong'
    if (M.correctKeys.includes(key)) return 'correct'
    return 'idle'
  }

  const hasTrap = M.options.some((o) => o.trap && sel.includes(o.key))

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="CHECKPOINT" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      <Reveal delay={0.05}>
        <SystemLabel tone="amber">{M.caseLabel}</SystemLabel>
        <h1 style={{ fontSize: 'clamp(22px, 6.5vw, 30px)', margin: '8px 0 14px' }}>{M.title}</h1>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="evidence" style={{ marginBottom: 16 }}>
          <SystemLabel tone="amber">ГОВОРИТ КЛИЕНТ</SystemLabel>
          <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.5, marginTop: 10, fontWeight: 500 }}>«{M.clientLine}»</p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <h2 style={{ fontSize: 'clamp(18px, 5vw, 22px)', marginBottom: 14 }}>{M.question}</h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {M.options.map((o) => (
          <OptionChip key={o.key} text={o.text} selected={sel.includes(o.key)} state={chipState(o.key)} onToggle={() => toggle(o.key)} />
        ))}
      </div>

      {!submitted && (
        <button className="btn btn-primary" disabled={!sel.length} onClick={submit}>Проверить</button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ duration: 0.5 }}>
          <ReactionPanel label={hasTrap ? M.trapLabel : M.goodLabel} tone={hasTrap ? 'red' : 'cyan'}>
            {hasTrap ? M.trapReaction : M.goodReaction}
          </ReactionPanel>
          <button className="btn btn-primary" onClick={() => { select(); navigateScreen(13, 'scan') }}>{M.cta}</button>
        </motion.div>
      )}
    </div>
  )
}
