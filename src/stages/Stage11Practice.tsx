import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { CaseBar, SystemLabel, ProgressLevels, OptionChip, ReactionPanel, CinematicStrip } from '../components/ui'
import { PRACTICE as P } from '../data/content'
import practiceCase from '../assets/bg-practice-case.webp'

export const Stage11Practice = () => {
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
    const hasTrap = P.options.some((o) => o.trap && sel.includes(o.key))
    notify(hasTrap ? 'error' : 'success')
  }

  const chipState = (key: string): 'idle' | 'correct' | 'wrong' => {
    if (!submitted || !sel.includes(key)) return 'idle'
    const opt = P.options.find((o) => o.key === key)
    if (opt?.trap) return 'wrong'
    if (P.correctKeys.includes(key)) return 'correct'
    return 'idle'
  }

  const trapKey = (t: 'test' | 'wait') => P.options.find((o) => o.trap === t)?.key
  const hasTest = sel.includes(trapKey('test') ?? '')
  const hasWait = sel.includes(trapKey('wait') ?? '')
  const clean = !hasTest && !hasWait

  return (
    <div className="screen screen--practice">
      <CaseBar id="CASE #003" status="NEW CASE LOADED" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={4} /></div>
      <CinematicStrip src={practiceCase} label="NEW CASE / КУПЕЛИ · МОСКВА И МО" tone="amber" position="50% 53%" />

      <SystemLabel tone="cyan">{P.caseLabel}</SystemLabel>
      <h1 style={{ fontSize: 'clamp(21px, 6vw, 28px)', margin: '8px 0 14px' }}>Спаси проект до запуска</h1>

      {/* client brief */}
      <div className="evidence" style={{ marginBottom: 14 }}>
        <SystemLabel tone="amber">ВВОДНЫЕ КЛИЕНТА</SystemLabel>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.01em', margin: '10px 0 12px', color: 'var(--text)', lineHeight: 1.15 }}>
          {P.projectTitle}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {P.clientSays.map((line, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.45, paddingLeft: 11, borderLeft: '2px solid var(--border)' }}>«{line}»</p>
          ))}
        </div>
      </div>

      {/* faux site preview */}
      <div style={{ marginBottom: 6 }}><SystemLabel tone="faint">SITE PREVIEW</SystemLabel></div>
      <div style={{ background: '#0f1722', border: '1px solid rgba(231,236,243,0.16)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 20, boxShadow: '0 6px 22px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(231,236,243,0.1)' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ marginLeft: 10, flex: 1, fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'rgba(231,236,243,0.45)', background: 'rgba(0,0,0,0.25)', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            kupeli-pod-kluch.ru
          </span>
        </div>
        <div style={{ padding: '26px 18px 22px', background: 'linear-gradient(160deg, #16202e 0%, #101824 100%)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, lineHeight: 1.15, textTransform: 'uppercase', color: '#eef3f9', margin: 0 }}>
            {P.firstScreen.headline}
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(231,236,243,0.65)', margin: '12px 0 18px' }}>{P.firstScreen.body}</p>
          <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: 'rgba(231,236,243,0.55)', fontSize: 13, fontWeight: 600, padding: '11px 22px', borderRadius: 8, border: '1px solid rgba(231,236,243,0.18)' }}>
            {P.firstScreen.cta}
          </span>
        </div>
      </div>

      <h2 style={{ fontSize: 'clamp(18px, 5vw, 23px)', marginBottom: 6 }}>{P.question}</h2>
      <div style={{ marginBottom: 14 }}><SystemLabel tone="amber">{P.sub}</SystemLabel></div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {P.options.map((o) => (
          <OptionChip key={o.key} text={o.text} selected={sel.includes(o.key)} state={chipState(o.key)} onToggle={() => toggle(o.key)} />
        ))}
      </div>

      {!submitted && (
        <button className="btn btn-primary" disabled={!sel.length} onClick={submit}>Поставить диагноз</button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ duration: 0.5 }}>
          {hasWait && <ReactionPanel label={P.reactions.wait.label} tone="red">{P.reactions.wait.text}</ReactionPanel>}
          {hasTest && <ReactionPanel label={P.reactions.test.label} tone="red" delay={hasWait ? 0.1 : 0}>{P.reactions.test.text}</ReactionPanel>}
          {clean && <ReactionPanel label={P.reactions.good.label} tone="cyan">{P.reactions.good.text}</ReactionPanel>}
          <button className="btn btn-primary" onClick={() => { select(); navigateScreen(17, 'scan') }}>{P.cta}</button>
        </motion.div>
      )}
    </div>
  )
}
