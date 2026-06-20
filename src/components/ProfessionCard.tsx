import { motion } from 'framer-motion'
import type { Profession } from '../types'

interface Props {
  profession: Profession
  selected: boolean
  onSelect: (id: string) => void
}

export const ProfessionCard = ({ profession, selected, onSelect }: Props) => (
  <motion.button
    onClick={() => onSelect(profession.id)}
    whileTap={{ scale: 0.985 }}
    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
    style={{
      position: 'relative',
      width: '100%',
      background: selected
        ? 'linear-gradient(180deg, oklch(0.84 0.165 82 / 0.12), oklch(0.84 0.165 82 / 0.05))'
        : 'linear-gradient(180deg, var(--bg-card), var(--bg-raise))',
      border: `1px solid ${selected ? 'var(--accent-gold)' : 'var(--border-card)'}`,
      borderRadius: 'var(--radius)',
      padding: '15px 18px',
      textAlign: 'left',
      cursor: 'pointer',
      boxShadow: selected ? 'var(--glow-gold)' : 'var(--shadow-sm)',
      transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-data)', fontWeight: 600, fontSize: 16, letterSpacing: '0.01em', marginBottom: 4 }}>
          {profession.label}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.45 }}>{profession.blameCard}</div>
      </div>
      <motion.span
        initial={false}
        animate={{ opacity: selected ? 1 : 0.25, scale: selected ? 1 : 0.6 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flexShrink: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'var(--accent-gold)',
          boxShadow: selected ? '0 0 12px var(--accent-gold)' : 'none',
        }}
      />
    </div>
  </motion.button>
)
