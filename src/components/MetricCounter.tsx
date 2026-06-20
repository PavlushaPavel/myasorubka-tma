import { useEffect, useState } from 'react'
import { useSpring, useMotionValueEvent } from 'framer-motion'

interface Metric { label: string; from: number; to: number; suffix?: string; prefix?: string }
interface Props { metric: Metric; active: boolean; delay?: number }

export const MetricCounter = ({ metric, active, delay = 0 }: Props) => {
  const isDown = metric.to < metric.from
  const spring = useSpring(metric.from, { stiffness: 90, damping: 18, mass: 1.1 })
  const [display, setDisplay] = useState(metric.from)

  useMotionValueEvent(spring, 'change', (v) => setDisplay(Math.round(v)))

  useEffect(() => {
    if (!active) { spring.jump(metric.from); setDisplay(metric.from); return }
    const t = setTimeout(() => spring.set(metric.to), delay)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid var(--border-card)' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{metric.label}</span>
      <span style={{
        color: isDown ? 'var(--accent-red-bright)' : 'var(--accent-gold)',
        fontFamily: 'var(--font-data)',
        fontWeight: 700,
        fontSize: 17,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.01em',
        textShadow: isDown
          ? '0 0 16px oklch(0.62 0.205 22 / 0.5)'
          : '0 0 16px oklch(0.84 0.165 82 / 0.45)',
      }}>
        {metric.prefix}{display.toLocaleString('ru-RU')}{metric.suffix}
      </span>
    </div>
  )
}
