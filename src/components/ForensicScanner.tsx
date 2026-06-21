import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  scanning: boolean
  label?: string
  children: ReactNode
}

/** Framed forensic viewport: corner brackets + a sweeping scan line while `scanning`. */
export const ForensicScanner = ({ scanning, label = 'SCANNING…', children }: Props) => (
  <div
    style={{
      position: 'relative',
      borderRadius: 'var(--radius)',
      border: '1px solid rgba(51,214,230,0.25)',
      background: 'rgba(16,39,45,0.25)',
      padding: 16,
      overflow: 'hidden',
    }}
  >
    {/* corner brackets */}
    {[
      { top: 6, left: 6, bt: 1, bl: 1 },
      { top: 6, right: 6, bt: 1, br: 1 },
      { bottom: 6, left: 6, bb: 1, bl: 1 },
      { bottom: 6, right: 6, bb: 1, br: 1 },
    ].map((c, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          width: 14,
          height: 14,
          top: c.top,
          left: c.left,
          right: c.right,
          bottom: c.bottom,
          borderTop: c.bt ? '2px solid var(--cyan)' : undefined,
          borderBottom: c.bb ? '2px solid var(--cyan)' : undefined,
          borderLeft: c.bl ? '2px solid var(--cyan)' : undefined,
          borderRight: c.br ? '2px solid var(--cyan)' : undefined,
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />
    ))}

    {children}

    <AnimatePresence>
      {scanning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 64,
              background: 'linear-gradient(180deg, transparent, rgba(51,214,230,0.18) 80%, rgba(51,214,230,0.9))',
              animation: 'scanSweep 1.6s linear infinite',
            }}
          />
          <span
            className="sys sys-cyan"
            style={{ position: 'absolute', top: 8, right: 10, fontSize: 10 }}
          >
            {label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)
