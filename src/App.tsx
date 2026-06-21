import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { navigateScreen } from './lib/navigateScreen'
import { Stage01Entry } from './stages/Stage01Entry'
import { Stage06Loupe } from './stages/Stage06Loupe'

const supportsVT = typeof document !== 'undefined' && 'startViewTransition' in document

const Placeholder = ({ stage }: { stage: number }) => (
  <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', gap: 16 }}>
    <span className="sys sys-cyan">STAGE {stage} · TBD</span>
    <button className="btn btn-primary" style={{ maxWidth: 260 }} onClick={() => navigateScreen(stage + 1)}>
      → Следующий этап
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
