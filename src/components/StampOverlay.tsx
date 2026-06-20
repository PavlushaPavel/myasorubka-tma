import { motion } from 'framer-motion'

interface Props {
  text: string
  color?: string
  rotate?: number
  delay?: number
}

export const StampOverlay = ({ text, color = 'var(--accent-red)', rotate = -5, delay = 0 }: Props) => (
  <motion.div
    className="stamp-fx"
    initial={{ scale: 0, rotate: rotate - 6, opacity: 0 }}
    animate={{ scale: [0, 1.25, 0.97, 1], rotate: [rotate - 6, rotate + 2, rotate], opacity: 1 }}
    transition={{ duration: 0.5, delay, times: [0, 0.55, 0.8, 1], ease: [0.16, 1, 0.3, 1] }}
    style={{
      fontFamily: 'var(--font-stamp)',
      fontWeight: 700,
      fontSize: 'clamp(34px, 11vw, 52px)',
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
      lineHeight: 0.92,
      color,
      border: `3px solid ${color}`,
      padding: '8px 16px',
      display: 'inline-block',
      userSelect: 'none',
    }}
  >
    {text}
  </motion.div>
)
