import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Premium blur-in reveal: content resolves from a soft blur + offset.
 * Softer and more expensive-feeling than a plain opacity fade.
 */
export const Reveal = ({ children, delay = 0, y = 14, className, style }: Props) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
)
