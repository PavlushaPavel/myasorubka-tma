import { useCountUp } from '../hooks/useCountUp'

interface Metric { label: string; from: number; to: number; suffix?: string; prefix?: string }
interface Props { metric: Metric; active: boolean }

export const MetricCounter = ({ metric, active }: Props) => {
  const value = useCountUp({ from: metric.from, to: metric.to, duration: 1500, active })
  const isDown = metric.to < metric.from
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-card)' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{metric.label}</span>
      <span style={{ color: isDown ? 'var(--accent-red)' : 'var(--accent-gold)', fontFamily: 'Oswald', fontWeight: 700, fontSize: 16 }}>
        {metric.prefix}{value.toLocaleString('ru-RU')}{metric.suffix}
      </span>
    </div>
  )
}
