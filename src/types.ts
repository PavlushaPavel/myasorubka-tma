export type ProfessionId = 'director' | 'designer' | 'landing' | 'avito' | 'target'

export interface ToxicMessage {
  sender: string
  text: string
}

export interface SlipPointData {
  title: string
  clientSaid: string
  reality: string
  result: string
}

export interface BeforeAfter {
  before: { headline: string; cta: string }
  after: { headline: string; facts: string[]; cta: string }
}

export interface Profession {
  id: ProfessionId
  label: string
  blameSubject: string
  blameCard: string
  stampText: string
  projectTitle: string
  rankLabel: string
  clientSays: string[]
  toxicChat: ToxicMessage[]
  clientBlame: string
  slivPoints: SlipPointData[]
  beforeAfter: BeforeAfter
}
