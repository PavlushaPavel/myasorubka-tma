import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, Stamp, SystemLabel } from '../components/ui'
import { ENTRY } from '../data/content'

export const Stage01Entry = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id={ENTRY.caseId} status={ENTRY.status} />

      <Reveal delay={0.05}>
        <SystemLabel tone="cyan">DIGITAL CRIME / FUTURE FORENSICS</SystemLabel>
      </Reveal>

      {/* Case file with stamp */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotateX: 18 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="evidence"
        style={{ marginTop: 14, marginBottom: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '26px 18px' }}
      >
        <SystemLabel tone="amber">ДЕЛО №001 — ВХОДЯЩИЙ КЕЙС</SystemLabel>
        <Stamp text={ENTRY.stamp} delay={0.5} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Директ', 'Авито', 'VK', 'Креатив', 'Лендос'].map((c) => (
            <span key={c} className="tag tag-amber">{c}</span>
          ))}
        </div>
      </motion.div>

      <Reveal delay={0.2}>
        <h1 style={{ fontSize: 'clamp(26px, 8vw, 36px)', marginBottom: 14 }}>{ENTRY.title}</h1>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="panel" style={{ marginBottom: 16 }}>
          {ENTRY.body.map((p, i) => (
            <p key={i} style={{ color: i === 0 ? 'var(--text)' : 'var(--text-muted)', fontSize: 14, lineHeight: 1.65, marginTop: i ? 10 : 0 }}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <p className="sys sys-cyan" style={{ textAlign: 'center', marginBottom: 16, fontSize: 12 }}>
          {ENTRY.eta}
        </p>
      </Reveal>

      <Reveal delay={0.5} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(2, 'scan') }}>
          {ENTRY.cta}
        </button>
      </Reveal>
    </div>
  )
}
