export type RoleId = 'director' | 'avito' | 'vk' | 'creative' | 'landing'

/** A multiple-choice option that can be "correct" or a labelled trap. */
export interface ChoiceOption {
  key: string
  text: string
  trap?: 'guess' | 'tool' | 'wait' | 'test' | null
}

/** Role-specific pre-launch practice: «что можно усилить до запуска». */
export interface PreLaunchBranch {
  question: string
  options: ChoiceOption[]
  correctKeys: string[]
  trapReaction: string
  goodReaction: string
  goodLabel: string // headline shown on the "good" reaction panel
}

export interface Role {
  id: RoleId
  label: string // "Директолог"
  hire: string // role-select card subtitle
  hireTitle: string // §4 "Тебя взяли настраивать Директ"
  setup: string[] // §4 "Ты собрал кампании. Запустил. …"
  complaint: string // §4 "Заявки холодные. Продаж нет. Директ не работает."
  stampWord: string // for stamp context / "Директ"
  preLaunch: PreLaunchBranch
}

export interface ChainNode {
  id: string
  label: string
  hint: string
}

/** §8 Loupe: a client phrase that reveals a hidden reality when scanned. */
export interface LoupePhrase {
  id: string
  phrase: string // visible client line, e.g. «Заявки холодные»
  hidden: string[] // what the loupe reveals underneath
  verdict: string // the takeaway under the reveal
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
  title: string
  body: string
  cta: string
  link?: string
  teaser?: string
}
