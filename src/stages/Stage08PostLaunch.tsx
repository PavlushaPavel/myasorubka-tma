import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { CaseBar, ProgressLevels, SystemLabel, OptionChip } from '../components/ui'
import { useAppStore } from '../store/useAppStore'
import { getRole } from '../data/roles'

export const Stage08PostLaunch = () => {
  const { impact, select, notify } = useTelegramHaptics()
  const roleId = useAppStore((s) => s.role)
  const setPostLaunchSelected = useAppStore((s) => s.setPostLaunchSelected)
  const role = getRole(roleId ?? 'director') ?? getRole('director')!

  const [sel, setSel] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const { question, options, correctKeys, trapReaction, goodReaction } = role.postLaunch

  const toggle = (key: string) => {
    if (submitted) return
    const next = sel.includes(key) ? sel.filter((k) => k !== key) : [...sel, key]
    setSel(next)
    select()
  }

  const submit = () => {
    if (sel.length === 0) return
    setPostLaunchSelected(sel)
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
  const reaction = hasTrap
    ? { text: trapReaction, tone: 'red' as const, label: 'НЕ ТУДА' }
    : { text: goodReaction, tone: 'cyan' as const, label: 'ВЕРНО' }
  const reactColor = reaction.tone === 'red' ? 'var(--red)' : 'var(--cyan)'

  return (
    <div className="screen">
      <CaseBar id="CASE #002" status="POST-LAUNCH CHECK" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(212,59,54,0.3)' }}>
        <SystemLabel tone="red">ВАЖНО</SystemLabel>
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.55, marginTop: 10 }}>
          Мы не проверяем настройки твоего инструмента — это ты знаешь сам. Мы спрашиваем: что произошло с человеком ПОСЛЕ контакта с инструментом.
        </p>
      </div>

      <h2 style={{ fontSize: 'clamp(20px, 5.5vw, 25px)', lineHeight: 1.2, marginBottom: 16 }}>{question}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {options.map((o) => (
          <OptionChip
            key={o.key}
            text={o.text}
            selected={sel.includes(o.key)}
            state={chipState(o.key)}
            onToggle={() => toggle(o.key)}
          />
        ))}
      </div>

      {!submitted && (
        <button className="btn btn-primary" disabled={sel.length === 0} onClick={submit}>
          Проверить
        </button>
      )}

      {submitted && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            transition={{ duration: 0.5 }}
            className="panel"
            style={{ marginBottom: 16, borderColor: reaction.tone === 'red' ? 'rgba(212,59,54,0.35)' : 'rgba(51,214,230,0.35)' }}
          >
            <SystemLabel tone={reaction.tone}>{reaction.label}</SystemLabel>
            <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.55, marginTop: 12, borderLeft: `2px solid ${reactColor}`, paddingLeft: 12 }}>
              {reaction.text}
            </p>
          </motion.div>

          <button className="btn btn-primary" onClick={() => { select(); navigateScreen(9, 'scan') }}>
            Узнать вердикт
          </button>
        </>
      )}
    </div>
  )
}
