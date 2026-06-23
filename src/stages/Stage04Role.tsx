import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels } from '../components/ui'
import { ROLE_SELECT } from '../data/content'
import { ROLES } from '../data/roles'
import type { RoleId } from '../types'
import { useAppStore } from '../store/useAppStore'
import roleDirector from '../assets/role-director.webp'
import roleAvito from '../assets/role-avito.webp'
import roleVk from '../assets/role-vk.webp'
import roleCreative from '../assets/role-creative.webp'
import roleLanding from '../assets/role-landing.webp'

const ROLE_ART: Record<RoleId, string> = {
  director: roleDirector,
  avito: roleAvito,
  vk: roleVk,
  creative: roleCreative,
  landing: roleLanding,
}

export const Stage04Role = () => {
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
        <h1 style={{ fontSize: 'clamp(23px, 6.6vw, 30px)', marginTop: 16, marginBottom: 8 }}>{ROLE_SELECT.title}</h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{ROLE_SELECT.sub}</p>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROLES.map((r, i) => {
          const isSelected = selected === r.id
          const dimmed = selected !== null && !isSelected
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
                  background: isSelected ? 'rgba(255,177,59,0.1)' : undefined,
                  boxShadow: isSelected ? 'var(--glow-amber)' : undefined,
                  transition: 'opacity 0.25s, border-color 0.25s, background 0.25s, box-shadow 0.25s',
                }}
              >
                <img className="role-thumb" src={ROLE_ART[r.id]} alt="" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: 'var(--text)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 19,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {r.stampWord}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.45, marginTop: 5 }}>{r.hire}</div>
                  <div className="sys" style={{ fontSize: 10, marginTop: 9, color: isSelected ? 'var(--red-soft)' : 'var(--text-faint)' }}>
                    КРАЙНИЙ: {isSelected ? 'ВЫ' : 'НЕ НАЗНАЧЕН'}
                  </div>
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

      <AnimatePresence mode="wait">
        {selected && (() => {
          const role = ROLES.find((item) => item.id === selected)!
          return (
            <motion.section
              key={selected}
              className="role-dossier"
              initial={{ opacity: 0, y: 22, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="role-dossier-visual">
                <img src={ROLE_ART[selected]} alt={`${role.label} под давлением клиента`} />
                <div className="role-dossier-scan" />
                <span className="tag tag-red">КРАЙНИЙ: ВЫ</span>
              </div>
              <div className="role-dossier-copy">
                <span className="sys sys-amber">PERSONNEL FILE / {selected.toUpperCase()}</span>
                <h2>{role.label}</h2>
                <p>{role.hire}</p>
                <div className="role-dossier-risk"><span>РИСК</span><b>ПРЕТЕНЗИЯ ЗА РЕЗУЛЬТАТ</b></div>
              </div>
              <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(5, 'scan') }}>
                {ROLE_SELECT.cta}
              </button>
            </motion.section>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
