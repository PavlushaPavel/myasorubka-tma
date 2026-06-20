import type { Profession } from '../types'

interface Props {
  profession: Profession
  selected: boolean
  onSelect: (id: string) => void
}

export const ProfessionCard = ({ profession, selected, onSelect }: Props) => (
  <button
    onClick={() => onSelect(profession.id)}
    style={{
      width: '100%',
      background: selected ? 'rgba(255,183,3,0.08)' : 'var(--bg-card)',
      border: `1px solid ${selected ? 'var(--accent-gold)' : 'var(--border-card)'}`,
      borderLeft: `3px solid ${selected ? 'var(--accent-gold)' : 'transparent'}`,
      borderRadius: 'var(--radius)',
      padding: '14px 16px',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}
  >
    <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{profession.label}</div>
    <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{profession.blameCard}</div>
  </button>
)
