import { motion } from 'framer-motion'
import type { ChainNode } from '../types'

interface Props {
  nodes: ChainNode[]
  /** index from which the chain is considered "broken" (red). -1 = all neutral */
  breakFrom?: number
}

/**
 * Vertical forensic chain: оффер → … → продажа.
 * Nodes stagger in; connectors draw a travelling data pulse; broken segment glows red.
 */
export const NodeGraph = ({ nodes, breakFrom = -1 }: Props) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {nodes.map((node, i) => {
      const broken = breakFrom >= 0 && i >= breakFrom
      const accent = broken ? 'var(--red)' : 'var(--cyan)'
      return (
        <div key={node.id}>
          <motion.div
            initial={{ opacity: 0, x: -10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ delay: i * 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <span
                style={{
                  display: 'block',
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: accent,
                  boxShadow: `0 0 10px ${accent}`,
                }}
              />
              {broken && (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1px solid ${accent}` }}
                />
              )}
            </div>
            <div
              className="panel"
              style={{ flex: 1, padding: '10px 14px', borderColor: broken ? 'rgba(255,42,42,0.35)' : 'var(--border)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  {node.label}
                </span>
                <span className="sys" style={{ fontSize: 10, color: broken ? 'var(--red-soft)' : 'var(--text-faint)' }}>
                  {broken ? 'RISK' : 'OK?'}
                </span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>{node.hint}</div>
            </div>
          </motion.div>

          {i < nodes.length - 1 && (
            <div style={{ position: 'relative', height: 18, marginLeft: 6, width: 1 }}>
              <div style={{ position: 'absolute', inset: 0, width: 1, background: 'rgba(231,236,243,0.15)' }} />
              <motion.div
                animate={{ top: ['-20%', '120%'] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                style={{ position: 'absolute', left: -1, width: 3, height: 6, borderRadius: 2, background: accent, boxShadow: `0 0 8px ${accent}` }}
              />
            </div>
          )}
        </div>
      )
    })}
  </div>
)
