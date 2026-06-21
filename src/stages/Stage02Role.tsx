import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels } from '../components/ui'
import { ROLE_SELECT } from '../data/content'
import { ROLES } from '../data/roles'
import type { RoleId } from '../types'
import { useAppStore } from '../store/useAppStore'

export const Stage02Role = () => {
  const { impact, select } = useTelegramHaptics()
  const setRole = useAppStore((s) => s.setRole)
  const [selected, setSelected] = useState<RoleId | null>(null)

  const pick = (id: RoleId) => {
    select()
    setSelected(id)
    setRole(id)
  }

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="SELECT OPERATOR" tone="amber" />

      <Reveal delay={0.05}>
        <ProgressLevels current={1} />
      </Reveal>

      <Reveal delay={0.12}>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', marginTop: 16, marginBottom: 8 }}>{ROLE_SELECT.title}</h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{ROLE_SELECT.sub}</p>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROLES.map((r, i) => {
          const isSelected = selected === r.id
          const dimmed = selected !== null && !isSelected
          const code = `OP-0${i + 1}`
          return (
            <Reveal key={r.id} delay={0.26 + i * 0.07}>
              <motion.button
                onClick={() => pick(r.id)}
                whileTap={{ scale: 0.985 }}
                className="panel"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  opacity: dimmed ? 0.5 : 1,
                  borderColor: isSelected ? 'var(--amber)' : 'var(--border)',
                  background: isSelected ? 'rgba(211,161,74,0.1)' : undefined,
                  boxShadow: isSelected ? 'var(--glow-amber)' : undefined,
                  transition: 'opacity 0.25s, border-color 0.25s, background 0.25s, box-shadow 0.25s',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <SystemLabel tone="amber">{code}</SystemLabel>
                  <div
                    style={{
                      color: 'var(--text)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 18,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      marginTop: 4,
                    }}
                  >
                    {r.label}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.45, marginTop: 4 }}>{r.hire}</div>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: isSelected ? 'var(--amber)' : 'transparent',
                    border: isSelected ? 'none' : '1.5px solid var(--text-faint)',
                    boxShadow: isSelected ? '0 0 8px var(--amber)' : 'none',
                    transition: 'all 0.25s',
                  }}
                />
              </motion.button>
            </Reveal>
          )
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 'auto', paddingTop: 18 }}
        >
          <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(3, 'scan') }}>
            {ROLE_SELECT.cta}
          </button>
        </motion.div>
      )}
    </div>
  )
}
