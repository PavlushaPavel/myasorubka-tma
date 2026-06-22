import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, SystemLabel, ManifestList } from '../components/ui'
import { PROOF, PROOFS } from '../data/content'

export const Stage14Proof = () => {
  const { impact, select } = useTelegramHaptics()

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="PROOF" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={5} /></div>

      <Reveal>
        <SystemLabel tone="cyan">{PROOF.label}</SystemLabel>
        <h1 style={{ fontSize: 'clamp(23px, 6.8vw, 32px)', margin: '10px 0 14px' }}>{PROOF.title}</h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{PROOF.lead}</p>
        <div className="panel" style={{ marginBottom: 10, borderColor: 'rgba(255,42,42,0.35)', background: 'rgba(255,42,42,0.05)' }}>
          {PROOF.badTasks.map((b, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-muted)', marginTop: i ? 4 : 0 }}>
              <span style={{ color: 'var(--red-soft)' }}>{'> '}</span>{b}
            </p>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', color: 'var(--red-soft)', marginBottom: 20 }}>
          {PROOF.badTail}
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.6, marginBottom: 10, fontWeight: 500 }}>{PROOF.goodLead}</p>
        <div style={{ marginBottom: 22 }}>
          <ManifestList items={PROOF.can} tone="cyan" />
        </div>
      </Reveal>

      <Reveal delay={0.26}>
        <div style={{ marginBottom: 10 }}><SystemLabel tone="cyan">{PROOF.proofLead.toUpperCase()}</SystemLabel></div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
        {PROOFS.map((p, i) => (
          <Reveal key={p.id} delay={0.3 + i * 0.08}>
            <div className="panel" style={{ borderColor: p.link ? 'rgba(0,217,255,0.3)' : 'var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>✓</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.01em' }}>{p.title}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5 }}>{p.body}</p>
              {p.link && (
                <button className="btn btn-ghost" style={{ marginTop: 12 }} onClick={() => { impact('light'); window.open(p.link, '_blank') }}>
                  {p.cta}
                </button>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.5}>
        <div className="panel" style={{ marginBottom: 18, borderColor: 'rgba(0,217,255,0.5)', background: 'rgba(0,217,255,0.05)', boxShadow: 'var(--glow-cyan)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, lineHeight: 1.35, color: 'var(--text)' }}>{PROOF.punch}</p>
        </div>
      </Reveal>

      <button className="btn btn-primary" onClick={() => { select(); navigateScreen(19, 'scan') }}>{PROOF.cta}</button>
    </div>
  )
}
