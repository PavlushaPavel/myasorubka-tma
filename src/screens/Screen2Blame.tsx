import { useState } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { motion, AnimatePresence } from 'framer-motion'
import { PROFESSIONS } from '../data/professions'
import { ProfessionCard } from '../components/ProfessionCard'
import { useAppStore } from '../store/useAppStore'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import type { ProfessionId } from '../types'

export const Screen2Blame = () => {
  const [selected, setSelected] = useState<ProfessionId | null>(null)
  const setProfession = useAppStore(s => s.setProfession)
  const { select, impact } = useTelegramHaptics()

  const handleSelect = (id: string) => {
    setSelected(id as ProfessionId)
    setProfession(id as ProfessionId)
    select()
  }

  const handleContinue = () => {
    impact('medium')
    navigateScreen(2)
  }

  return (
    <div className="screen">
      <h1 style={{ fontSize: 'clamp(20px, 6vw, 28px)', lineHeight: 1.3, marginBottom: 8 }}>
        За что тебя обычно пинают?
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
        Выбери свою специализацию
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {PROFESSIONS.map(p => (
          <motion.div
            key={p.id}
            animate={{ opacity: selected && selected !== p.id ? 0.4 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <ProfessionCard
              profession={p}
              selected={selected === p.id}
              onSelect={handleSelect}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: 14, fontStyle: 'italic' }}>
              Окей. Сейчас мясорубка покажет, как тебя делают крайним.
            </p>
            <button className="btn-primary" onClick={handleContinue}>
              Зайти в проект
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
