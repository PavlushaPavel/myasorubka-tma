import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentScreen: 0,
      profession: null,
      tookTheBait: false,
      matchStarted: false,
      defeatAnimDone: false,
    })
  })

  it('starts at screen 0', () => {
    expect(useAppStore.getState().currentScreen).toBe(0)
  })

  it('goToScreen changes currentScreen', () => {
    useAppStore.getState().goToScreen(3)
    expect(useAppStore.getState().currentScreen).toBe(3)
  })

  it('setProfession sets profession', () => {
    useAppStore.getState().setProfession('director')
    expect(useAppStore.getState().profession).toBe('director')
  })
})
