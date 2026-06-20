import { RankBadge } from './RankBadge'
import type { Profession } from '../types'

interface Props { profession: Profession }

const TEAMMATES = [
  { name: 'Говнобриф', status: 'пикнул "ЦА все"' },
  { name: 'Дырявый лендос', status: 'AFK после клика' },
  { name: 'ОП не вывозит', status: 'отправил КП и пропал' },
  { name: 'Мутный оффер', status: '"под ключ" без смысла' },
  { name: 'CRM-болото', status: 'всё записано в Excel' },
]

export const MatchCard = ({ profession }: Props) => (
  <div className="card" style={{ marginTop: 16 }}>
    <div style={{ color: 'var(--text-faint)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Состав команды</div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-card)', marginBottom: 8 }}>
      <div>
        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Ты</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{profession.label}</div>
      </div>
      <RankBadge label={profession.rankLabel} />
    </div>
    {TEAMMATES.map((t, i) => (
      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < TEAMMATES.length - 1 ? '1px solid var(--border-card)' : 'none' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.name}</span>
        <span style={{ color: 'var(--text-faint)', fontSize: 11 }}>{t.status}</span>
      </div>
    ))}
    <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(230,57,70,0.1)', borderRadius: 8, textAlign: 'center' }}>
      <span style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-data)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase' }}>Шанс победы: 7%</span>
    </div>
  </div>
)
