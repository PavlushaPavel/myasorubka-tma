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

window.Telegram?.WebApp?.ready()
window.Telegram?.WebApp?.expand()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
