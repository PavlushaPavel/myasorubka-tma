// HapticFeedback is only supported from Bot API 6.1+. Calling it on older clients
// (or in a plain browser, which reports 6.0) makes Telegram log a console warning.
// Guard every call behind a version check so the console stays clean everywhere.
const hapticsSupported = () => {
  const tg = window.Telegram?.WebApp
  return !!tg?.HapticFeedback && tg.isVersionAtLeast?.('6.1') === true
}

export const useTelegramHaptics = () => {
  const haptic = () => (hapticsSupported() ? window.Telegram?.WebApp?.HapticFeedback : undefined)
  return {
    impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') =>
      haptic()?.impactOccurred(style),
    notify: (type: 'error' | 'success' | 'warning') =>
      haptic()?.notificationOccurred(type),
    select: () => haptic()?.selectionChanged(),
  }
}
