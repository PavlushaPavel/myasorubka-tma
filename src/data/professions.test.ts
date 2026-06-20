import { describe, it, expect } from 'vitest'
import { PROFESSIONS } from './professions'

describe('professions data', () => {
  it('has exactly 5 professions', () => {
    expect(PROFESSIONS).toHaveLength(5)
  })

  it('each profession has required fields', () => {
    PROFESSIONS.forEach(p => {
      expect(p.id).toBeTruthy()
      expect(p.label).toBeTruthy()
      expect(p.toxicChat.length).toBeGreaterThanOrEqual(4)
      expect(p.slivPoints).toHaveLength(3)
      expect(p.beforeAfter.before.headline).toBeTruthy()
      expect(p.beforeAfter.after.facts.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('ids match expected set', () => {
    const ids = PROFESSIONS.map(p => p.id)
    expect(ids).toContain('director')
    expect(ids).toContain('designer')
    expect(ids).toContain('landing')
    expect(ids).toContain('avito')
    expect(ids).toContain('target')
  })
})
