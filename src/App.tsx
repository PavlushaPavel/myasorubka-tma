import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { navigateScreen } from './lib/navigateScreen'
import { Stage01Entry } from './stages/Stage01Entry'
import { Stage06Loupe } from './stages/Stage06Loupe'

const supportsVT = typeof document !== 'undefined' && 'startViewTransition' in document

const STAGE_NAMES: Record<number, string> = {
  0: 'Сплэш / внешний префрейм',
  2: 'Выбор роли',
  3: 'Быстрый тест',
  4: 'Большой префрейм',
  5: 'Дело №1 — цепочка',
  7: 'Слепой запуск',
  8: 'Проверка после запуска',
  9: 'Вердикт',
  10: 'Антислив-набор',
  11: 'Telegram-хаб',
  12: 'Proof AI',
  13: 'Финальное видео',
  14: 'Оффер «Лендос за вечер»',
  15: 'Кнопка «Бабло»',
}

const Placeholder = ({ stage }: { stage: number }) => (
  <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', gap: 14, textAlign: 'center' }}>
    <span className="sys sys-cyan">STAGE {stage} · СКОРО</span>
    <h2 style={{ fontSize: 26, color: 'var(--text)' }}>{STAGE_NAMES[stage] ?? 'Этап'}</h2>
    <p style={{ color: 'var(--text-faint)', fontSize: 13 }}>Этот экран ещё собирается. Жми дальше, чтобы дойти до готовых.</p>
    <button className="btn btn-primary" style={{ maxWidth: 280 }} onClick={() => navigateScreen(stage === 15 ? 1 : stage + 1)}>
      {stage === 6 ? '' : stage === 15 ? '↺ В начало' : '→ Следующий этап'}
    </button>
  </div>
)

const STAGES: Record<number, () => ReactElement> = {
  1: Stage01Entry,
  6: Stage06Loupe,
}

export default function App() {
  const stage = useAppStore((s) => s.currentStage)
  const Current = STAGES[stage] ?? (() => <Placeholder stage={stage} />)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'var(--void)' }}>
      {supportsVT ? (
        <div style={{ position: 'absolute', inset: 0 }}>
          <Current />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={stage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', inset: 0 }}>
            <Current />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
