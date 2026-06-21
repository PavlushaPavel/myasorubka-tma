import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

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
      textShadow: '0 0 22px rgba(212,59,54,0.6)',
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
          boxShadow: n <= current ? '0 0 8px rgba(51,214,230,0.6)' : 'none',
          transition: 'background 0.4s, box-shadow 0.4s',
        }}
      />
    ))}
  </div>
)

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
      ? 'rgba(51,214,230,0.1)'
      : state === 'wrong'
        ? 'rgba(212,59,54,0.1)'
        : selected
          ? 'rgba(211,161,74,0.1)'
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
