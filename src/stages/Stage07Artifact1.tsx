import { useEffect, useState } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, CinematicStrip, ManifestList, ProgressLevels, SystemLabel, UnlockFrame } from '../components/ui'
import artifactVault from '../assets/bg-artifact-vault.webp'

const ASSISTANT_LINK = 'https://chatgpt.com/g/g-68c6691e3f8c8191b52f62ea57d0b828-issledovanie-tsa'

const PROMPT = `Разбери проект как маркетолог перед запуском рекламы / Авито / VK / лендинга.

Проект: [описание проекта]
Гео: [город / регион]
Услуга / продукт: [что продаём]
Цель: [заявки / продажи / консультации / запись]

Нужно вытащить:
1. Сегменты ЦА.
2. Боли каждого сегмента.
3. Желания каждого сегмента.
4. Страхи и возражения.
5. Критерии выбора.
6. Что люди уже могли пробовать.
7. Какие офферы можно тестировать.
8. Какие заголовки использовать.
9. Что должно быть на первом экране.
10. Какие вопросы задать клиенту.
11. Что считать целевой заявкой.
12. Какие риски есть до запуска.

Пиши прикладно, без воды. Не делай абстрактный портрет ЦА. Мне нужна рабочая карта для рекламы, Авито, VK, креативов и лендинга.`

const briefingAnswers = [
  '“ЦА — все, кому нужно.”',
  '“Преимущества — качество и индивидуальный подход.”',
  '“Оффер — под ключ.”',
  '“Менеджеры всё расскажут.”',
]

const requiredInputs = [
  'кто реально покупает',
  'какие сегменты есть',
  'чего люди боятся',
  'что они уже пробовали',
  'почему не покупают сразу',
  'по каким критериям выбирают',
  'какие фразы для них звучат живо',
  'какой оффер им зайдёт',
  'что должно быть на первом экране',
  'что должен спросить менеджер',
  'что считать целевой заявкой',
]

const resultFuel = [
  'сегменты аудитории',
  'реальные боли',
  'страхи перед покупкой',
  'критерии выбора',
  'возражения',
  'офферы',
  'идеи объявлений',
  'первые строки для Авито',
  'углы для VK',
  'смыслы для креативов',
  'структуру первого экрана',
  'вопросы клиенту',
  'подсказки для обработки заявок',
]

const videoInside = [
  'как зайти в ассистента анализа ЦА',
  'какие вводные ему давать',
  'почему “ЦА — владельцы домов” или “селлеры маркетплейсов” — это не ЦА',
  'как получить сегменты',
  'как вытащить боли, страхи, желания и критерии выбора',
  'как понять, какие офферы вообще можно тестировать',
  'как использовать результат для Директа, Авито, VK, креативов и лендоса',
  'какие вопросы задать клиенту, чтобы не запускаться вслепую',
  'как из мутного проекта собрать нормальную маркетинговую карту',
]

