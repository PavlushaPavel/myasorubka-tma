import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { navigateScreen } from './lib/navigateScreen'
import { Stage00Splash } from './stages/Stage00Splash'
import { Stage01Entry } from './stages/Stage01Entry'
import { Stage02RoleSelect } from './stages/Stage02RoleSelect'
import { Stage03QuickTest } from './stages/Stage03QuickTest'
import { Stage04BigPreframe } from './stages/Stage04BigPreframe'
import { Stage05Case1 } from './stages/Stage05Case1'
import { Stage06Loupe } from './stages/Stage06Loupe'
import { Stage07BlindLaunch } from './stages/Stage07BlindLaunch'
import { Stage08PostLaunch } from './stages/Stage08PostLaunch'
import { Stage09Verdict } from './stages/Stage09Verdict'
import { Stage10Toolkit } from './stages/Stage10Toolkit'
import { Stage11Telegram } from './stages/Stage11Telegram'
import { Stage12ProofAI } from './stages/Stage12ProofAI'
import { Stage13Video } from './stages/Stage13Video'
import { Stage14Offer } from './stages/Stage14Offer'
import { Stage15Bablo } from './stages/Stage15Bablo'

const supportsVT = typeof document !== 'undefined' && 'startViewTransition' in document

const STAGES: Record<number, () => ReactElement> = {
  0: Stage00Splash,
  1: Stage01Entry,
  2: Stage02RoleSelect,
  3: Stage03QuickTest,
  4: Stage04BigPreframe,
  5: Stage05Case1,
  6: Stage06Loupe,
  7: Stage07BlindLaunch,
  8: Stage08PostLaunch,
  9: Stage09Verdict,
  10: Stage10Toolkit,
  11: Stage11Telegram,
  12: Stage12ProofAI,
  13: Stage13Video,
  14: Stage14Offer,
  15: Stage15Bablo,
}

const Fallback = () => (
  <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', gap: 14 }}>
    <span className="sys sys-cyan">STAGE NOT FOUND</span>
    <button className="btn btn-primary" style={{ maxWidth: 260 }} onClick={() => navigateScreen(0)}>↺ В начало</button>
  </div>
)

export default function App() {
  const stage = useAppStore((s) => s.currentStage)
  const Current = STAGES[stage] ?? Fallback

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
