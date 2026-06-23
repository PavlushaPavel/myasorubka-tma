import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { navigateScreen } from './lib/navigateScreen'
import phasePressure from './assets/phase-pressure.webp'
import phaseScan from './assets/phase-scan.webp'
import artifactVault from './assets/bg-artifact-vault.webp'
import practiceCase from './assets/bg-practice-case.webp'
import proofBriefing from './assets/bg-proof-briefing.webp'
import finalSystem from './assets/bg-final-system.webp'
import { StagePreframe } from './stages/StagePreframe'
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
  0: StagePreframe,
  1: Stage00Chat1,
  2: Stage01Chat2,
  3: Stage02Crisis,
  4: Stage03Escalation,
  5: Stage04Role,
  6: Stage05Challenge,
  7: Stage06ClientSays,
  8: Stage07Spiral,
  9: Stage08Loupe,
  10: Stage09AfterLoupe,
  11: Stage10Bridge,
  12: Artifact1,
  13: MiniChallenge,
  14: Artifact2,
  15: Longread3,
  16: Practice,
  17: PracticeRoles,
  18: Telegram,
  19: Proof,
  20: Video,
  21: Offer,
  22: Bablo,
}

const Fallback = () => (
  <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', gap: 14 }}>
    <span className="sys sys-cyan">STAGE NOT FOUND</span>
    <button className="btn btn-primary" style={{ maxWidth: 260 }} onClick={() => navigateScreen(0)}>↺ В начало</button>
  </div>
)

const getPhase = (stage: number) => {
  if (stage <= 8) return { id: 'pressure', label: 'CLIENT PRESSURE', image: phasePressure, color: 'red' }
  if (stage <= 11) return { id: 'scan', label: 'FORENSIC SCAN', image: phaseScan, color: 'cyan' }
  if (stage <= 15) return { id: 'artifact', label: 'EVIDENCE VAULT', image: artifactVault, color: 'amber' }
  if (stage <= 18) return { id: 'practice', label: 'LIVE CASE', image: practiceCase, color: 'amber' }
  if (stage <= 20) return { id: 'briefing', label: 'PROOF ROOM', image: proofBriefing, color: 'cyan' }
  return { id: 'final', label: 'SYSTEM CONTROL', image: finalSystem, color: 'money' }
}

export default function App() {
  const stage = useAppStore((s) => s.currentStage)
  const Current = STAGES[stage] ?? Fallback
  const phase = getPhase(stage)

  return (
    <div className="app-shell">
      <div className={`phase-art phase-art--${phase.id}`} style={{ backgroundImage: `url(${phase.image})` }} aria-hidden="true" />
      <div className="ambient ambient-danger" />
      <div className="ambient ambient-scan" />
      <div className={`phase-hud phase-hud--${phase.color}`} aria-hidden="true">
        <span>{stage === 0 ? '00' : String(stage).padStart(2, '0')} / 22</span>
        <span>{phase.label}</span>
      </div>
      <div className="case-rail" aria-hidden="true">
        <span>MYASORUBKA / FORENSIC UNIT</span>
        <span>LIVE CASE</span>
      </div>
      {supportsVT ? (
        <div className="stage-viewport">
          <Current />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div className="stage-viewport" key={stage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <Current />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
