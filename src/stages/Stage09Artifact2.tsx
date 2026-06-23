import { useEffect } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ManifestList, ProgressLevels, SystemLabel, UnlockFrame } from '../components/ui'

const ASSISTANT_LINK = 'https://chatgpt.com/g/g-68f0c74462fc81918f28b32f69b8484d-assistent-dlia-obiavlenii-iandeks-direkt'

const formulas = ['4U', 'PAS', 'BAB', 'AIDA', 'ODC', 'JTBD', 'Before/After', 'Problem/Solution']

const videoInside = [
  'почему “под ключ” — это слабый оффер',
  'как брать результат анализа ЦА',
  'как прогонять его через маркетинговые формулы',
  'как получать разные углы под разные сегменты',
  'как делать заголовки для Директа',
  'как делать первые строки для Авито',
  'как делать офферы для первого экрана',
  'как делать идеи для креативов',
  'как сравнивать “было / стало”',
  'как не писать воду в стиле “качество, опыт, индивидуальный подход”',
]

const beforeAfter = [
  {
    before: 'Купели и чаны под ключ',
    after: 'Горячий чан для зимних вечеров на даче — подберём размер, печь и монтаж под ваш участок',
  },
  {
    before: 'Фулфилмент для маркетплейсов',
    after: 'Приёмка и упаковка товаров для WB/Ozon с проверкой брака, чтобы не ловить возвраты и штрафы на поставке',
  },
  {
    before: 'Настройка рекламы под ключ',
    after: 'Настрою Директ не в пустоту: сначала разберём ЦА, оффер и посадочную, чтобы не слить бюджет в “заявки мусор”',
  },
]

export const Stage09Artifact2 = () => {
  const { impact, select } = useTelegramHaptics()
  useEffect(() => { impact('heavy') }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="screen screen--artifact">
      <CaseBar id="CASE #001" status="OFFER FORENSICS" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>

      <div style={{ marginBottom: 16 }}>
        <UnlockFrame accent="amber">
          <div className="panel" style={{ borderColor: 'rgba(255,177,59,0.42)', background: 'linear-gradient(160deg, rgba(255,177,59,0.1), rgba(17,21,30,0.92))', boxShadow: 'var(--glow-amber)' }}>
            <SystemLabel tone="amber">ARTEFACT UNLOCKED</SystemLabel>
            <h1 style={{ fontSize: 'clamp(25px, 7.4vw, 34px)', margin: '12px 0 10px' }}>Артефакт открыт: Ожирнитель оффера</h1>
            <p style={{ color: 'var(--amber-soft)', fontSize: 15, lineHeight: 1.45, fontWeight: 700 }}>Делаем объявления, офферы, УТП и заголовки на голову сильнее.</p>
          </div>
        </UnlockFrame>
      </div>

      <Reveal delay={0.12}>
        <div className="panel" style={{ marginBottom: 14, borderColor: 'rgba(255,42,42,0.32)', background: 'rgba(255,42,42,0.05)' }}>
          <SystemLabel tone="red">ПЛОХОЙ ОФФЕР ВЫГЛЯДИТ ТАК</SystemLabel>
          <div style={{ display: 'grid', gap: 8, margin: '10px 0 14px' }}>
            {['“Купели и чаны под ключ”', '“Фулфилмент для маркетплейсов”', '“Настройка рекламы под ключ”'].map((item) => (
              <p key={item} style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: 12.5, lineHeight: 1.45, padding: '9px 10px', background: 'rgba(255,255,255,0.035)', borderLeft: '2px solid var(--red)' }}>{item}</p>
            ))}
          </div>
          <p style={{ color: 'var(--red-soft)', fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.25, textTransform: 'uppercase' }}>Это не оффер. Это вывеска.</p>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
          Оффер начинается там, где человек узнаёт свою ситуацию и понимает, почему ему надо оставить заявку именно сейчас.
        </p>
        <div className="panel" style={{ marginBottom: 14, borderColor: 'rgba(0,217,255,0.28)', background: 'rgba(0,217,255,0.045)' }}>
          <SystemLabel tone="cyan">ФОРМУЛЫ, КОТОРЫЕ НЕ НАДО ЗАУЧИВАТЬ</SystemLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 12 }}>
            {formulas.map((formula) => <span key={formula} className="tag tag-cyan">{formula}</span>)}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.55, marginTop: 12 }}>
            Тебе не нужно заучивать их как студент на экзамене. Нужно, чтобы AI умел использовать их под твою задачу.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <section className="artifact-video">
          <SystemLabel tone="cyan">VIDEO BRIEFING</SystemLabel>
          <h2>Видео: Делаем офферы, объявления и заголовки на голову сильнее</h2>
          <p>4U, PAS, BAB и ещё десяток формул, которые тебе ни о чём не говорят, но уже отработаны маркетологами и помогают делать предложение жирнее конкурентов.</p>
          <button className="video-placeholder" onClick={() => window.Telegram?.WebApp?.showAlert?.('Видео скоро будет доступно')}>
            <span>▶</span>
            <b>[ video_embed: Делаем объявления, офферы, УТП и заголовки на голову сильнее ]</b>
          </button>
          <div style={{ marginTop: 14 }}>
            <SystemLabel tone="faint">ЧТО ВНУТРИ ВИДЕО</SystemLabel>
            <div style={{ marginTop: 10 }}><ManifestList items={videoInside} tone="cyan" columns={1} /></div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.3}>
        <div style={{ margin: '18px 0 10px' }}><SystemLabel tone="amber">БЫЛО / СТАЛО</SystemLabel></div>
        <div style={{ display: 'grid', gap: 10 }}>
          {beforeAfter.map((item, index) => (
            <div key={item.before} className="offer-before-after">
              <div>
                <span className="sys sys-red">БЫЛО #{index + 1}</span>
                <p>{item.before}</p>
              </div>
              <div>
                <span className="sys sys-cyan">СТАЛО #{index + 1}</span>
                <p>{item.after}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.36}>
        <div className="panel" style={{ margin: '18px 0', borderColor: 'rgba(255,177,59,0.45)', background: 'rgba(255,177,59,0.06)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, lineHeight: 1.35, color: 'var(--amber-soft)' }}>
            Формулы не нужны, чтобы умничать. Они нужны, чтобы твой оффер перестал звучать как у всех.
          </p>
        </div>
      </Reveal>

      <button className="btn btn-primary" onClick={() => { impact('light'); window.open(ASSISTANT_LINK, '_blank') }}>
        Открыть ожирнитель оффера
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => { select(); navigateScreen(15, 'scan') }}>
        Дальше
      </button>
    </div>
  )
}
