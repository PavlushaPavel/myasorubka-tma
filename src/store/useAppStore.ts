import { create } from 'zustand'
import type { ProfessionId } from '../types'

interface RefStats {
  visits: number
  played: number
  bought: number
  earned: number
}

interface AppState {
  currentScreen: number
  profession: ProfessionId | null
  tookTheBait: boolean
  matchStarted: boolean
  defeatAnimDone: boolean
  refCode: string
  refStats: RefStats
  goToScreen: (n: number) => void
  setProfession: (id: ProfessionId) => void
  setTookTheBait: (v: boolean) => void
  startMatch: () => void
  finishDefeat: () => void
}

const generateRefCode = (): string => {
  try {
    const stored = localStorage.getItem('myasorubka_ref')
    if (stored) return stored
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let code = 'ref_'
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)]
    localStorage.setItem('myasorubka_ref', code)
    return code
  } catch {
    return 'ref_demo1'
  }
}

export const useAppStore = create<AppState>((set) => ({
  currentScreen: 0,
  profession: null,
  tookTheBait: false,
  matchStarted: false,
  defeatAnimDone: false,
  refCode: generateRefCode(),
  refStats: { visits: 0, played: 0, bought: 0, earned: 0 },
  goToScreen: (n) => set({ currentScreen: n }),
  setProfession: (id) => set({ profession: id }),
  setTookTheBait: (v) => set({ tookTheBait: v }),
  startMatch: () => set({ matchStarted: true }),
  finishDefeat: () => set({ defeatAnimDone: true }),
}))
