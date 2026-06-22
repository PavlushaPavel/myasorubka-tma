import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { navigateScreen } from './lib/navigateScreen'
// ── Opening act (new «За что мы заплатили?» flow) ──
import { Stage00Chat1 } from './stages/Stage00Chat1'
import { Stage01Chat2 } from './stages/Stage01Chat2'
import { Stage02Crisis } from './stages/Stage02Crisis'
import { Stage03Escalation } from './stages/Stage03Escalation'
import { Stage04Role } from './stages/Stage04Role'
import { Stage05Challenge } from './stages/Stage05Challenge'
import { Stage06ClientSays } from './stages/Stage06ClientSays'
import { Stage07Spiral } from './stages/Stage07Spiral'
import { Stage08Loupe } from './stages/Stage08Loupe'
import { Stage09AfterLoupe } from './stages/Stage09AfterLoupe'
import { Stage10Bridge } from './stages/Stage10Bridge'
// ── Artifacts → practice → final (file numbers are legacy; map below is the source of truth) ──
import { Stage07Artifact1 as Artifact1 } from './stages/Stage07Artifact1'
import { Stage08MiniChallenge as MiniChallenge } from './stages/Stage08MiniChallenge'
import { Stage09Artifact2 as Artifact2 } from './stages/Stage09Artifact2'
import { Stage10Longread3 as Longread3 } from './stages/Stage10Longread3'
import { Stage11Practice as Practice } from './stages/Stage11Practice'
import { Stage12PracticeRoles as PracticeRoles } from './stages/Stage12PracticeRoles'
import { Stage13Telegram as Telegram } from './stages/Stage13Telegram'
import { Stage14Proof as Proof } from './stages/Stage14Proof'
import { Stage15Video as Video } from './stages/Stage15Video'
import { Stage16Offer as Offer } from './stages/Stage16Offer'
import { Stage17Bablo as Bablo } from './stages/Stage17Bablo'

const supportsVT = typeof document !== 'undefined' && 'startViewTransition' in document

const STAGES: Record<number, () => ReactElement> = {
  0: Stage00Chat1,
  1: Stage01Chat2,
  2: Stage02Crisis,
  3: Stage03Escalation,
  4: Stage04Role,
  5: Stage05Challenge,
  6: Stage06ClientSays,
  7: Stage07Spiral,
  8: Stage08Loupe,
  9: Stage09AfterLoupe,
  10: Stage10Bridge,
  11: Artifact1,
  12: MiniChallenge,
  13: Artifact2,
  14: Longread3,
  15: Practice,
  16: PracticeRoles,
  17: Telegram,
  18: Proof,
  19: Video,
  20: Offer,
  21: Bablo,
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
