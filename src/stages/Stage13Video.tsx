import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, SystemLabel } from '../components/ui'
import { VIDEO } from '../data/content'

export const Stage13Video = () => {
  const { impact, select } = useTelegramHaptics()
  const [tab, setTab] = useState<'before' | 'after'>('before')

  const playVideo = () => {
    impact('medium')
    window.Telegram?.WebApp?.showAlert?.('Видео скоро будет доступно')
  }

  const corner = (pos: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: 'var(--cyan)',
    borderStyle: 'solid',
    ...pos,
  })

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="FINAL BRIEFING" tone="cyan" />
      <div style={{ marginBottom: 16 }}>
        <ProgressLevels current={5} />
      </div>

      <Reveal>
        <SystemLabel tone="cyan">FINAL ARTEFACT</SystemLabel>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 34px)', margin: '10px 0 8px' }}>{VIDEO.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>{VIDEO.subtitle}</p>
      </Reveal>

      {/* video poster */}
      <Reveal delay={0.1}>
        <button
          onClick={playVideo}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(51,214,230,0.4)',
            background: 'radial-gradient(circle at 50% 45%, rgba(51,214,230,0.12), rgba(7,18,22,0.92))',
            boxShadow: 'var(--glow-cyan)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <span style={{ ...corner({ top: 8, left: 8, borderRightWidth: 0, borderBottomWidth: 0, borderWidth: 2 }) }} />
          <span style={{ ...corner({ top: 8, right: 8, borderLeftWidth: 0, borderBottomWidth: 0, borderWidth: 2 }) }} />
          <span style={{ ...corner({ bottom: 8, left: 8, borderRightWidth: 0, borderTopWidth: 0, borderWidth: 2 }) }} />
          <span style={{ ...corner({ bottom: 8, right: 8, borderLeftWidth: 0, borderTopWidth: 0, borderWidth: 2 }) }} />
          <motion.span
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: '2px solid var(--cyan)',
              background: 'rgba(51,214,230,0.14)',
              boxShadow: 'var(--glow-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: 'var(--cyan)',
              paddingLeft: 4,
            }}
          >
            ▶
          </motion.span>
          <span
            style={{
              position: 'absolute',
              bottom: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              color: 'var(--ice)',
            }}
          >
            VIDEO
          </span>
        </button>
      </Reveal>

      <button className="btn btn-primary" style={{ marginTop: 12, width: '100%' }} onClick={playVideo}>
        {VIDEO.playCta}
      </button>

      {/* intro bullets */}
      <Reveal delay={0.15}>
        <div style={{ marginTop: 18 }}>
          {VIDEO.intro.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ color: 'var(--cyan)', fontWeight: 700, lineHeight: 1.5 }}>✓</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.5 }}>{line}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* bad vs good prompt */}
      <Reveal delay={0.2}>
        <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
          <div
            className="panel"
            style={{ borderColor: 'rgba(212,59,54,0.4)', background: 'rgba(212,59,54,0.05)' }}
          >
            <SystemLabel tone="red">ВОДЯНАЯ ЗАДАЧА</SystemLabel>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                marginTop: 10,
              }}
            >
              {VIDEO.badPrompt}
            </p>
          </div>
          <div
            className="panel"
            style={{ borderColor: 'rgba(51,214,230,0.4)', background: 'rgba(51,214,230,0.05)' }}
          >
            <SystemLabel tone="cyan">НОРМАЛЬНАЯ ЗАДАЧА</SystemLabel>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                lineHeight: 1.6,
                color: 'var(--ice)',
                marginTop: 10,
              }}
            >
              {VIDEO.goodPrompt}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1.3,
            color: 'var(--text)',
            margin: '16px 0',
            textAlign: 'center',
          }}
        >
          {VIDEO.punch}
        </p>
      </Reveal>

      {/* before / after toggle */}
      <Reveal delay={0.3}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {(['before', 'after'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                select()
                setTab(t)
              }}
              className={`btn ${tab === t ? 'btn-primary' : 'btn-ghost'}`}
              style={{ flex: 1 }}
            >
              {t === 'before' ? 'Было' : 'Стало'}
            </button>
          ))}
        </div>

        <div className="panel">
          {tab === 'before' ? (
            <>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>
                {VIDEO.beforeAfter.before.headline}
              </p>
              <span className="tag tag-red">{VIDEO.beforeAfter.before.cta}</span>
            </>
          ) : (
            <>
              <p style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4, marginBottom: 8, color: 'var(--text)' }}>
                {VIDEO.beforeAfter.after.headline}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.55, marginBottom: 12 }}>
                {VIDEO.beforeAfter.after.body}
              </p>
              <span className="tag tag-cyan">{VIDEO.beforeAfter.after.cta}</span>
            </>
          )}
        </div>
      </Reveal>

      {/* honest limit */}
      <Reveal delay={0.35}>
        <div className="panel" style={{ marginTop: 14 }}>
          <SystemLabel tone="faint">ЧЕСТНОЕ ОГРАНИЧЕНИЕ</SystemLabel>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.55, marginTop: 8 }}>{VIDEO.limit}</p>
        </div>
      </Reveal>

      <button
        className="btn btn-primary"
        style={{ marginTop: 18, width: '100%' }}
        onClick={() => {
          select()
          navigateScreen(14, 'scan')
        }}
      >
        {VIDEO.cta}
      </button>
    </div>
  )
}
