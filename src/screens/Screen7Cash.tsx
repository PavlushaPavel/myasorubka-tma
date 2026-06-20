import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'

const FREE_ITEMS = [
  'Настроить Директ — 30 000 ₽',
  'Поправить заголовки — бесплатно',
  'Подумать над оффером — бесплатно',
  'Подсказать по сайту — бесплатно',
  'Поспорить про лиды — бесплатно',
  'Успокаивать клиента — бесплатно',
  'Следующий проект — уже за 18 000 ₽',
]

const PAID_ITEMS = [
  'Разбор вводных — отдельная работа',
  'Оффер — отдельная работа',
  'Первый экран — отдельная работа',
  'Лендос — отдельная работа',
  'Креативные углы — отдельная работа',
  'CRM/обработка — отдельная работа',
  'Докрутка — рекуррент',
]

export const Screen7Cash = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen">
      <h1 style={{ fontSize: 'clamp(18px, 5vw, 24px)', lineHeight: 1.3, marginBottom: 20 }}>
        Вот где ты терял деньги
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div className="card">
          <div style={{ color: 'var(--accent-red)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
            Ты видел только инструмент
          </div>
          {FREE_ITEMS.map((item, i) => (
            <div key={i} style={{ color: i === FREE_ITEMS.length - 1 ? 'var(--accent-red)' : 'var(--text-muted)', fontSize: 12, marginBottom: 6, lineHeight: 1.4 }}>
              {item}
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ color: 'var(--accent-green)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
            А мог видеть точки слива
          </div>
          {PAID_ITEMS.map((item, i) => (
            <div key={i} style={{ color: 'var(--text-primary)', fontSize: 12, marginBottom: 6, lineHeight: 1.4 }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {[
        'Ты либо чинишь это бесплатно внутри настройки, либо показываешь как отдельную работу.',
        'Точки слива — это не только проблемы проекта. Это будущие чеки.',
        'Рекуррент — это не "посматривать кампанию". Это каждый месяц докручивать точки слива.',
      ].map((text, i) => (
        <Reveal key={i} delay={0.05 * i}>
          <div className="card" style={{ marginBottom: 12, background: 'linear-gradient(180deg, oklch(0.84 0.165 82 / 0.09), var(--bg-raise))', borderColor: 'oklch(0.84 0.165 82 / 0.3)' }}>
            <span style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-data)', fontWeight: 700, fontSize: 18, lineHeight: 1, marginRight: 2 }}>“</span>
            <p style={{ color: 'var(--text-primary)', fontSize: 13, lineHeight: 1.7, display: 'inline' }}>{text}</p>
          </div>
        </Reveal>
      ))}

      <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => { impact('medium'); navigateScreen(7) }}>
        Забрать карту, где меня сделают крайним
      </button>
    </div>
  )
}
