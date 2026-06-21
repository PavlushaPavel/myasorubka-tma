import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels } from '../components/ui'
import { LOUPE, LOUPE_PHRASES } from '../data/content'
import type { LoupePhrase } from '../types'

const PhraseCard = ({ p, revealed, onReveal }: { p: LoupePhrase; revealed: boolean; onReveal: () => void }) => (
  <motion.div layout className="panel" style={{ padding: 0, overflow: 'hidden', borderColor: revealed ? 'rgba(51,214,230,0.3)' : 'rgba(211,161,74,0.3)' }}>
    <motion.button
      layout
      onClick={onReveal}
      whileTap={{ scale: 0.99 }}
      disabled={revealed}
      style={{
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '15px 16px',
        background: revealed ? 'transparent' : 'rgba(211,161,74,0.06)',
        border: 'none',
        cursor: revealed ? 'default' : 'pointer',
        color: 'var(--text)',
      }}
    >
      <span style={{ fontSize: 18, opacity: revealed ? 0.4 : 1, flexShrink: 0 }}>🔍</span>
      <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.01em', color: revealed ? 'var(--text-muted)' : 'var(--amber)' }}>
        «{p.phrase}»
      </span>
      {!revealed && <span className="sys sys-amber" style={{ fontSize: 10, flexShrink: 0 }}>НАВЕСТИ</span>}
    </motion.button>

    <AnimatePresence>
      {revealed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)' }}>
            <div style={{ paddingTop: 12, marginBottom: 12 }}>
              <SystemLabel tone="red">ПОД ЛУПОЙ</SystemLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                {p.hidden.map((h, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07 }}
                    style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.45, paddingLeft: 11, borderLeft: '2px solid rgba(212,59,54,0.4)' }}
                  >
                    {h}
                  </motion.p>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(51,214,230,0.06)', border: '1px solid rgba(51,214,230,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
              <p style={{ color: 'var(--ice)', fontSize: 13, lineHeight: 1.5, fontWeight: 500 }}>{p.verdict}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export const Stage05Loupe = () => {
  const { impact, select } = useTelegramHaptics()
  const [revealed, setRevealed] = useState<string[]>([])

  const reveal = (id: string) => {
    if (revealed.includes(id)) return
    setRevealed((r) => [...r, id])
    impact('medium')
  }

  const count = revealed.length
  const total = LOUPE_PHRASES.length
  const canContinue = count >= 2

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="LOUPE ACTIVE" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={2} /></div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', marginBottom: 8 }}>{LOUPE.title}</h1>
      </Reveal>
      <Reveal delay={0.12}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 14 }}>{LOUPE.sub}</p>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <SystemLabel tone="cyan">CLIENT PHRASES</SystemLabel>
          <SystemLabel tone={count === total ? 'cyan' : 'faint'}>{count}/{total} ВСКРЫТО</SystemLabel>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
        {LOUPE_PHRASES.map((p, i) => (
          <Reveal key={p.id} delay={0.24 + i * 0.05}>
            <PhraseCard p={p} revealed={revealed.includes(p.id)} onReveal={() => reveal(p.id)} />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {canContinue && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.55, marginBottom: 14, paddingLeft: 11, borderLeft: '2px solid var(--cyan)' }}>
              {LOUPE.doneNote}
            </p>
            <button className="btn btn-primary" onClick={() => { select(); navigateScreen(6, 'scan') }}>
              {LOUPE.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!canContinue && (
        <p className="sys sys-amber" style={{ textAlign: 'center', fontSize: 11 }}>
          Вскрой минимум 2 фразы, чтобы продолжить
        </p>
      )}
    </div>
  )
}
