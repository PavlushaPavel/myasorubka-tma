import { useState, useEffect, useRef } from 'react'

interface Options {
  from: number
  to: number
  duration: number
  active: boolean
}

export const useCountUp = ({ from, to, duration, active }: Options): number => {
  const [value, setValue] = useState(from)
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (!active) { setValue(from); return }
    startTime.current = null

    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (progress < 1) rafId.current = requestAnimationFrame(step)
    }

    rafId.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId.current)
  }, [active, from, to, duration])

  return value
}
