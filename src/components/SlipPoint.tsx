import type { SlipPointData } from '../types'

interface Props { data: SlipPointData; visible: boolean }

export const SlipPoint = ({ data, visible }: Props) => (
  <div className="card" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease', marginBottom: 12 }}>
    <div style={{ color: 'var(--accent-red)', fontFamily: 'Oswald', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', marginBottom: 10 }}>{data.title}</div>
    <div style={{ marginBottom: 6 }}>
      <span style={{ color: 'var(--text-faint)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Клиент сказал:</span>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>«{data.clientSaid}»</p>
    </div>
    <div style={{ marginBottom: 6 }}>
      <span style={{ color: 'var(--text-faint)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>На деле:</span>
      <p style={{ color: 'var(--text-primary)', fontSize: 13, marginTop: 2 }}>{data.reality}</p>
    </div>
    <div>
      <span style={{ color: 'var(--text-faint)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Что случилось:</span>
      <p style={{ color: 'var(--accent-red)', fontSize: 13, marginTop: 2 }}>{data.result}</p>
    </div>
  </div>
)
