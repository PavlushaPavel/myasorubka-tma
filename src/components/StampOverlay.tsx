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
      fontFamily: 'Oswald',
      fontWeight: 700,
      fontSize: 'clamp(36px, 12vw, 64px)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color,
      textShadow: `0 0 24px ${color}`,
      border: `3px solid ${color}`,
      padding: '8px 16px',
      display: 'inline-block',
      userSelect: 'none',
    }}
  >
    {text}
  </motion.div>
)
