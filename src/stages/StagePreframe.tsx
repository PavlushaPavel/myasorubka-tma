import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar } from '../components/ui'

const jobs = ['настроить Директ', 'упаковать Авито', 'запустить VK', 'сделать креативы', 'собрать лендос']

const accusations = ['Заявки мусор', 'Продаж нет', 'За что мы заплатили?', 'Давайте возврат']

const hiddenBreakpoints = ['оффере', 'сайте', 'обработке', 'CRM', 'отделе продаж', 'до тебя']

export const StagePreframe = () => {
  const { impact } = useTelegramHaptics()

  return (
    <div className="screen preframe-screen">
      <CaseBar id="CASE #000" status="PREFRAME" tone="red" />

      <Reveal delay={0.04}>
        <div className="preframe-hero">
          <span className="case-stamp stamp-fx">● МЯСОРУБКА ОТКРЫТА</span>
          <h1>
            Сейчас ты
            <br />
            пройдёшь
            <br />
            разбор
            <br />
            претензии
          </h1>
          <p>
            Короткий разбор ситуации, в которую регулярно попадают директологи, авитологи,
            таргетологи, креативщики и лендингисты.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="panel preframe-card">
          <span className="sys sys-amber">ТЕБЯ БЕРУТ НА КОНКРЕТНУЮ РАБОТУ</span>
          <div className="preframe-jobs">
            {jobs.map((job) => (
              <span key={job}>{job}</span>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.16}>
        <section className="panel preframe-claim">
          <span className="sys sys-red">А ПОТОМ ПРИЛЕТАЕТ</span>
          <div className="preframe-quote">
            {accusations.map((phrase, index) => (
              <span key={phrase} className={index === accusations.length - 1 ? 'is-critical' : ''}>
                “{phrase}”
              </span>
            ))}
          </div>
          <p>И вот тут начинается мясорубка.</p>
        </section>
      </Reveal>

      <Reveal delay={0.22}>
        <section className="panel preframe-chain">
          <p>
            Клиент не будет разбирать, где умер результат: в{' '}
            {hiddenBreakpoints.map((item, index) => (
              <span key={item}>
                {item}
                {index < hiddenBreakpoints.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
          <div className="blame-equation" aria-label="Логика клиента">
            <span>заплатил</span>
            <i>→</i>
            <span>денег нет</span>
            <i>→</i>
            <strong>крайний тот, кому заплатил</strong>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.28}>
        <section className="panel preframe-rules">
          <span className="sys sys-cyan">ВНУТРИ ТЫ</span>
          <ul>
            <li>выберешь свою роль;</li>
            <li>ответишь на претензию клиента;</li>
            <li>увидишь, где сам залезаешь в клетку;</li>
            <li>включишь Лупу и разберёшь слова “холодные”, “нецелевые”, “спам”, “не конвертит”, “не работает”.</li>
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.34}>
        <section className="panel preframe-rule">
          <span className="sys sys-red">ГЛАВНОЕ ПРАВИЛО</span>
          <p>
            Отвечай не как идеальный эксперт из учебника, а как ответил бы в реальном чате,
            когда тебя уже прижали фразой “за что мы заплатили?”
          </p>
        </section>
      </Reveal>

      <Reveal delay={0.4} style={{ marginTop: 'auto' }}>
        <button className="btn btn-danger" onClick={() => { impact('medium'); navigateScreen(1, 'scan') }}>
          Показать чат клиента
        </button>
      </Reveal>
    </div>
  )
}
