import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { CaseBar, ProgressLevels, SystemLabel, OptionChip } from '../components/ui'
import { useAppStore } from '../store/useAppStore'
import { BLIND, BLIND_FLAGS, BLIND_REACTIONS } from '../data/content'

const MAX_SEL = 5

export const Stage07BlindLaunch = () => {
  const { impact, select, notify } = useTelegramHaptics()
  const setBlindSelected = useAppStore((s) => s.setBlindSelected)
  const [sel, setSel] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const toggle = (key: string) => {
    if (submitted) return
    const isSelected = sel.includes(key)
    if (!isSelected && sel.length >= MAX_SEL) return
    const next = isSelected ? sel.filter((k) => k !== key) : [...sel, key]
    setSel(next)
    setBlindSelected(next)
    select()
  }

  const submit = () => {
    if (sel.length === 0) return
    setBlindSelected(sel)
    setSubmitted(true)
    impact('heavy')

    const selectedFlags = BLIND_FLAGS.filter((f) => sel.includes(f.key))
    const hasTool = selectedFlags.some((f) => f.trap === 'tool')
    const hasGuess = selectedFlags.some((f) => f.trap === 'guess')
    notify(hasTool || hasGuess ? 'error' : 'success')
  }

  const chipState = (key: string): 'idle' | 'correct' | 'wrong' => {
    if (!submitted || !sel.includes(key)) return 'idle'
    const flag = BLIND_FLAGS.find((f) => f.key === key)
    if (!flag) return 'idle'
    if (flag.trap) return 'wrong'
    if (flag.correct) return 'correct'
    return 'idle'
  }

  const selectedFlags = BLIND_FLAGS.filter((f) => sel.includes(f.key))
  const hasTool = selectedFlags.some((f) => f.trap === 'tool')
  const hasGuess = selectedFlags.some((f) => f.trap === 'guess')

  const reaction = hasTool
    ? { text: BLIND_REACTIONS.tool, tone: 'red' as const, label: 'ПРИВЫЧНЫЙ РЕФЛЕКС' }
    : hasGuess
      ? { text: BLIND_REACTIONS.guess, tone: 'red' as const, label: 'ГАДАЕШЬ' }
      : { text: BLIND_REACTIONS.good, tone: 'cyan' as const, label: 'ЛУПА ВКЛЮЧИЛАСЬ' }

  const reactColor = reaction.tone === 'red' ? 'var(--red)' : 'var(--cyan)'

  return (
    <div className="screen">
      <CaseBar id="CASE #002" status="NEW CASE LOADED" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      <SystemLabel tone="cyan">{BLIND.caseLabel}</SystemLabel>
      <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', margin: '8px 0 8px' }}>{BLIND.title}</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>{BLIND.intro}</p>

      {/* Project card */}
      <div className="evidence" style={{ marginBottom: 14 }}>
        <SystemLabel tone="amber">ВВОДНЫЕ КЛИЕНТА</SystemLabel>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.01em', margin: '10px 0 12px', color: 'var(--text)' }}>
          {BLIND.projectTitle}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {BLIND.clientSays.map((line, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.5, paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>
              «{line}»
            </p>
          ))}
        </div>
      </div>

      {/* Faux website first-screen preview */}
      <div style={{ marginBottom: 6 }}><SystemLabel tone="faint">SITE PREVIEW</SystemLabel></div>
      <div style={{ background: '#0f1722', border: '1px solid rgba(231,236,243,0.16)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 20, boxShadow: '0 6px 22px rgba(0,0,0,0.4)' }}>
        {/* fake browser bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(231,236,243,0.1)' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ marginLeft: 10, flex: 1, fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'rgba(231,236,243,0.45)', background: 'rgba(0,0,0,0.25)', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            site-clienta.ru
          </span>
        </div>
        {/* site hero */}
        <div style={{ padding: '26px 18px 22px', background: 'linear-gradient(160deg, #16202e 0%, #101824 100%)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, lineHeight: 1.15, textTransform: 'uppercase', color: '#eef3f9', margin: 0 }}>
            {BLIND.firstScreen.headline}
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(231,236,243,0.65)', margin: '12px 0 18px' }}>
            {BLIND.firstScreen.body}
          </p>
          <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: 'rgba(231,236,243,0.55)', fontSize: 13, fontWeight: 600, padding: '11px 22px', borderRadius: 8, border: '1px solid rgba(231,236,243,0.18)' }}>
            {BLIND.firstScreen.cta}
          </span>
        </div>
      </div>

      {/* Task */}
      <h2 style={{ fontSize: 'clamp(19px, 5.5vw, 24px)', marginBottom: 6 }}>{BLIND.taskTitle}</h2>
      <div style={{ marginBottom: 14 }}><SystemLabel tone="amber">{BLIND.taskSub}</SystemLabel></div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {BLIND_FLAGS.map((f) => (
          <OptionChip
            key={f.key}
            text={f.text}
            selected={sel.includes(f.key)}
            state={chipState(f.key)}
            onToggle={() => toggle(f.key)}
          />
        ))}
      </div>

      {!submitted && (
        <button className="btn btn-primary" disabled={sel.length === 0} onClick={submit}>
          {BLIND.cta}
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

          <button className="btn btn-primary" onClick={() => { select(); navigateScreen(8, 'scan') }}>
            Проверить после запуска
          </button>
        </>
      )}
    </div>
  )
}
