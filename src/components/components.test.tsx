import { describe, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { RankBadge } from './RankBadge'
import { ProfessionCard } from './ProfessionCard'
import { SlipPoint } from './SlipPoint'
import { PROFESSIONS } from '../data/professions'

describe('core components', () => {
  it('RankBadge renders', () => { render(<RankBadge label="Усталый Silver" />) })
  it('ProfessionCard renders', () => { render(<ProfessionCard profession={PROFESSIONS[0]} selected={false} onSelect={vi.fn()} />) })
  it('SlipPoint renders', () => { render(<SlipPoint data={PROFESSIONS[0].slivPoints[0]} visible={true} />) })
})
