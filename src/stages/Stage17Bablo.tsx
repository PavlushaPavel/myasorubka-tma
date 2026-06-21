import { useState } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, SystemLabel } from '../components/ui'
import { useAppStore } from '../store/useAppStore'
import { BABLO } from '../data/content'

const STATS = [
  { label: 'ПЕРЕХОДЫ', value: '0' },
  { label: 'ПРОШЛИ', value: '0' },
  { label: 'КУПИЛИ', value: '0' },
  { label: 'БАБЛО', value: '0 ₽' },
]

export const Stage17Bablo = () => {
  const refCode = useAppStore((s) => s.refCode)
  const { notify, impact } = useTelegramHaptics()
  const [copied, setCopied] = useState(false)

  const refLink = `https://t.me/myasorubka_bot/app?startapp=${refCode}`

  const copy = () => {
    impact('medium')
    navigator.clipboard.writeText(refLink).then(() => { setCopied(true); notify('success') }).catch(() => {})
  }

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="REFERRAL" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={5} /></div>

      <Reveal>
        <SystemLabel tone="amber">{BABLO.label}</SystemLabel>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 34px)', margin: '10px 0 14px' }}>{BABLO.title}</h1>
        <div className="panel">
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{BABLO.body}</p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="panel" style={{ marginTop: 14, borderColor: 'rgba(211,161,74,0.35)', background: 'rgba(11,16,20,0.6)' }}>
          <SystemLabel tone="faint">YOUR REF LINK</SystemLabel>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--amber)', wordBreak: 'break-all', marginTop: 8 }}>{refLink}</p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
          {STATS.map((s) => (
            <div key={s.label} className="panel" style={{ padding: '12px 6px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--text)', lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em', color: 'var(--text-faint)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={copy}>{copied ? 'Скопировано!' : BABLO.cta}</button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => window.Telegram?.WebApp?.showAlert?.('Поделись ссылкой со спецом, которого тоже делали крайним')}>
        {BABLO.share}
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10, color: 'var(--text-faint)' }} onClick={() => navigateScreen(0)}>↺ Пройти заново</button>
    </div>
  )
}
