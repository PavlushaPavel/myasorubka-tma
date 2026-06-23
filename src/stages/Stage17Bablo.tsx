import { useState } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, CinematicStrip, ManifestList, ProgressLevels, SystemLabel } from '../components/ui'
import { useAppStore } from '../store/useAppStore'
import finalSystem from '../assets/bg-final-system.webp'

const audience = [
  'директологам',
  'авитологам',
  'таргетологам',
  'дизайнерам',
  'креативщикам',
  'лендингистам',
  'фрилансерам',
  'начинающим мини-агентствам',
  'спецам, которые боятся поднимать чек',
  'тем, кого клиенты уже пытались прожать на возврат',
]

const victims = [
  'директологи, которых делают крайними за продажи',
  'авитологи, которым говорят “заявки мусор”',
  'таргетологи, которым предъявляют за холодных людей',
  'дизайнеры, от которых ждут продающие креативы без нормального брифа',
  'лендингисты, которым говорят “сайт не конвертит”, хотя никто не смотрел трафик и обработку',
]

const shareTemplate = (link: string) => `Слушай, тут прям мясорубка для спецов, которых клиенты делают крайними за “заявки мусор”.

Проходишь как мини-игру: тебе прилетает “за что мы заплатили”, выбираешь свою роль, отвечаешь клиенту, потом включается Лупа и показывает, что может скрываться за “холодные”, “спам”, “нецелевые”, “сайт не конвертит”.

Мне кажется, тебе зайдёт:
${link}`

export const Stage17Bablo = () => {
  const refCode = useAppStore((s) => s.refCode)
  const { notify, impact, select } = useTelegramHaptics()
  const [copied, setCopied] = useState(false)

  const refLink = `https://t.me/myasorubka_bot/app?startapp=${refCode}`
  const message = shareTemplate(refLink)

  const copy = () => {
    impact('medium')
    navigator.clipboard.writeText(`${message}`).then(() => { setCopied(true); notify('success') }).catch(() => {})
  }

  return (
    <div className="screen screen--final reward-screen">
      <CaseBar id="CASE #001" status="REWARD PROTOCOL ACTIVE" tone="amber" />
      <div style={{ marginBottom: 16 }}><ProgressLevels current={5} /></div>
      <CinematicStrip src={finalSystem} label="REFERRAL ACCESS OPENED / MONEY TRACE" tone="money" position="50% 62%" />

      <Reveal>
        <SystemLabel tone="amber">REFERRAL ACCESS OPENED</SystemLabel>
        <h1 style={{ fontSize: 'clamp(28px, 8vw, 40px)', margin: '10px 0 8px' }}>Доля за наводку</h1>
        <p style={{ color: 'var(--amber-soft)', fontSize: 15, lineHeight: 1.45, fontWeight: 700, marginBottom: 14 }}>Ты тут ещё и заработать можешь.</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="panel" style={{ borderColor: 'rgba(255,177,59,0.35)', background: 'rgba(255,177,59,0.05)', marginBottom: 14 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
            Если ты проходишь эту мясорубку и думаешь: “Блин, у меня есть знакомый спец, которого точно так же дрючат клиенты” — можешь не просто скинуть ему ссылку.
          </p>
          <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.6, marginTop: 10 }}>
            Ты можешь привести его сюда и получить свою долю, если он заберёт продукт.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div style={{ marginBottom: 8 }}><SystemLabel tone="red">ПОТОМУ ЧТО ТАКИХ СПЕЦОВ МНОГО</SystemLabel></div>
        <ManifestList items={victims} tone="red" columns={1} />
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, margin: '14px 0 16px' }}>
          Они читают это и узнают себя. А значит, им тоже может зайти мясорубка, Лупа, артефакты и “Лендос за вечер”.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="panel reward-flow">
          <SystemLabel tone="amber">КАК ПОЛУЧИТЬ ДОЛЮ</SystemLabel>
          <div className="money-trace" aria-label="ты → ссылка → спец → покупка → доля">
            <span>ты</span><i>→</i><span>ссылка</span><i>→</i><span>спец</span><i>→</i><span>покупка</span><i>→</i><b>доля</b>
          </div>
          <ol>
            <li>Забираешь свою партнёрскую ссылку.</li>
            <li>Скидываешь её знакомым спецам, в чат, канал или комьюнити.</li>
            <li>Человек проходит мясорубку.</li>
            <li>Если он покупает продукт — ты получаешь процент.</li>
          </ol>
        </section>
      </Reveal>

      <Reveal delay={0.26}>
        <div className="panel" style={{ marginTop: 14, borderColor: 'rgba(57,255,136,0.3)', background: 'rgba(57,255,136,0.055)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, lineHeight: 1.35, color: 'var(--money)' }}>
            Ты не впариваешь левую хрень. Ты скидываешь штуку, после которой человек может наконец понять, почему его делают крайним.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <div style={{ margin: '18px 0 8px' }}><SystemLabel tone="amber">КОМУ ЭТО ЗАЙДЁТ</SystemLabel></div>
        <ManifestList items={audience} tone="amber" />
      </Reveal>

      <Reveal delay={0.38}>
        <div className="panel" style={{ marginTop: 18, borderColor: 'rgba(0,217,255,0.3)', background: 'rgba(0,217,255,0.045)' }}>
          <SystemLabel tone="cyan">МОЖЕШЬ СКИНУТЬ ВОТ ТАК</SystemLabel>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--ice)', whiteSpace: 'pre-wrap', marginTop: 10 }}>{message}</p>
        </div>
      </Reveal>

      <Reveal delay={0.44}>
        <div className="panel" style={{ marginTop: 14, borderColor: 'rgba(255,177,59,0.35)', background: 'rgba(11,16,20,0.6)' }}>
          <SystemLabel tone="faint">YOUR REF LINK</SystemLabel>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--amber)', wordBreak: 'break-all', marginTop: 8 }}>{refLink}</p>
        </div>
      </Reveal>

      <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={copy}>{copied ? 'Ссылка и текст скопированы' : 'Получить ссылку и долю'}</button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => { select(); navigateScreen(20, 'scan') }}>
        Позже, продолжить разбор
      </button>
    </div>
  )
}
