import { useState, useEffect } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getProfession } from '../data/professions'
import { ToxicChat } from '../components/ToxicChat'
import { StampOverlay } from '../components/StampOverlay'
import { MetricCounter } from '../components/MetricCounter'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'

type Phase = 'chat' | 'typing' | 'blame' | 'darken' | 'stamp1' | 'stamp2' | 'metrics' | 'cta'

const METRICS = [
  { label: 'Уверенность', from: 42, to: 24, suffix: '%' },
  { label: 'Следующий чек', from: 30000, to: 18000, suffix: ' ₽' },
  { label: 'Желание взять "хоть что-то"', from: 58, to: 86, suffix: '%' },
  { label: 'MMR спеца', from: 0, to: -340, prefix: '' },
]

const DARK = 'radial-gradient(120% 90% at 50% 38%, oklch(0.10 0.05 22 / 0.55), oklch(0.02 0.01 285 / 0.97))'

export const Screen4Launch = () => {
  const professionId = useAppStore(s => s.profession)
  const finishDefeat = useAppStore(s => s.finishDefeat)
  const { impact } = useTelegramHaptics()
  const profession = professionId ? getProfession(professionId) : null

  const [phase, setPhase] = useState<Phase>('chat')
  const shake = useAnimationControls()

  useEffect(() => {
    const schedule: [Phase, number][] = [
      ['typing', 2500],
      ['blame', 3500],
      ['darken', 4000],
      ['stamp1', 4500],
      ['stamp2', 5500],
      ['metrics', 6000],
      ['cta', 7500],
    ]
    const timers = schedule.map(([p, t]) => setTimeout(() => setPhase(p), t))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase === 'stamp1') {
      impact('heavy')
      shake.start({ x: [0, -11, 9, -7, 4, -2, 0], y: [0, 5, -4, 2, 0] }, { duration: 0.45, ease: 'easeOut' })
    }
    if (phase === 'stamp2') {
      setTimeout(() => impact('heavy'), 100)
      shake.start({ x: [0, 9, -8, 6, -3, 0], y: [0, -4, 3, 0] }, { duration: 0.4, ease: 'easeOut' })
    }
    if (phase === 'cta') finishDefeat()
  }, [phase])

  if (!profession) return null

  const showStamps = ['stamp1', 'stamp2', 'metrics', 'cta'].includes(phase)
  const showDark = ['darken', 'stamp1', 'stamp2', 'metrics', 'cta'].includes(phase)

  return (
    <motion.div className="screen" animate={shake} style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence>
        {showDark && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            style={{ position: 'absolute', inset: 0, background: DARK, zIndex: 1, pointerEvents: 'none' }}
          >
            <div className="scanlines" />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 0 }}>
        <p style={{ color: 'var(--text-faint)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Трафик пошёл…
        </p>
        <ToxicChat messages={profession.toxicChat} active={['chat', 'typing', 'blame', 'darken'].includes(phase)} />

        <AnimatePresence>
          {['typing', 'blame', 'darken'].includes(phase) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 12 }}>
              {phase === 'typing' ? (
                <div style={{ color: 'var(--text-faint)', fontSize: 13 }}>
                  Клиент печатает<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>…</motion.span>
                </div>
              ) : (
                <div className="card" style={{ borderColor: 'var(--accent-red)' }}>
                  <span style={{ color: 'var(--accent-red-bright)', fontSize: 11, fontWeight: 600 }}>Клиент</span>
                  <p style={{ color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, marginTop: 4 }}>
                    {profession.clientBlame}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showStamps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: ['metrics', 'cta'].includes(phase) ? 'flex-start' : 'center', padding: ['metrics', 'cta'].includes(phase) ? '32px 24px 24px' : 24, overflowY: 'auto' }}
          >
            <div style={{ textAlign: 'center', marginBottom: ['metrics', 'cta'].includes(phase) ? 18 : 24 }}>
              <StampOverlay text={`${profession.blameSubject} виноват`} rotate={-4} />
              {['stamp2', 'metrics', 'cta'].includes(phase) && (
                <div style={{ marginTop: 14 }}>
                  <StampOverlay text="Ты крайний" color="var(--accent-gold)" rotate={3} delay={0.05} />
                </div>
              )}
            </div>

            {['metrics', 'cta'].includes(phase) && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="card"
                style={{ width: '100%', marginBottom: 16, boxShadow: 'var(--shadow-lg)' }}
              >
                {METRICS.map((m, i) => (
                  <MetricCounter key={i} metric={m} active delay={i * 160} />
                ))}
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ marginTop: 10, padding: '7px 12px', background: 'oklch(0.62 0.205 22 / 0.16)', borderRadius: 8, textAlign: 'center', boxShadow: 'inset 0 0 0 1px oklch(0.62 0.205 22 / 0.3)' }}
                >
                  <span style={{ color: 'var(--accent-red-bright)', fontFamily: 'var(--font-data)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Promotion failed — До нормальных клиентов снова не дошёл
                  </span>
                </motion.div>
              </motion.div>
            )}

            {phase === 'cta' && (
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ width: '100%' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', marginBottom: 16, lineHeight: 1.6 }}>
                  Ты не просто получил плохой результат.<br />
                  Ты получил удар по цене, уверенности и следующему проекту.
                </p>
                <button className="btn-primary" onClick={() => navigateScreen(4)}>
                  Снять клеймо
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
