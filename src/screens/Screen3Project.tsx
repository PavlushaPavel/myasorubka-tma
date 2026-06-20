import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getProfession } from '../data/professions'
import { MatchCard } from '../components/MatchCard'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'

const FAKE_MATCHES = [
  'Бюджет нормальный',
  'Бриф нормальный',
  'Клиент понимает маркетинг',
  'Оффер чёткий',
]

type Phase = 'matching' | 'found' | 'card'

export const Screen3Project = () => {
  const professionId = useAppStore(s => s.profession)
  const startMatch = useAppStore(s => s.startMatch)
  const goToScreen = useAppStore(s => s.goToScreen)
  const { impact } = useTelegramHaptics()
  const profession = professionId ? getProfession(professionId) : null

  const [phase, setPhase] = useState<Phase>('matching')
  const [fakeIndex, setFakeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFakeIndex(i => {
        if (i >= FAKE_MATCHES.length - 1) {
          clearInterval(interval)
          setTimeout(() => setPhase('found'), 300)
          setTimeout(() => setPhase('card'), 1200)
          return i
        }
        return i + 1
      })
    }, 400)
    return () => clearInterval(interval)
  }, [])

  if (!profession) return null

  return (
    <div className="screen">
      <h1 style={{ fontSize: 'clamp(18px, 5vw, 24px)', lineHeight: 1.3, marginBottom: 4 }}>
        Проект выглядит нормальным.
      </h1>
      <p style={{ color: 'var(--accent-red)', fontSize: 14, marginBottom: 20 }}>
        Поэтому он опасен.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ color: 'var(--text-faint)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          {profession.projectTitle}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 4, fontStyle: 'italic' }}>
          Клиент говорит:
        </p>
        {profession.clientSays.map((line, i) => (
          <p key={i} style={{ color: 'var(--text-primary)', fontSize: 13, lineHeight: 1.6 }}>
            «{line}»
          </p>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {phase === 'matching' && (
            <motion.div
              key={fakeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center' }}
            >
              Ищем: {FAKE_MATCHES[fakeIndex]}…
            </motion.div>
          )}
          {phase === 'found' && (
            <motion.div
              key="found"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-data)', fontSize: 22, fontWeight: 700, textTransform: 'uppercase' }}>
                Матч найден
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
                Проект «ну возьму, деньги нужны»
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === 'card' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MatchCard profession={profession} />
            <button
              className="btn-primary"
              style={{ marginTop: 20 }}
              onClick={() => { impact('medium'); startMatch(); goToScreen(3) }}
            >
              Запустить как обычно
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
