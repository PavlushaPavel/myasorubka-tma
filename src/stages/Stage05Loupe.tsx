import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels } from '../components/ui'
import { LOUPE, LOUPE_PHRASES } from '../data/content'

/* scattered positions (% of board) — one per LOUPE_PHRASES entry */
const POS = [
  { x: 27, y: 16 },
  { x: 72, y: 22 },
  { x: 30, y: 45 },
  { x: 73, y: 50 },
  { x: 25, y: 75 },
  { x: 71, y: 80 },
]
const R = 90 // lens radius (px)

export const Stage05Loupe = () => {
  const { impact, select } = useTelegramHaptics()
  const boardRef = useRef<HTMLDivElement>(null)
  const [lens, setLens] = useState({ x: -999, y: -999 })
  const [active, setActive] = useState(false)
  const [scanned, setScanned] = useState<string[]>([])

  // haptic tick whenever a new phrase is uncovered
  useEffect(() => {
    if (scanned.length) impact('light')
  }, [scanned.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const move = (clientX: number, clientY: number) => {
    const el = boardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = clientX - r.left
    const y = clientY - r.top
    setLens({ x, y })
    setActive(true)
    setScanned((prev) => {
      const add: string[] = []
      LOUPE_PHRASES.forEach((p, i) => {
        if (prev.includes(p.id)) return
        const px = (POS[i].x / 100) * r.width
        const py = (POS[i].y / 100) * r.height
        if (Math.hypot(px - x, py - y) < R * 0.85) add.push(p.id)
      })
      return add.length ? [...prev, ...add] : prev
    })
  }

  const onPointerMove = (e: React.PointerEvent) => move(e.clientX, e.clientY)
  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    move(e.clientX, e.clientY)
  }

  const count = scanned.length
  const total = LOUPE_PHRASES.length
  const canContinue = count >= 3
  const clip = active ? `circle(${R}px at ${lens.x}px ${lens.y}px)` : 'circle(0px at 50% 50%)'

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="LOUPE ACTIVE" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={2} /></div>

      <Reveal delay={0.05}>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', marginBottom: 8 }}>{LOUPE.title}</h1>
      </Reveal>
      <Reveal delay={0.12}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.55, marginBottom: 12 }}>{LOUPE.sub}</p>
      </Reveal>

      <Reveal delay={0.16}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <SystemLabel tone="cyan">SURFACE — ЧТО ГОВОРИТ КЛИЕНТ</SystemLabel>
          <SystemLabel tone={count === total ? 'cyan' : 'amber'}>{count}/{total} ВСКРЫТО</SystemLabel>
        </div>
      </Reveal>

      {/* ── interactive forensic board ── */}
      <div
        ref={boardRef}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        style={{
          position: 'relative',
          height: 'clamp(380px, 56vh, 540px)',
          flexShrink: 0,
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          border: '1px solid rgba(51,214,230,0.25)',
          background:
            'linear-gradient(rgba(125,182,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,182,255,0.05) 1px, transparent 1px), radial-gradient(120% 90% at 50% 0%, rgba(16,39,45,0.5), rgba(10,13,18,0.95))',
          backgroundSize: '28px 28px, 28px 28px, 100% 100%',
          touchAction: 'none',
          cursor: 'none',
          marginBottom: 14,
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* SURFACE: calm client phrases */}
        {LOUPE_PHRASES.map((p, i) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${POS[i].x}%`,
              top: `${POS[i].y}%`,
              transform: 'translate(-50%, -50%)',
              width: 134,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: '0.01em',
                color: scanned.includes(p.id) ? 'var(--text-faint)' : 'var(--amber)',
                background: 'rgba(211,161,74,0.07)',
                border: '1px solid rgba(211,161,74,0.22)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 10px',
                lineHeight: 1.2,
              }}
            >
              «{p.phrase}»
            </div>
            {/* persistent red flag once swept — builds up the "problem layer" */}
            <AnimatePresence>
              {scanned.includes(p.id) && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}
                >
                  <span
                    className="tag tag-red"
                    style={{ fontSize: 9, padding: '2px 6px' }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 6px var(--red)' }} />
                    RED FLAG
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* REALITY X-RAY: revealed only inside the lens circle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            clipPath: clip,
            WebkitClipPath: clip,
            background: 'radial-gradient(circle at center, rgba(46,10,12,0.97), rgba(22,8,10,0.94))',
            transition: active ? 'none' : 'clip-path 0.3s',
          }}
        >
          {LOUPE_PHRASES.map((p, i) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${POS[i].x}%`,
                top: `${POS[i].y}%`,
                transform: 'translate(-50%, -50%)',
                width: 150,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.04em',
                  color: 'var(--red-soft)',
                  textTransform: 'uppercase',
                  marginBottom: 5,
                }}
              >
                ⚑ {p.phrase}
              </div>
              {p.hidden.map((h, j) => (
                <div
                  key={j}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10.5,
                    lineHeight: 1.4,
                    color: '#F2C9C6',
                    paddingLeft: 8,
                    borderLeft: '2px solid rgba(212,59,54,0.5)',
                    marginBottom: 3,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* LENS ring + crosshair */}
        {active && (
          <div
            style={{
              position: 'absolute',
              left: lens.x,
              top: lens.y,
              width: R * 2,
              height: R * 2,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '2px solid var(--cyan)',
              boxShadow: '0 0 26px rgba(51,214,230,0.55), inset 0 0 30px rgba(51,214,230,0.22)',
              pointerEvents: 'none',
            }}
          >
            <span style={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.12em', color: 'var(--cyan)' }}>REALITY</span>
            <span style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 1, background: 'rgba(51,214,230,0.6)', transform: 'translate(-50%,-50%)' }} />
            <span style={{ position: 'absolute', left: '50%', top: '50%', width: 1, height: 14, background: 'rgba(51,214,230,0.6)', transform: 'translate(-50%,-50%)' }} />
            {/* grip handle */}
            <span style={{ position: 'absolute', right: -14, bottom: -14, width: 22, height: 4, borderRadius: 2, background: 'var(--cyan)', transform: 'rotate(45deg)', boxShadow: '0 0 10px var(--cyan)' }} />
          </div>
        )}

        {/* idle hint */}
        {!active && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, pointerEvents: 'none' }}>
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 70, height: 70, borderRadius: '50%', border: '2px solid var(--cyan)', boxShadow: '0 0 22px rgba(51,214,230,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}
            >
              🔍
            </motion.div>
            <span className="sys sys-cyan" style={{ fontSize: 11 }}>Веди лупой по экрану</span>
          </div>
        )}
      </div>

      {/* readable record of what was uncovered */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {LOUPE_PHRASES.filter((p) => scanned.includes(p.id)).map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                transition={{ duration: 0.4 }}
                className="panel"
                style={{ padding: '11px 13px', borderColor: 'rgba(51,214,230,0.25)' }}
              >
                <span className="sys sys-red" style={{ fontSize: 10.5 }}>⚑ «{p.phrase}»</span>
                <p style={{ color: 'var(--ice)', fontSize: 12.5, lineHeight: 1.45, marginTop: 6 }}>{p.verdict}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canContinue && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.55, marginBottom: 14, paddingLeft: 11, borderLeft: '2px solid var(--cyan)' }}>
              {LOUPE.doneNote}
            </p>
            <button className="btn btn-primary" onClick={() => { select(); navigateScreen(6, 'scan') }}>
              {LOUPE.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!canContinue && (
        <p className="sys sys-amber" style={{ textAlign: 'center', fontSize: 11 }}>
          Вскрой лупой минимум 3 фразы, чтобы продолжить
        </p>
      )}
    </div>
  )
}
