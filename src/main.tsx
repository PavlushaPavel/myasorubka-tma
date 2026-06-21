import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void
        expand: () => void
        version?: string
        isVersionAtLeast?: (v: string) => boolean
        disableVerticalSwipes?: () => void
        showAlert?: (message: string) => void
        HapticFeedback?: {
          impactOccurred: (style: 'light'|'medium'|'heavy'|'rigid'|'soft') => void
          notificationOccurred: (type: 'error'|'success'|'warning') => void
          selectionChanged: () => void
        }
      }
    }
  }
}

const tg = window.Telegram?.WebApp
tg?.ready()
tg?.expand()
// Telegram intercepts vertical swipes to minimize the app; disabling lets our
// in-app screens scroll normally. Only call it where supported (Bot API 7.7+) —
// otherwise Telegram logs a "not supported in version X" console warning.
if (tg?.isVersionAtLeast?.('7.7')) tg.disableVerticalSwipes?.()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
