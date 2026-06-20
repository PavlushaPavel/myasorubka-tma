export const useTelegramHaptics = () => {
  const haptic = window.Telegram?.WebApp?.HapticFeedback
  return {
    impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') =>
      haptic?.impactOccurred(style),
    notify: (type: 'error' | 'success' | 'warning') =>
      haptic?.notificationOccurred(type),
    select: () => haptic?.selectionChanged(),
  }
}
