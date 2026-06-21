import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels, OptionChip } from '../components/ui'
import { QUICK_TEST } from '../data/content'
import { useAppStore } from '../store/useAppStore'

export const Stage03QuickTest = () => {
  const { impact, select, notify } = useTelegramHaptics()
  const setQuickTest = useAppStore((s) => s.setQuickTest)
  const [picked, setPicked] = useState<string | null>(null)

  const pick = (key: string) => {
    if (picked) return
    setPicked(key)
    setQuickTest(key)
    if (key === QUICK_TEST.correctKey) notify('success')
    else select()
  }

  const isCorrect = picked === QUICK_TEST.correctKey

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="QUICK SCAN" tone="amber" />

      <Reveal delay={0.05}>
        <ProgressLevels current={1} />
      </Reveal>

      <Reveal delay={0.12}>
        <div style={{ marginTop: 16 }}>
          <SystemLabel tone="red">RAPID INTERROGATION</SystemLabel>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <h1 style={{ fontSize: 'clamp(22px, 6.5vw, 30px)', marginTop: 8, marginBottom: 20 }}>
          {QUICK_TEST.question}
        </h1>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {QUICK_TEST.options.map((opt, i) => {
          let state: 'idle' | 'correct' | 'wrong' = 'idle'
          if (picked === opt.key) state = opt.key === QUICK_TEST.correctKey ? 'correct' : 'wrong'
          return (
            <Reveal key={opt.key} delay={0.28 + i * 0.06}>
              <OptionChip
                text={opt.text}
                selected={opt.key === picked}
                state={state}
                onToggle={() => pick(opt.key)}
              />
            </Reveal>
          )
        })}
      </div>

      {picked && (
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="panel"
          style={{
            marginTop: 18,
            borderColor: isCorrect ? 'var(--cyan)' : 'var(--red)',
            background: isCorrect ? 'rgba(51,214,230,0.06)' : 'rgba(212,59,54,0.06)',
          }}
        >
          <SystemLabel tone={isCorrect ? 'cyan' : 'red'}>
            {isCorrect ? 'LEAD: SCENT DETECTED' : 'ПРИВЫЧНЫЙ РЕФЛЕКС'}
          </SystemLabel>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>
            {isCorrect ? QUICK_TEST.goodReaction : QUICK_TEST.trapReaction}
          </p>
        </motion.div>
      )}

      {picked && (
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 'auto', paddingTop: 18 }}
        >
          <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(4, 'scan') }}>
            Показать цепочку
          </button>
        </motion.div>
      )}
    </div>
  )
}