export const Stage07Artifact1 = () => {
  const { impact, notify, select } = useTelegramHaptics()
  const [copied, setCopied] = useState(false)
  useEffect(() => { impact('heavy') }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const copyPrompt = () => {
    impact('medium')
    navigator.clipboard.writeText(PROMPT).then(() => { setCopied(true); notify('success') }).catch(() => {})
  }

  return (
    <div className="screen screen--artifact">
      <CaseBar id="CASE #001" status="ARTEFACT VAULT" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={3} /></div>
      <CinematicStrip src={artifactVault} label="ARTEFACT UNLOCKED / PROJECT INTERROGATION" tone="amber" position="50% 72%" />

      <div style={{ marginBottom: 16 }}>
        <UnlockFrame accent="amber">
          <div className="panel" style={{ borderColor: 'rgba(255,177,59,0.42)', background: 'linear-gradient(160deg, rgba(255,177,59,0.1), rgba(17,21,30,0.92))', boxShadow: 'var(--glow-amber)' }}>
            <SystemLabel tone="amber">ARTEFACT UNLOCKED</SystemLabel>
            <h1 style={{ fontSize: 'clamp(25px, 7.4vw, 34px)', margin: '12px 0 10px' }}>Артефакт открыт: Допрос проекта</h1>
            <p style={{ color: 'var(--amber-soft)', fontSize: 15, lineHeight: 1.45, fontWeight: 700 }}>Нахер эти брифы. Смотри, как реально это работает.</p>
          </div>
        </UnlockFrame>
      </div>

      <Reveal delay={0.12}>
        <div className="panel" style={{ marginBottom: 14, borderColor: 'rgba(255,42,42,0.3)', background: 'rgba(255,42,42,0.05)' }}>
          <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.6, marginBottom: 12 }}>Большинство брифов — это кладбище бесполезных ответов.</p>
          <SystemLabel tone="red">КЛИЕНТ ПИШЕТ</SystemLabel>
          <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
            {briefingAnswers.map((item) => (
              <p key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.45, color: 'var(--text-muted)', padding: '9px 10px', borderLeft: '2px solid var(--red)', background: 'rgba(255,255,255,0.035)' }}>{item}</p>
            ))}
          </div>
          <p style={{ color: 'var(--red-soft)', fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.25, marginTop: 14, textTransform: 'uppercase' }}>И ты должен из этого сделать рекламу, Авито, креативы, лендос или VK. Серьёзно?</p>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{ marginBottom: 10 }}><SystemLabel tone="amber">НОРМАЛЬНЫЙ МАРКЕТИНГ ДОЛЖЕН БЫЛ ВЫТАЩИТЬ</SystemLabel></div>
        <div style={{ marginBottom: 16 }}>
          <ManifestList items={requiredInputs} tone="amber" />
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>
          Но чаще всего этого нет. Поэтому сейчас я покажу, как через AI-допрос проекта узнать о бизнесе больше, чем иногда знает сам клиент.
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <section className="artifact-video">
          <SystemLabel tone="cyan">VIDEO BRIEFING</SystemLabel>
          <h2>Видео: Нахер эти брифы — смотри, как реально это работает</h2>
          <p>Показываю, как пользоваться моим ассистентом анализа ЦА, как вытаскивать из проекта нормальные вводные и как использовать это, чтобы улучшить свою работу в десятки раз.</p>
          <button className="video-placeholder" onClick={() => window.Telegram?.WebApp?.showAlert?.('Видео скоро будет доступно')}>
            <span>▶</span>
            <b>[ video_embed: Нахер эти брифы — смотри, как реально это работает ]</b>
          </button>
          <div style={{ marginTop: 14 }}>
            <SystemLabel tone="faint">ЧТО ВНУТРИ ВИДЕО</SystemLabel>
            <div style={{ marginTop: 10 }}><ManifestList items={videoInside} tone="cyan" columns={1} /></div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.3}>
        <div style={{ margin: '18px 0 8px' }}><SystemLabel tone="cyan">ЧТО ТЫ ПОЛУЧИШЬ ПОСЛЕ ДОПРОСА ПРОЕКТА</SystemLabel></div>
        <p style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: 17, lineHeight: 1.25, marginBottom: 10 }}>Не “портрет ЦА”. А рабочее топливо для всей связки:</p>
        <ManifestList items={resultFuel} tone="cyan" />
      </Reveal>

      <Reveal delay={0.36}>
        <div className="panel" style={{ margin: '18px 0', borderColor: 'rgba(255,177,59,0.45)', background: 'rgba(255,177,59,0.06)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, lineHeight: 1.3, color: 'var(--amber-soft)' }}>
            Ты перестаёшь запускаться по ощущениям и начинаешь видеть, что клиент должен был дать тебе до старта.
          </p>
        </div>
      </Reveal>

      <button className="btn btn-primary" onClick={() => { impact('light'); window.open(ASSISTANT_LINK, '_blank') }}>
        Открыть ассистент анализа ЦА
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={copyPrompt}>
        {copied ? 'Промпт скопирован' : 'Скопировать промпт для допроса проекта'}
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => { select(); navigateScreen(13, 'scan') }}>
        Дальше
      </button>
    </div>
  )
}
