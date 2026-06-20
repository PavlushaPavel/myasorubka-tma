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
// in-app screens scroll normally (Bot API 7.7+, optional chaining for older clients).
tg?.disableVerticalSwipes?.()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
