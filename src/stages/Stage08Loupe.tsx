import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, SystemLabel, ProgressLevels } from '../components/ui'
import { LOUPE, LOUPE_PHRASES } from '../data/content'

/* scattered positions (% of board) — one per LOUPE_PHRASES entry */
const POS = [
  { x: 27, y: 15 },
  { x: 72, y: 21 },
  { x: 30, y: 44 },
  { x: 73, y: 49 },
  { x: 25, y: 74 },
  { x: 71, y: 80 },
]
const R = 88 // lens radius (px)
const MAG = 1.32 // magnification factor under the glass

export const Stage08Loupe = () => {
  const { impact, select } = useTelegramHaptics()
  const boardRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const magRef = useRef<HTMLDivElement>(null)
  const refractRef = useRef<HTMLDivElement>(null)
  const mag2Ref = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)
  const startedRef = useRef(false)
  const scannedRef = useRef<string[]>([])

  const [active, setActive] = useState(false)
  const [scanned, setScanned] = useState<string[]>([])

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current) }, [])

  const apply = () => {
    raf.current = null
    const { x, y } = pos.current
    const clip = `circle(${R}px at ${x}px ${y}px)`
    if (clipRef.current) {
      clipRef.current.style.clipPath = clip
      clipRef.current.style.setProperty('-webkit-clip-path', clip)
      clipRef.current.style.opacity = '1'
    }
    if (magRef.current) magRef.current.style.transformOrigin = `${x}px ${y}px`
    if (refractRef.current) {
      const rim = `radial-gradient(circle ${R}px at ${x}px ${y}px, rgba(0,0,0,0) 64%, #000 82%, #000 100%)`
      refractRef.current.style.clipPath = clip
      refractRef.current.style.setProperty('-webkit-clip-path', clip)
      refractRef.current.style.maskImage = rim
      refractRef.current.style.setProperty('-webkit-mask-image', rim)
      refractRef.current.style.opacity = '1'
    }
    if (mag2Ref.current) mag2Ref.current.style.transformOrigin = `${x}px ${y}px`
    if (lensRef.current) {
      lensRef.current.style.left = `${x}px`
      lensRef.current.style.top = `${y}px`
      lensRef.current.style.opacity = '1'
    }
  }

  const move = (clientX: number, clientY: number) => {
    const el = boardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = clientX - r.left
    const y = clientY - r.top
    pos.current = { x, y }
    if (!startedRef.current) { startedRef.current = true; setActive(true) }
    if (raf.current == null) raf.current = requestAnimationFrame(apply)

    for (let i = 0; i < LOUPE_PHRASES.length; i++) {
      const p = LOUPE_PHRASES[i]
      if (scannedRef.current.includes(p.id)) continue
      const px = (POS[i].x / 100) * r.width
      const py = (POS[i].y / 100) * r.height
      if (Math.hypot(px - x, py - y) < R * 0.78) {
        scannedRef.current = [...scannedRef.current, p.id]
        setScanned(scannedRef.current)
        impact('light')
      }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => move(e.clientX, e.clientY)
  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    move(e.clientX, e.clientY)
  }

  const count = scanned.length
  const total = LOUPE_PHRASES.length
  const canContinue = count >= 3

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <SystemLabel tone="amber">SURFACE — СЛОВА КЛИЕНТА</SystemLabel>
          <SystemLabel tone={count === total ? 'cyan' : 'amber'}>{count}/{total} ВСКРЫТО</SystemLabel>
        </div>
      </Reveal>

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
          border: '1px solid rgba(0,217,255,0.25)',
          background:
            'linear-gradient(rgba(125,182,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,182,255,0.05) 1px, transparent 1px), radial-gradient(120% 90% at 50% 0%, rgba(16,39,45,0.5), rgba(10,13,18,0.95))',
          backgroundSize: '28px 28px, 28px 28px, 100% 100%',
          touchAction: 'none',
          cursor: 'none',
          marginBottom: 10,
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
                background: 'rgba(255,177,59,0.07)',
                border: '1px solid rgba(255,177,59,0.22)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 10px',
                lineHeight: 1.2,
              }}
            >
              «{p.phrase}»
            </div>
            <AnimatePresence>
              {scanned.includes(p.id) && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}
                >
                  <span className="tag tag-red" style={{ fontSize: 9, padding: '2px 6px' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 6px var(--red)' }} />
                    RED FLAG
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* REALITY X-RAY — clipped to glass circle, magnified around lens centre */}
        <div
          ref={clipRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0,
            clipPath: 'circle(0px at 50% 50%)',
            WebkitClipPath: 'circle(0px at 50% 50%)',
            transition: 'opacity 0.18s',
          }}
        >
          <div
            ref={magRef}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `scale(${MAG})`,
              transformOrigin: '50% 50%',
              background: 'radial-gradient(circle at center, rgba(58,10,12,0.97), rgba(24,8,10,0.95))',
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
                  width: 152,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em', color: '#07090d', background: 'var(--red)', padding: '1px 4px', borderRadius: 2, fontWeight: 700 }}>CRITICAL</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--red-soft)', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>«{p.phrase}»</span>
                </div>
                {p.hidden.map((h, j) => (
                  <div key={j} style={{ display: 'flex', gap: 5, alignItems: 'flex-start', marginBottom: 3 }}>
                    <span style={{ color: 'var(--red)', fontSize: 10, lineHeight: 1.4, flexShrink: 0, fontWeight: 700 }}>✕</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, lineHeight: 1.4, color: '#F4CFCC' }}>{h}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 50,
              background: 'linear-gradient(180deg, transparent, rgba(255,42,42,0.22) 80%, rgba(255,42,42,0.8))',
              animation: 'scanSweep 1.8s linear infinite',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* RIM REFRACTION */}
        <div
          ref={refractRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0,
            clipPath: 'circle(0px at 50% 50%)',
            WebkitClipPath: 'circle(0px at 50% 50%)',
            filter: 'blur(0.6px)',
            transition: 'opacity 0.18s',
          }}
        >
          <div
            ref={mag2Ref}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `scale(${MAG * 1.5})`,
              transformOrigin: '50% 50%',
              background: 'radial-gradient(circle at center, rgba(64,12,14,0.9), rgba(24,8,10,0.6))',
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
                  width: 152,
                  opacity: 0.5,
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--red-soft)', textTransform: 'uppercase', marginBottom: 4 }}>⚑ {p.phrase}</div>
                {p.hidden.map((h, j) => (
                  <div key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, lineHeight: 1.4, color: '#F4CFCC' }}>{h}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* GLASS ring */}
        <div
          ref={lensRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: R * 2,
            height: R * 2,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '2px solid var(--cyan)',
            boxShadow: '0 0 30px rgba(0,217,255,0.55), inset 0 0 34px rgba(0,217,255,0.18)',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.18s',
          }}
        >
          <span style={{ position: 'absolute', inset: -1, borderRadius: '50%', border: '2px solid rgba(255,60,60,0.5)', transform: 'translate(-1.6px, -1px)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', inset: -1, borderRadius: '50%', border: '2px solid rgba(70,150,255,0.5)', transform: 'translate(1.6px, 1px)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at center, transparent 66%, rgba(0,0,0,0.38) 83%, rgba(0,217,255,0.12) 95%, transparent 100%)', pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'radial-gradient(120% 90% at 30% 18%, rgba(255,255,255,0.2), transparent 45%)', pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', left: '50%', top: 9, transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.14em', color: 'var(--cyan)' }}>X-RAY</span>
          <span style={{ position: 'absolute', left: '50%', top: '50%', width: 13, height: 1, background: 'rgba(0,217,255,0.55)', transform: 'translate(-50%,-50%)' }} />
          <span style={{ position: 'absolute', left: '50%', top: '50%', width: 1, height: 13, background: 'rgba(0,217,255,0.55)', transform: 'translate(-50%,-50%)' }} />
          <span style={{ position: 'absolute', right: -16, bottom: -16, width: 26, height: 5, borderRadius: 3, background: 'var(--cyan)', transform: 'rotate(45deg)', boxShadow: '0 0 10px var(--cyan)' }} />
        </div>

        {/* idle hint */}
        {!active && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, pointerEvents: 'none' }}>
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 72, height: 72, borderRadius: '50%', border: '2px solid var(--cyan)', boxShadow: '0 0 22px rgba(0,217,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}
            >
              🔍
            </motion.div>
            <span className="sys sys-cyan" style={{ fontSize: 11 }}>Веди лупой по экрану</span>
          </div>
        )}
      </div>

      <p className="sys" style={{ textAlign: 'center', fontSize: 10.5, color: 'var(--text-faint)', marginBottom: 14 }}>
        Сверху — слова клиента. Под лупой — что на самом деле.
      </p>

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
                style={{ padding: '11px 13px', borderColor: 'rgba(0,217,255,0.25)' }}
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
            <button className="btn btn-primary" onClick={() => { select(); navigateScreen(10, 'scan') }}>
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
