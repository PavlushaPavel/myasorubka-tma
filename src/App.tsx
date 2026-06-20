import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { Screen1Sin } from './screens/Screen1Sin'
import { Screen2Blame } from './screens/Screen2Blame'
import { Screen3Project } from './screens/Screen3Project'
import { Screen4Launch } from './screens/Screen4Launch'
import { Screen5AI } from './screens/Screen5AI'
import { Screen6Loupe } from './screens/Screen6Loupe'
import { Screen7Cash } from './screens/Screen7Cash'
import { Screen8Map } from './screens/Screen8Map'

const SCREENS = [Screen1Sin, Screen2Blame, Screen3Project, Screen4Launch, Screen5AI, Screen6Loupe, Screen7Cash, Screen8Map]

// When the View Transitions API drives screen changes, skip the Framer cross-slide
// (it would fight the flushSync inside startViewTransition). Fall back to it otherwise.
const supportsVT = typeof document !== 'undefined' && 'startViewTransition' in document

export default function App() {
  const currentScreen = useAppStore(s => s.currentScreen)
  const CurrentScreen = SCREENS[currentScreen] ?? Screen1Sin

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'var(--bg-deep)' }}>
      {supportsVT ? (
        <div style={{ position: 'absolute', inset: 0 }}>
          <CurrentScreen />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <CurrentScreen />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
