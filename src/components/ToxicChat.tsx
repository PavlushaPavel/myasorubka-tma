import { motion } from 'framer-motion'
import type { ToxicMessage } from '../types'

interface Props { messages: ToxicMessage[]; active: boolean }

const container = { hidden: {}, show: { transition: { staggerChildren: 0.4 } } }
const item = { hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }

export const ToxicChat = ({ messages, active }: Props) => (
  <motion.div variants={container} initial="hidden" animate={active ? 'show' : 'hidden'} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {messages.map((msg, i) => (
      <motion.div key={i} variants={item}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '8px 12px', maxWidth: '85%' }}>
          <span style={{ color: 'var(--accent-blue)', fontSize: 11, fontWeight: 600 }}>{msg.sender}</span>
          <p style={{ color: 'var(--text-primary)', fontSize: 14, marginTop: 2 }}>{msg.text}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
)
