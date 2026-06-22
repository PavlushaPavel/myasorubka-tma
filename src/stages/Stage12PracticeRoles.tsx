import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { CaseBar, SystemLabel, ProgressLevels, OptionChip, ReactionPanel } from '../components/ui'
import { PRACTICE_ROLES } from '../data/content'
import { getRole } from '../data/roles'
import { useAppStore } from '../store/useAppStore'

export const Stage12PracticeRoles = () => {
  const { impact, select, notify } = useTelegramHaptics()
  const roleId = useAppStore((s) => s.role)
  const role = getRole(roleId ?? 'director') ?? getRole('director')!
  const { question, options, correctKeys, trapReaction, goodReaction, goodLabel } = role.preLaunch

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
    const hasTrap = options.some((o) => o.trap && sel.includes(o.key))
    notify(hasTrap ? 'error' : 'success')
  }

  const chipState = (key: string): 'idle' | 'correct' | 'wrong' => {
    if (!submitted || !sel.includes(key)) return 'idle'
    const opt = options.find((o) => o.key === key)
    if (opt?.trap) return 'wrong'
    if (correctKeys.includes(key)) return 'correct'
    return 'idle'
  }

  const hasTrap = options.some((o) => o.trap && sel.includes(o.key))

  return (
    <div className="screen">
      <CaseBar id="CASE #003" status="ROLE PRACTICE" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={4} /></div>

      <SystemLabel tone="amber">{PRACTICE_ROLES.caseLabel} · {role.label.toUpperCase()}</SystemLabel>
      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.5, margin: '10px 0 14px' }}>{PRACTICE_ROLES.note}</p>

      <h2 style={{ fontSize: 'clamp(20px, 5.5vw, 25px)', lineHeight: 1.2, marginBottom: 16 }}>{question}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {options.map((o) => (
          <OptionChip key={o.key} text={o.text} selected={sel.includes(o.key)} state={chipState(o.key)} onToggle={() => toggle(o.key)} />
        ))}
      </div>

      {!submitted && (
        <button className="btn btn-primary" disabled={!sel.length} onClick={submit}>Проверить</button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ duration: 0.5 }}>
          <ReactionPanel label={hasTrap ? 'НЕ ТУДА' : goodLabel} tone={hasTrap ? 'red' : 'cyan'}>
            {hasTrap ? trapReaction : goodReaction}
          </ReactionPanel>
          <button className="btn btn-primary" onClick={() => { select(); navigateScreen(17, 'scan') }}>{PRACTICE_ROLES.cta}</button>
        </motion.div>
      )}
    </div>
  )
}
