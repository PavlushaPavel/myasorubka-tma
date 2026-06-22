import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

/* Chat bubble — client (incoming, left) or you (outgoing, right). */
export const ChatBubble = ({
  children,
  side = 'client',
  harsh = false,
  delay = 0,
}: {
  children: ReactNode
  side?: 'client' | 'you'
  harsh?: boolean
  delay?: number
}) => {
  const isClient = side === 'client'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        alignSelf: isClient ? 'flex-start' : 'flex-end',
        maxWidth: '88%',
        background: isClient
          ? (harsh ? 'linear-gradient(90deg, rgba(255,42,42,0.18), rgba(15,19,26,0.9))' : 'rgba(15,19,26,0.9)')
          : 'rgba(0,217,255,0.1)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: isClient ? `3px solid ${harsh ? 'var(--red)' : 'var(--red-dark)'}` : '1px solid rgba(0,217,255,0.3)',
        borderRight: isClient ? '1px solid rgba(255,255,255,0.08)' : '3px solid var(--cyan)',
        borderRadius: 'var(--radius-sm)',
        padding: '11px 14px',
        color: isClient ? 'var(--text)' : 'var(--ice)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        lineHeight: 1.5,
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {children}
    </motion.div>
  )
}

/* Chat header: avatar dot + name + online status. */
export const ChatHeader = ({ name }: { name: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
    <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(150deg, var(--steel), var(--graphite))', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text-muted)' }}>
      {name.charAt(0)}
    </span>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--text)' }}>{name}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f', boxShadow: '0 0 6px #27c93f' }} />
        <span className="sys" style={{ fontSize: 10 }}>в сети</span>
      </span>
    </div>
  </div>
)

/* Forensic manifest: tidy 2-column itemised list — replaces dense chip walls
   for long enumerations (что получаешь / должны были дать / AI может). */
export const ManifestList = ({
  items,
  tone = 'cyan',
  columns = 2,
}: {
  items: string[]
  tone?: 'cyan' | 'amber' | 'red'
  columns?: 1 | 2
}) => {
  const color = tone === 'red' ? 'var(--red-soft)' : tone === 'amber' ? 'var(--amber)' : 'var(--cyan)'
  return (
    <div style={{ display: 'grid', gridTemplateColumns: columns === 2 ? '1fr 1fr' : '1fr', columnGap: 16 }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'flex-start',
            padding: '8px 0',
            borderTop: '1px solid var(--border)',
          }}
        >
          <span style={{ color, fontSize: 10, lineHeight: 1.6, flexShrink: 0 }}>▸</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 12.5, lineHeight: 1.4 }}>{it}</span>
        </div>
      ))}
    </div>
  )
}

/* Sealed evidence container: corner brackets + one-shot scan sweep on mount.
   Used for artifact "UNLOCKED" reveals. */
export const UnlockFrame = ({ children, accent = 'cyan' }: { children: ReactNode; accent?: 'cyan' | 'amber' }) => {
  const c = accent === 'amber' ? 'var(--amber)' : 'var(--cyan)'
  const brackets = [
    { top: 4, left: 4, bt: 1, bl: 1 },
    { top: 4, right: 4, bt: 1, br: 1 },
    { bottom: 4, left: 4, bb: 1, bl: 1 },
    { bottom: 4, right: 4, bb: 1, br: 1 },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius)' }}
    >
      {children}
      {brackets.map((b, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            borderTop: b.bt ? `2px solid ${c}` : undefined,
            borderBottom: b.bb ? `2px solid ${c}` : undefined,
            borderLeft: b.bl ? `2px solid ${c}` : undefined,
            borderRight: b.br ? `2px solid ${c}` : undefined,
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        />
      ))}
      {/* one-shot reveal sweep */}
      <motion.div
        initial={{ y: '-110%' }}
        animate={{ y: '210%' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 70,
          pointerEvents: 'none',
          background: `linear-gradient(180deg, transparent, ${accent === 'amber' ? 'rgba(255,177,59,0.18)' : 'rgba(0,217,255,0.18)'} 80%, ${c})`,
          opacity: 0.5,
        }}
      />
    </motion.div>
  )
}

