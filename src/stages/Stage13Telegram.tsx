import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, SystemLabel } from '../components/ui'
import { TELEGRAM } from '../data/content'

export const Stage13Telegram = () => {
  const { impact, select } = useTelegramHaptics()

  return (
    <div className="screen screen--practice">
      <CaseBar id="CASE #001" status="REMOTE HUB" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={4} /></div>

      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)' }}
          />
          <SystemLabel tone="cyan">REMOTE HUB CONNECTED</SystemLabel>
        </div>

        <h1 style={{ fontSize: 'clamp(24px, 7vw, 34px)', marginBottom: 14 }}>{TELEGRAM.title}</h1>

        <div className="panel" style={{ borderColor: 'rgba(0,217,255,0.28)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{TELEGRAM.body}</p>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => { impact('medium'); window.open(TELEGRAM.link, '_blank') }}>
          {TELEGRAM.cta}
        </button>
        <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => { select(); navigateScreen(19, 'scan') }}>
          {TELEGRAM.nextCta}
        </button>
      </Reveal>
    </div>
  )
}
