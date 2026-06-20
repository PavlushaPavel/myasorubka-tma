import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getProfession } from '../data/professions'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'

const MAP_ITEMS = [
  { title: 'Говнобриф', desc: 'Клиент не дал данных. Ты додумал маркетинг сам.' },
  { title: 'Мутная ЦА', desc: 'Аудитория не сегментирована. Один оффер всем — никому.' },
  { title: 'Мутный оффер', desc: '«Под ключ» — не оффер. Нет конкретики, нет причины обратиться.' },
  { title: 'Дырявый лендос', desc: 'Первый экран без фактов. После клика смысл умер.' },
  { title: 'Креатив без смысла', desc: 'Красиво, но не бьёт в боль. Нет цепляющего угла.' },
  { title: 'CRM-болото', desc: 'Лиды тонут. Нет данных — нет понимания почему не покупают.' },
  { title: 'Нет докрутки', desc: 'Запустили и забыли. Без итераций нет роста.' },
]

const DELIVERABLES = [
  'Первый экран', 'Структура', 'Оффер', 'Тексты блоков', 'CTA', 'FAQ',
  'Блок доверия', 'Промпты для визуала', 'ТЗ на сборку',
  'Чеклист «не лей в дырявый лендос»',
  'Скрипт: как объяснить клиенту, почему лендос — отдельная работа',
]

export const Screen8Map = () => {
  const professionId = useAppStore(s => s.profession)
  const refCode = useAppStore(s => s.refCode)
  const { notify, impact, select } = useTelegramHaptics()
  const profession = professionId ? getProfession(professionId) : null

  const [openMap, setOpenMap] = useState<number | null>(null)
  const [showBablo, setShowBablo] = useState(false)
  const [copied, setCopied] = useState(false)

  const refLink = `https://t.me/myasorubka_bot/app?startapp=${refCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink).then(() => {
      setCopied(true)
      notify('success')
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  return (
    <div className="screen">
      <div className="tag tag-red" style={{ marginBottom: 12 }}>Карта</div>
      <h1 style={{ fontSize: 'clamp(18px, 5vw, 24px)', lineHeight: 1.3, marginBottom: 6 }}>
        7 мест, где тебя сделают крайним
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
        Где проект теряет деньги, а виноватым делают твой инструмент.
      </p>

      <div style={{ marginBottom: 24 }}>
        {MAP_ITEMS.map((item, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <button
              onClick={() => { setOpenMap(openMap === i ? null : i); select() }}
              style={{ width: '100%', textAlign: 'left', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600 }}>{item.title}</span>
              <span style={{ color: 'var(--text-faint)', fontSize: 16 }}>{openMap === i ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {openMap === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '10px 16px', background: 'rgba(15,15,26,0.5)', borderRadius: '0 0 8px 8px', border: '1px solid var(--border-card)', borderTop: 'none' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {profession && (
        <div className="card" style={{ marginBottom: 24, border: '1px solid var(--accent-gold)' }}>
          <div style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-data)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
            Я вышел из мясорубки
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text-muted)' }}>
            <div>Меня делали крайним за: <strong style={{ color: 'var(--text-primary)' }}>{profession.label.toLowerCase()}</strong></div>
            <div>Клеймо: <strong style={{ color: 'var(--accent-red)' }}>«{profession.clientBlame}»</strong></div>
            <div>Под клеймом было: {profession.slivPoints.map(s => s.title).join(', ')}</div>
            <div>Первый узел выхода: <strong style={{ color: 'var(--accent-blue)' }}>Лендос за вечер</strong></div>
          </div>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, rgba(67,97,238,0.15), rgba(255,183,3,0.08))', border: '1px solid var(--accent-blue)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div className="tag tag-blue" style={{ marginBottom: 12 }}>Оффер</div>
        <h2 style={{ fontSize: 22, marginBottom: 8, color: 'var(--text-primary)' }}>
          Лендос за вечер
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
          AI-сценарий сборки посадочной, которую можно не только запустить под трафик, но и продать клиенту отдельной работой.
        </p>
        <p style={{ color: 'var(--text-faint)', fontSize: 12, marginBottom: 8 }}>На выходе за вечер:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {DELIVERABLES.map((d, i) => (
            <span key={i} className="tag tag-blue" style={{ fontSize: 11 }}>{d}</span>
          ))}
        </div>
        <div style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-data)', fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          3 999 ₽
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            impact('heavy')
            window.Telegram?.WebApp?.showAlert?.('Оплата будет доступна после запуска. Следи за обновлениями!')
          }}
          style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-gold))', marginBottom: 10 }}
        >
          Открыть AI-сценарий — 3 999 ₽
        </button>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
          Кнопка «Бабло»
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
          Знаешь спеца, которого тоже делали крайним? Скинь ему мясорубку. Если он купит — ты получишь бабки за рекомендацию.
        </p>
        {!showBablo ? (
          <button className="btn-primary" onClick={() => setShowBablo(true)} style={{ background: 'var(--accent-gold)', color: '#000' }}>
            Включить кнопку «Бабло»
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: 'var(--bg-deep)', borderRadius: 8, padding: 12, marginBottom: 12, wordBreak: 'break-all', fontSize: 12, color: 'var(--text-muted)' }}>
              {refLink}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 12, fontSize: 12, textAlign: 'center' }}>
              {([['Переходы', 0], ['Прошли', 0], ['Купили', 0], ['Бабло', '0 ₽']] as const).map(([label, val]) => (
                <div key={label} style={{ background: 'var(--bg-card)', borderRadius: 8, padding: 8 }}>
                  <div style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-data)', fontWeight: 700, fontSize: 16 }}>{val}</div>
                  <div style={{ color: 'var(--text-faint)', fontSize: 10, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
            <button
              className="btn-primary"
              onClick={handleCopy}
              style={{ background: copied ? 'var(--accent-green)' : 'var(--accent-gold)', color: '#000' }}
            >
              {copied ? 'Ссылка скопирована!' : 'Скопировать реф-ссылку'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
