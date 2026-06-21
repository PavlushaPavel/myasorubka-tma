import { flushSync } from 'react-dom'
import { useAppStore } from '../store/useAppStore'

type Variant = 'circle' | 'scan'

// Track last tap position (normalized 0..1) so the reveal originates from the finger.
const lastPointer = { x: 0.5, y: 0.5 }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointerdown',
    (e) => {
      lastPointer.x = e.clientX / window.innerWidth
      lastPointer.y = e.clientY / window.innerHeight
    },
    { capture: true, passive: true },
  )
}

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Navigate to a stage with a cinematic View Transition.
 * - 'circle' (default): clip-path circle reveal from the last tap point
 * - 'scan': top→bottom forensic scan wipe (used entering investigation beats)
 * Falls back to an instant change where the API is unavailable or motion is reduced.
 */
export function navigateScreen(n: number, variant: Variant = 'circle') {
  const goToStage = useAppStore.getState().goToStage
  const startVT = document.startViewTransition?.bind(document)

  if (!startVT || prefersReduced()) {
    goToStage(n)
    return
  }

  const root = document.documentElement
  root.style.setProperty('--vt-x', `${lastPointer.x * 100}%`)
  root.style.setProperty('--vt-y', `${lastPointer.y * 100}%`)
  root.dataset.vt = variant

  const transition = startVT(() => {
    flushSync(() => goToStage(n))
  })
  transition.finished.finally(() => {
    delete root.dataset.vt
  })
}
