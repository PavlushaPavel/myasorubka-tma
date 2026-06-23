import { motion } from 'framer-motion'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ManifestList, ProgressLevels, SystemLabel } from '../components/ui'

const TELEGRAM_LINK = 'https://t.me/pavel_context'

const telegramItems = [
  'приложения, которые делаю через AI',
  'расширения, которые раздаю бесплатно',
  'чистку площадок в РСЯ',
  'аналитику и построение отчётов',
  'кейсы',
  'разборы связок',
  'немного лайва',
  'много пользы для тех, кто работает с Директом, Авито, лендами, креативами и AI',
]

export const Stage13Telegram = () => {
  const { impact, select } = useTelegramHaptics()

  return (
    <div className="screen screen--final">
      <CaseBar id="CASE #001" status="REMOTE HUB" tone="cyan" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={5} /></div>

      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)' }}
          />
          <SystemLabel tone="cyan">REMOTE HUB CONNECTED</SystemLabel>
        </div>

        <h1 style={{ fontSize: 'clamp(25px, 7vw, 35px)', marginBottom: 12 }}>Кстати, вот мой Telegram</h1>
        <div className="panel" style={{ borderColor: 'rgba(0,217,255,0.28)', background: 'rgba(0,217,255,0.045)', marginBottom: 14 }}>
          <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.6 }}>
            Если тебе зашёл этот разбор — у меня в Telegram ещё много такого.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.55, marginTop: 10 }}>
            Там не мотивация про AI и не вода в стиле: “нейросети скоро изменят рынок”.
          </p>
          <p style={{ color: 'var(--ice)', fontSize: 13.5, lineHeight: 1.55, marginTop: 10, paddingLeft: 11, borderLeft: '2px solid var(--cyan)' }}>
            Там я показываю, что реально делаю руками.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginBottom: 8 }}><SystemLabel tone="cyan">ТАМ Я ВЫКЛАДЫВАЮ</SystemLabel></div>
        <ManifestList items={telegramItems} tone="cyan" columns={1} />
      </Reveal>

      <Reveal delay={0.18}>
        <div className="panel" style={{ margin: '18px 0', borderColor: 'rgba(255,177,59,0.36)', background: 'rgba(255,177,59,0.05)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
            Я не просто рассказываю, что AI когда-нибудь поможет маркетологам.
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, lineHeight: 1.35, color: 'var(--amber-soft)', marginTop: 10 }}>
            Я уже собираю на нём штуки, которые можно использовать в работе.
          </p>
        </div>
      </Reveal>

      <button className="btn btn-primary" onClick={() => { impact('medium'); window.open(TELEGRAM_LINK, '_blank') }}>
        Подписаться на Telegram
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => { select(); navigateScreen(21, 'scan') }}>
        Продолжить мясорубку
      </button>
      <p className="sys" style={{ marginTop: 12, color: 'var(--text-faint)', fontSize: 10.5, lineHeight: 1.55 }}>
        Подписка — если хочешь больше инструментов, кейсов и бесплатных расширений.
        <br />
        Продолжить мясорубку — если хочешь дойти до сценария “Лендос за вечер” и забрать конкретный способ собрать посадочную через AI.
      </p>
    </div>
  )
}
