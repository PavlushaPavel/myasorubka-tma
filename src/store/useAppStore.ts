import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { RoleId } from '../types'

const MAX_STAGE = 22
const STORAGE_KEY = 'myasorubka_progress_v1'

interface AppState {
  currentStage: number
  role: RoleId | null
  refCode: string

  goToStage: (n: number) => void
  setRole: (id: RoleId) => void
}

const clampStage = (value: unknown): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0
  return Math.min(MAX_STAGE, Math.max(0, Math.floor(value)))
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

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentStage: 0,
      role: null,
      refCode: generateRefCode(),

      goToStage: (n) => set({ currentStage: clampStage(n) }),
      setRole: (id) => set({ role: id }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStage: state.currentStage,
        role: state.role,
        refCode: state.refCode,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<AppState>
        return {
          ...current,
          ...saved,
          currentStage: clampStage(saved.currentStage),
          role: saved.role ?? null,
          refCode: saved.refCode || current.refCode,
        }
      },
    },
  ),
)
