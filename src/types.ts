export type RoleId = 'director' | 'avito' | 'vk' | 'creative' | 'landing'

/** A multiple-choice option that can be "correct" or a labelled trap. */
export interface ChoiceOption {
  key: string
  text: string
  trap?: 'guess' | 'tool' | null // guess = гадаешь, tool = лечишь кнопку
}

export interface PostLaunchBranch {
  question: string
  options: ChoiceOption[]
  correctKeys: string[]
  trapReaction: string   // shown if user picks a trap option
  goodReaction: string   // shown if user picks mostly-correct
}

export interface Role {
  id: RoleId
  label: string          // "Директолог"
  hire: string           // "Меня нанимают настроить рекламу, а потом спрашивают продажи."
  stampWord: string      // for НЕ РАБОТАЕТ context / "Директ"
  clientBlame: string    // "лиды из Директа холодные"
  postLaunch: PostLaunchBranch
}

export interface ChainNode {
  id: string
  label: string
  hint: string
}

export interface RiskFlag {
  text: string
}

export interface BlindFlag {
  key: string
  text: string
  correct: boolean
  trap?: 'guess' | 'tool' | null
}

export interface VerdictStatus {
  min: number
  max: number
  title: string
  body: string
}

export interface Artifact {
  id: string
  kind: 'gpt' | 'extension' | 'checklist'
  when: ('cta' | 'offer' | 'director' | 'handling' | 'all')[]
  title: string
  body: string
  cta: string
  link?: string
  teaser?: string
}
