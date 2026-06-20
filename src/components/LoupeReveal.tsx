import { useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { SlipPointData } from '../types'
import { SlipPoint } from './SlipPoint'
import { Reveal } from './Reveal'

interface Props {
  stampText: string
  slivPoints: SlipPointData[]
  onComplete: () => void
}

export const LoupeReveal = ({ stampText, slivPoints, onComplete }: Props) => {
  const x = useMotionValue(8)
  const clipPath = useTransform(x, (v: number) => `circle(64px at ${v}% 50%)`)
  const lensLeft = useTransform(x, (v: number) => `${v}%`)
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')

  const startLoupe = () => {
    if (phase !== 'idle') return
    setPhase('running')
    animate(x, 92, {
      duration: 2.4,
      ease: 'easeInOut',
      onComplete: () => {
        setPhase('done')
        onComplete()
      },
    })
  }

  const stampBase: React.CSSProperties = {
    fontFamily: 'var(--font-stamp)',
    fontWeight: 700,
    fontSize: 'clamp(34px, 11vw, 54px)',
    textTransform: 'uppercase',
    letterSpacing: '0.01em',
    padding: '8px 16px',
    display: 'inline-block',
    transform: 'rotate(-5deg)',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Stamp stage with sweeping magnifier */}
      <div style={{ position: 'relative', height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* faded "cley­mo" underneath */}
        <div style={{ ...stampBase, color: 'oklch(0.62 0.12 22 / 0.28)', border: '3px solid oklch(0.62 0.12 22 / 0.28)' }}>
          {stampText}
        </div>

        {/* bright revealed stamp, clipped to the lens while running */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: phase === 'done' ? 'none' : clipPath,
            opacity: phase === 'idle' ? 0 : 1,
            pointerEvents: 'none',
          }}
        >
          <div style={{ ...stampBase, color: 'var(--accent-red)', border: '3px solid var(--accent-red)', boxShadow: 'var(--glow-red)', textShadow: '0 0 24px var(--accent-red)' }}>
            {stampText}
          </div>
        </motion.div>

        {/* the visible lens itself */}
        {phase === 'running' && (
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: lensLeft,
              width: 128,
              height: 128,
              x: '-50%',
              y: '-50%',
              borderRadius: '50%',
              border: '2px solid oklch(0.92 0.02 285 / 0.9)',
              boxShadow: '0 0 0 1px oklch(0 0 0 / 0.5), 0 0 30px oklch(0.84 0.165 82 / 0.4), inset 0 0 40px oklch(1 1 1 / 0.06)',
              background: 'radial-gradient(circle, oklch(1 1 1 / 0.04), transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* CTA sits right under the stamp so it is always on screen */}
      {phase !== 'done' && (
        <button
          className="btn-primary"
          onClick={startLoupe}
          disabled={phase === 'running'}
          style={{ marginTop: 12, opacity: phase === 'running' ? 0.7 : 1 }}
        >
          {phase === 'running' ? 'Лупа идёт по клейму…' : 'Включить Лупу'}
        </button>
      )}

      {/* Sliv points only exist after the sweep — no dead space before */}
      {phase === 'done' && (
        <div style={{ marginTop: 16 }}>
          {slivPoints.map((sp, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <SlipPoint data={sp} visible />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
