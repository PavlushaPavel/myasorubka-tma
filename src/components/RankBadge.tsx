interface Props { label: string }

export const RankBadge = ({ label }: Props) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <svg width="32" height="36" viewBox="0 0 32 36">
      <polygon points="16,2 30,9 30,27 16,34 2,27 2,9" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" />
      <polygon points="16,2 30,9 30,27 16,34 2,27 2,9" fill="rgba(255,183,3,0.08)" />
    </svg>
    <span style={{ color: 'var(--accent-gold)', fontSize: 12, fontFamily: 'var(--font-data)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {label}
    </span>
  </div>
)
