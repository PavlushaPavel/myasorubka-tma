import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, SystemLabel, CinematicStrip } from '../components/ui'
import { OFFER } from '../data/content'
import finalSystem from '../assets/bg-final-system.webp'

export const Stage16Offer = () => {
  const { impact, select } = useTelegramHaptics()

  return (
    <div className="screen screen--final">
      <CaseBar id="CASE #001" status="FINAL ARTEFACT" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={5} /></div>

      <CinematicStrip src={finalSystem} label="SYSTEM ARCHITECT / CONTROL RESTORED" tone="money" position="50% 68%" />

      <Reveal>
        <div className="panel" style={{ borderColor: 'rgba(0,217,255,0.4)', background: 'linear-gradient(160deg, rgba(0,217,255,0.07), rgba(255,177,59,0.05))', boxShadow: 'var(--shadow-lg)' }}>
          <SystemLabel tone="cyan">{OFFER.label}</SystemLabel>
          <h1 style={{ fontSize: 'clamp(24px, 7vw, 34px)', margin: '10px 0 8px' }}>{OFFER.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{OFFER.sub}</p>

          <p style={{ color: 'var(--ice)', fontSize: 13, lineHeight: 1.55, marginTop: 12, paddingLeft: 12, borderLeft: '2px solid var(--cyan)' }}>{OFFER.audience}</p>

          <div style={{ marginTop: 16 }}>
            <SystemLabel tone="faint">ЧТО ВНУТРИ</SystemLabel>
            <div style={{ marginTop: 10 }}>
              {OFFER.inside.map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
                  <span style={{ color: 'var(--cyan)', fontWeight: 700, lineHeight: 1.5 }}>✓</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5 }}>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="panel" style={{ marginTop: 14, borderColor: 'rgba(255,177,59,0.4)', background: 'rgba(255,177,59,0.05)' }}>
          <p style={{ color: 'var(--amber)', fontSize: 13.5, lineHeight: 1.55, fontWeight: 500 }}>{OFFER.bridge}</p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ textAlign: 'center', margin: '22px 0 6px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, color: 'var(--cyan)', textShadow: '0 0 24px rgba(0,217,255,0.55)' }}>{OFFER.price}</span>
        </div>
      </Reveal>

      <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => { impact('medium'); window.Telegram?.WebApp?.showAlert?.('Оплата будет доступна после запуска. Следи за обновлениями!') }}>
        {OFFER.cta}
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => { select(); navigateScreen(22, 'scan') }}>
        Открыть кнопку «Бабло»
      </button>
    </div>
  )
}
