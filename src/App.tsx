import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { navigateScreen } from './lib/navigateScreen'
import { Stage00Splash } from './stages/Stage00Splash'
import { Stage01Entry } from './stages/Stage01Entry'
import { Stage02Role } from './stages/Stage02Role'
import { Stage03Challenge } from './stages/Stage03Challenge'
import { Stage04Longread1 } from './stages/Stage04Longread1'
import { Stage05Loupe } from './stages/Stage05Loupe'
import { Stage06Longread2 } from './stages/Stage06Longread2'
import { Stage07Artifact1 } from './stages/Stage07Artifact1'
import { Stage08MiniChallenge } from './stages/Stage08MiniChallenge'
import { Stage09Artifact2 } from './stages/Stage09Artifact2'
import { Stage10Longread3 } from './stages/Stage10Longread3'
import { Stage11Practice } from './stages/Stage11Practice'
import { Stage12PracticeRoles } from './stages/Stage12PracticeRoles'
import { Stage13Telegram } from './stages/Stage13Telegram'
import { Stage14Proof } from './stages/Stage14Proof'
import { Stage15Video } from './stages/Stage15Video'
import { Stage16Offer } from './stages/Stage16Offer'
import { Stage17Bablo } from './stages/Stage17Bablo'

const supportsVT = typeof document !== 'undefined' && 'startViewTransition' in document

const STAGES: Record<number, () => ReactElement> = {
  0: Stage00Splash,
  1: Stage01Entry,
  2: Stage02Role,
  3: Stage03Challenge,
  4: Stage04Longread1,
  5: Stage05Loupe,
  6: Stage06Longread2,
  7: Stage07Artifact1,
  8: Stage08MiniChallenge,
  9: Stage09Artifact2,
  10: Stage10Longread3,
  11: Stage11Practice,
  12: Stage12PracticeRoles,
  13: Stage13Telegram,
  14: Stage14Proof,
  15: Stage15Video,
  16: Stage16Offer,
  17: Stage17Bablo,
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
