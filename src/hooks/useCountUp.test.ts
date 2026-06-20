import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCountUp } from './useCountUp'

describe('useCountUp', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('starts at the from value when inactive', () => {
    const { result } = renderHook(() => useCountUp({ from: 42, to: 24, duration: 1500, active: false }))
    expect(result.current).toBe(42)
  })
})
