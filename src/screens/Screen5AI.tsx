import { useState } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getProfession } from '../data/professions'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'

export const Screen5AI = () => {
  const professionId = useAppStore(s => s.profession)
  const { impact } = useTelegramHaptics()
  const profession = professionId ? getProfession(professionId) : null
  const [tab, setTab] = useState<'before' | 'after'>('before')

  const ba = profession?.beforeAfter

  return (
    <div className="screen">
      <h1 style={{ fontSize: 'clamp(20px, 6vw, 26px)', lineHeight: 1.3, marginBottom: 16 }}>
        Сам ты это быстро не вывезешь
      </h1>

      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
          Чтобы уверенно видеть, где проект сливает деньги, тебе пришлось бы годами набивать опыт:
          брифы, ЦА, офферы, лендинги, креативы, продажи, CRM, аналитика, докрутка, переговоры.
        </p>
        <p style={{ color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.7 }}>
          Тебе не надо становиться всем отделом маркетинга.<br />
          <strong>Тебе надо научиться ставить задачи AI-штабу.</strong>
        </p>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-data)', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', marginBottom: 8 }}>
          Но AI не спасает тупую задачу
        </p>
        <div style={{ marginBottom: 8 }}>
          <div className="tag tag-red" style={{ marginBottom: 4 }}>Плохо</div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontStyle: 'italic' }}>«Сделай лендинг для фулфилмента.»</p>
        </div>
        <div>
          <div className="tag tag-blue" style={{ marginBottom: 4 }}>Нормально</div>
          <p style={{ color: 'var(--text-primary)', fontSize: 13, lineHeight: 1.6 }}>
            «Разбери вводные фулфилмента для селлеров Ozon/WB. Найди сегменты, боли, сильные факты, точки слива на первом экране и собери структуру посадочной под трафик из Директа.»
          </p>
        </div>
      </div>

      {ba && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 12 }}>
            Вот разница между «AI, сделай лендинг» и нормальной задачей:
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {(['before', 'after'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: tab === t ? 'var(--accent-blue)' : 'var(--bg-card)',
                  color: tab === t ? '#fff' : 'var(--text-muted)',
                  fontSize: 13, fontWeight: 600,
                }}
              >
                {t === 'before' ? 'Было' : 'Стало'}
              </button>
            ))}
          </div>
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
            {tab === 'before' ? (
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 8 }}>{ba.before.headline}</p>
                <span className="tag tag-red">{ba.before.cta}</span>
              </div>
            ) : (
              <div>
                <p style={{ color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, lineHeight: 1.5, marginBottom: 12 }}>{ba.after.headline}</p>
                {ba.after.facts.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: 'var(--accent-green)', flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{f}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12 }}>
                  <span className="tag tag-blue">{ba.after.cta}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <button className="btn-primary" onClick={() => { impact('medium'); navigateScreen(5) }}>
        Включить AI-штаб
      </button>
    </div>
  )
}
