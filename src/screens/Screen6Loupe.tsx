import { useState } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getProfession } from '../data/professions'
import { LoupeReveal } from '../components/LoupeReveal'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'

export const Screen6Loupe = () => {
  const professionId = useAppStore(s => s.profession)
  const { impact } = useTelegramHaptics()
  const profession = professionId ? getProfession(professionId) : null
  const [loupeComplete, setLoupeComplete] = useState(false)

  if (!profession) return null

  return (
    <div className="screen">
      <h1 style={{ fontSize: 'clamp(18px, 5vw, 24px)', lineHeight: 1.3, marginBottom: 8 }}>
        Смотри, что было под клеймом
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
        Лупа снимает клеймо. Под ней — реальные точки слива.
      </p>

      <LoupeReveal
        stampText="Ты крайний"
        slivPoints={profession.slivPoints}
        onComplete={() => { setLoupeComplete(true); impact('medium') }}
      />

      <div className="card" style={{ marginTop: 20, background: 'linear-gradient(180deg, oklch(0.58 0.205 266 / 0.12), var(--bg-raise))', borderColor: 'oklch(0.58 0.205 266 / 0.35)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Лупа показывает, где сливается.</strong><br />
          AI-штаб помогает собрать, что с этим делать.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 8, lineHeight: 1.6 }}>
          Лупа без AI — увидел проблему и опять всё руками.<br />
          AI без Лупы — быстрее генеришь херню.
        </p>
      </div>

      {loupeComplete && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 20 }}>
          <button className="btn-primary" onClick={() => { impact('medium'); navigateScreen(6) }}>
            Показать, где деньги
          </button>
        </motion.div>
      )}
    </div>
  )
}
