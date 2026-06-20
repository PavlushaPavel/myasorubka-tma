import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

export const Screen4Launch = () => {
  const professionId = useAppStore(s => s.profession)
  const finishDefeat = useAppStore(s => s.finishDefeat)
  const goToScreen = useAppStore(s => s.goToScreen)
  const { impact } = useTelegramHaptics()
  const profession = professionId ? getProfession(professionId) : null

  const [phase, setPhase] = useState<Phase>('chat')

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
    if (phase === 'stamp1') impact('heavy')
    if (phase === 'stamp2') { setTimeout(() => impact('heavy'), 100) }
    if (phase === 'cta') finishDefeat()
  }, [phase])

  if (!profession) return null

  return (
    <div className="screen" style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence>
        {['darken','stamp1','stamp2','metrics','cta'].includes(phase) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 1, pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 0 }}>
        <p style={{ color: 'var(--text-faint)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Трафик пошёл…
        </p>
        <ToxicChat messages={profession.toxicChat} active={['chat','typing','blame','darken'].includes(phase)} />

        <AnimatePresence>
          {['typing','blame','darken'].includes(phase) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 12 }}>
              {phase === 'typing' ? (
                <div style={{ color: 'var(--text-faint)', fontSize: 13 }}>
                  Клиент печатает<motion.span
                    animate={{ opacity: [0,1,0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >…</motion.span>
                </div>
              ) : (
                <div className="card" style={{ border: '1px solid var(--accent-red)' }}>
                  <span style={{ color: 'var(--accent-red)', fontSize: 11, fontWeight: 600 }}>Клиент</span>
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
        {['stamp1','stamp2','metrics','cta'].includes(phase) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, overflowY: 'auto' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <StampOverlay text="Инструмент виноват" rotate={-4} />
              {['stamp2','metrics','cta'].includes(phase) && (
                <div style={{ marginTop: 12 }}>
                  <StampOverlay text="Ты крайний" color="var(--accent-gold)" rotate={3} delay={0.1} />
                </div>
              )}
            </div>

            {['metrics','cta'].includes(phase) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%', background: 'rgba(15,15,26,0.9)', borderRadius: 12, padding: 16, marginBottom: 16 }}
              >
                {METRICS.map((m, i) => (
                  <MetricCounter key={i} metric={m} active={['metrics','cta'].includes(phase)} />
                ))}
                <div style={{ marginTop: 8, padding: '6px 12px', background: 'rgba(230,57,70,0.15)', borderRadius: 8, textAlign: 'center' }}>
                  <span style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-data)', fontSize: 12, textTransform: 'uppercase' }}>
                    Promotion failed — До нормальных клиентов снова не дошёл
                  </span>
                </div>
              </motion.div>
            )}

            {phase === 'cta' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', marginBottom: 16, lineHeight: 1.6 }}>
                  Ты не просто получил плохой результат.<br />
                  Ты получил удар по цене, уверенности и следующему проекту.
                </p>
                <button className="btn-primary" onClick={() => goToScreen(4)}>
                  Снять клеймо
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
