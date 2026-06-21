import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, SystemLabel } from '../components/ui'
import { PROOF } from '../data/content'

export const Stage12ProofAI = () => {
  const { select } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="PROOF" tone="cyan" />
      <div style={{ marginBottom: 16 }}>
        <ProgressLevels current={4} />
      </div>

      <Reveal>
        <SystemLabel tone="cyan">{PROOF.label}</SystemLabel>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 34px)', margin: '10px 0 16px' }}>{PROOF.title}</h1>
      </Reveal>

      {/* split: left "Я не кодер" / right terminal */}
      <Reveal delay={0.1}>
        <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
          <div className="panel" style={{ borderColor: 'rgba(51,214,230,0.2)' }}>
            <SystemLabel tone="faint">OPERATOR</SystemLabel>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.55, marginTop: 8 }}>
              Я не кодер. Не пишу на уровне программиста.
            </p>
          </div>

          {/* terminal */}
          <div
            style={{
              borderRadius: 'var(--radius)',
              border: '1px solid rgba(51,214,230,0.35)',
              background: 'rgba(7,12,16,0.85)',
              boxShadow: 'var(--glow-cyan)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 12px',
                borderBottom: '1px solid rgba(51,214,230,0.18)',
                background: 'rgba(51,214,230,0.06)',
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--red)' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--amber)' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--cyan)' }} />
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  letterSpacing: '0.08em',
                  color: 'var(--text-faint)',
                }}
              >
                AI BUILD
              </span>
            </div>
            <div style={{ padding: '14px 14px', fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.7 }}>
              <div style={{ color: 'var(--ice)' }}>
                <span style={{ color: 'var(--cyan)' }}>{'> '}</span>
                собери расширение для чистки площадок РСЯ
              </div>
              <div style={{ color: 'var(--cyan)', marginTop: 6 }}>✓ tool.js — готово</div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        {PROOF.body.map((p, i) => (
          <p key={i} style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>
            {p}
          </p>
        ))}
      </Reveal>

      <Reveal delay={0.3}>
        <div
          className="panel"
          style={{
            marginTop: 6,
            borderColor: 'rgba(51,214,230,0.5)',
            boxShadow: 'var(--glow-cyan)',
            background: 'rgba(51,214,230,0.05)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1.3,
              color: 'var(--text)',
            }}
          >
            {PROOF.punch}
          </p>
        </div>
      </Reveal>

      <button
        className="btn btn-primary"
        style={{ marginTop: 18, width: '100%' }}
        onClick={() => {
          select()
          navigateScreen(13, 'scan')
        }}
      >
        {PROOF.cta}
      </button>
    </div>
  )
}
