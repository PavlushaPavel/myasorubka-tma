import { useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion'
import type { SlipPointData } from '../types'
import { SlipPoint } from './SlipPoint'

interface Props {
  stampText: string
  slivPoints: SlipPointData[]
  onComplete: () => void
}

export const LoupeReveal = ({ stampText, slivPoints, onComplete }: Props) => {
  const x = useMotionValue(-10)
  const clipPath = useTransform(x, (v: number) => `circle(80px at ${v}% 50%)`)
  const isRunning = useRef(false)

  const startLoupe = () => {
    if (isRunning.current) return
    isRunning.current = true
    animate(x, 110, { duration: 2.5, ease: 'easeInOut', onComplete })
  }

  const xProgress = useTransform(x, [-10, 110], [0, 100])

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', padding: '24px 0', position: 'relative' }}>
        <div style={{ fontFamily: 'var(--font-stamp)', fontWeight: 700, fontSize: 'clamp(34px, 11vw, 54px)', textTransform: 'uppercase', letterSpacing: '0.01em', color: 'rgba(230,57,70,0.25)', border: '3px solid rgba(230,57,70,0.25)', padding: '8px 16px', display: 'inline-block', transform: 'rotate(-5deg)' }}>
          {stampText}
        </div>
      </div>
      <motion.div style={{ clipPath, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
        <div style={{ padding: '24px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-stamp)', fontWeight: 700, fontSize: 'clamp(34px, 11vw, 54px)', textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--accent-red)', border: '3px solid var(--accent-red)', padding: '8px 16px', display: 'inline-block', transform: 'rotate(-5deg)', boxShadow: 'var(--glow-red)' }}>
            {stampText}
          </div>
        </div>
      </motion.div>
      <div style={{ marginTop: 16 }}>
        {slivPoints.map((sp, i) => (
          <ProgressiveSlipPoint key={i} data={sp} xProgress={xProgress} threshold={(i + 1) * 30} />
        ))}
      </div>
      <button className="btn-primary" onClick={startLoupe} style={{ marginTop: 16 }}>
        Включить Лупу
      </button>
    </div>
  )
}

const ProgressiveSlipPoint = ({ data, xProgress, threshold }: { data: SlipPointData; xProgress: MotionValue<number>; threshold: number }) => {
  const opacity = useTransform(xProgress, [threshold - 10, threshold + 10], [0, 1])
  return (
    <motion.div style={{ opacity }}>
      <SlipPoint data={data} visible={true} />
    </motion.div>
  )
}
