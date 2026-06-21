import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { SystemLabel } from '../components/ui'
import { PREFRAME } from '../data/content'

export const Stage00Splash = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <SystemLabel tone="cyan">{PREFRAME.kicker}</SystemLabel>
        <SystemLabel tone="red">● REC</SystemLabel>
      </div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(26px, 8vw, 38px)', lineHeight: 1.05, marginBottom: 18 }}>
          {PREFRAME.title.split('\n').map((l, i) => (
            <span key={i} style={{ display: 'block', color: i === 1 ? 'var(--red-soft)' : 'var(--text)' }}>{l}</span>
          ))}
        </h1>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="panel" style={{ marginBottom: 16 }}>
          {PREFRAME.body.map((p, i) => (
            <p key={i} style={{ color: i === 0 ? 'var(--text)' : 'var(--text-muted)', fontSize: 14, lineHeight: 1.65, marginTop: i ? 10 : 0 }}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="evidence" style={{ marginBottom: 20 }}>
          <SystemLabel tone="amber">ЧТО ВНУТРИ ДЕЛА</SystemLabel>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {PREFRAME.promise.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
              >
                <span className="sys sys-amber" style={{ fontSize: 11, marginTop: 2 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ color: 'var(--text)', fontSize: 13.5, lineHeight: 1.4 }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.5} style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => { impact('medium'); navigateScreen(1, 'scan') }}>
          {PREFRAME.cta}
        </button>
        <p className="sys" style={{ textAlign: 'center', marginTop: 10, fontSize: 10.5 }}>
          Это не развлекуха. Это про твою реальную проблему с клиентами.
        </p>
      </Reveal>
    </div>
  )
}