/* Mono system label: CASE #001 · STATUS: OPEN */
export const SystemLabel = ({
  children,
  tone = 'faint',
}: {
  children: ReactNode
  tone?: 'faint' | 'cyan' | 'red' | 'amber'
}) => <span className={`sys ${tone === 'faint' ? '' : `sys-${tone}`}`}>{children}</span>

/* Case file top bar */
export const CaseBar = ({ id, status, tone = 'amber' }: { id: string; status: string; tone?: 'amber' | 'cyan' | 'red' }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
    <SystemLabel tone={tone}>{id}</SystemLabel>
    <SystemLabel tone="faint">{status}</SystemLabel>
  </div>
)

/* Red forensic stamp */
export const Stamp = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <motion.div
    className="stamp-fx"
    initial={{ scale: 0.4, rotate: -8, opacity: 0 }}
    animate={{ scale: [0.4, 1.12, 1], rotate: [-8, -3, -5], opacity: 1 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(34px, 12vw, 56px)',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      color: 'var(--red)',
      border: '3px solid var(--red)',
      padding: '6px 18px',
      display: 'inline-block',
      transform: 'rotate(-5deg)',
      boxShadow: 'var(--glow-red)',
      textShadow: '0 0 22px rgba(255,42,42,0.6)',
    }}
  >
    {text}
  </motion.div>
)

/* Risk tag chip */
export const RiskTag = ({ children }: { children: ReactNode }) => (
  <span className="tag tag-red">
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 6px var(--red)' }} />
    {children}
  </span>
)

/* 5-level progress rail */
export const ProgressLevels = ({ current }: { current: number }) => (
  <div style={{ display: 'flex', gap: 5 }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <div
        key={n}
        style={{
          flex: 1,
          height: 3,
          borderRadius: 2,
          background: n <= current ? 'var(--cyan)' : 'rgba(231,236,243,0.12)',
          boxShadow: n <= current ? '0 0 8px rgba(0,217,255,0.6)' : 'none',
          transition: 'background 0.4s, box-shadow 0.4s',
        }}
      />
    ))}
  </div>
)

/* Blur-in reaction panel: system label + bordered body (used after every test). */
export const ReactionPanel = ({
  label,
  children,
  tone = 'cyan',
  delay = 0,
}: {
  label: string
  children: ReactNode
  tone?: 'cyan' | 'red' | 'amber'
  delay?: number
}) => {
  const color = tone === 'red' ? 'var(--red)' : tone === 'amber' ? 'var(--amber)' : 'var(--cyan)'
  const borderColor =
    tone === 'red' ? 'rgba(255,42,42,0.35)' : tone === 'amber' ? 'rgba(255,177,59,0.35)' : 'rgba(0,217,255,0.35)'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
      transition={{ duration: 0.5, delay }}
      className="panel"
      style={{ marginBottom: 16, borderColor }}
    >
      <SystemLabel tone={tone}>{label}</SystemLabel>
      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.55, marginTop: 12, borderLeft: `2px solid ${color}`, paddingLeft: 12 }}>
        {children}
      </p>
    </motion.div>
  )
}

/* Selectable multiple-choice chip used across tests */
export const OptionChip = ({
  text,
  selected,
  state = 'idle',
  onToggle,
}: {
  text: string
  selected: boolean
  state?: 'idle' | 'correct' | 'wrong'
  onToggle: () => void
}) => {
  const border =
    state === 'correct' ? 'var(--cyan)' : state === 'wrong' ? 'var(--red)' : selected ? 'var(--amber)' : 'var(--border)'
  const bg =
    state === 'correct'
      ? 'rgba(0,217,255,0.1)'
      : state === 'wrong'
        ? 'rgba(255,42,42,0.1)'
        : selected
          ? 'rgba(255,177,59,0.1)'
          : 'var(--surface)'
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.985 }}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        textAlign: 'left',
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 'var(--radius-sm)',
        padding: '12px 14px',
        cursor: 'pointer',
        color: 'var(--text)',
        fontSize: 14,
        lineHeight: 1.35,
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 16,
          height: 16,
          borderRadius: 4,
          border: `1.5px solid ${selected || state !== 'idle' ? border : 'var(--text-faint)'}`,
          background: selected || state !== 'idle' ? border : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          color: '#07090d',
          fontWeight: 700,
        }}
      >
        {(selected || state === 'correct') && '✓'}
        {state === 'wrong' && '✕'}
      </span>
      <span>{text}</span>
    </motion.button>
  )
}
