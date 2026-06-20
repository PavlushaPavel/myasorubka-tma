import { motion } from 'framer-motion'

interface Props {
  text: string
  color?: string
  rotate?: number
  delay?: number
}

export const StampOverlay = ({ text, color = 'var(--accent-red)', rotate = -5, delay = 0 }: Props) => (
  <motion.div
    initial={{ scale: 0, rotate: rotate - 5, opacity: 0 }}
    animate={{ scale: [0, 1.2, 1], rotate: [rotate - 5, rotate + 1, rotate], opacity: 1 }}
    transition={{ duration: 0.5, delay, times: [0, 0.6, 1] }}
    style={{
      fontFamily: 'var(--font-stamp)',
      fontWeight: 700,
      fontSize: 'clamp(38px, 13vw, 64px)',
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
      lineHeight: 0.92,
      color,
      textShadow: `0 0 28px ${color}, 0 2px 0 oklch(0.05 0.02 285 / 0.6)`,
      border: `3px solid ${color}`,
      padding: '8px 16px',
      display: 'inline-block',
      userSelect: 'none',
    }}
  >
    {text}
  </motion.div>
)
