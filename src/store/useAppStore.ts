import { create } from 'zustand'
import type { RoleId } from '../types'

interface AppState {
  currentStage: number
  role: RoleId | null
  refCode: string

  goToStage: (n: number) => void
  setRole: (id: RoleId) => void
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
  currentStage: 0,
  role: null,
  refCode: generateRefCode(),

  goToStage: (n) => set({ currentStage: n }),
  setRole: (id) => set({ role: id }),
}))
