import { create } from 'zustand'
import type { RoleId } from '../types'
import { BLIND_FLAGS } from '../data/content'
import { getRole } from '../data/roles'

interface AppState {
  currentStage: number
  role: RoleId | null
  quickTestKey: string | null
  blindSelected: string[]
  postLaunchSelected: string[]
  refCode: string

  goToStage: (n: number) => void
  setRole: (id: RoleId) => void
  setQuickTest: (key: string) => void
  setBlindSelected: (keys: string[]) => void
  setPostLaunchSelected: (keys: string[]) => void
  score: () => number
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

export const useAppStore = create<AppState>((set, get) => ({
  currentStage: 0,
  role: null,
  quickTestKey: null,
  blindSelected: [],
  postLaunchSelected: [],
  refCode: generateRefCode(),

  goToStage: (n) => set({ currentStage: n }),
  setRole: (id) => set({ role: id }),
  setQuickTest: (key) => set({ quickTestKey: key }),
  setBlindSelected: (keys) => set({ blindSelected: keys }),
  setPostLaunchSelected: (keys) => set({ postLaunchSelected: keys }),

  // Verdict score 0–100 from blind-launch + post-launch correctness, penalised for traps.
  score: () => {
    const { blindSelected, postLaunchSelected, role } = get()
    const r = role ? getRole(role) : undefined

    const blindCorrect = BLIND_FLAGS.filter((f) => f.correct).map((f) => f.key)
    const blindTraps = BLIND_FLAGS.filter((f) => f.trap).map((f) => f.key)
    const postCorrect = r ? r.postLaunch.correctKeys : []
    const postTraps = r ? r.postLaunch.options.filter((o) => o.trap).map((o) => o.key) : []

    const totalCorrect = blindCorrect.length + postCorrect.length || 1
    const gotCorrect =
      blindSelected.filter((k) => blindCorrect.includes(k)).length +
      postLaunchSelected.filter((k) => postCorrect.includes(k)).length
    const trapsHit =
      blindSelected.filter((k) => blindTraps.includes(k)).length +
      postLaunchSelected.filter((k) => postTraps.includes(k)).length

    const raw = gotCorrect / totalCorrect
    const penalty = trapsHit * 0.12
    return Math.max(0, Math.min(100, Math.round((raw - penalty) * 100)))
  },
}))
