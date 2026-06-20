import { useState } from 'react'
import { navigateScreen } from '../lib/navigateScreen'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'

export const Screen1Sin = () => {
  const setTookTheBait = useAppStore(s => s.setTookTheBait)
  const { impact } = useTelegramHaptics()
  const [showOverlay, setShowOverlay] = useState(false)

  const handleTake = () => {
    setTookTheBait(true)
    impact('heavy')
    navigateScreen(1)
  }

  const handleRefuse = () => {
    setTookTheBait(false)
    setShowOverlay(true)
    setTimeout(() => navigateScreen(1), 3000)
  }

  return (
    <div className="screen" style={{ justifyContent: 'space-between' }}>
      <div>
        <Reveal delay={0}>
          <div className="tag tag-red" style={{ marginBottom: 16 }}>Ранг: Ну возьму Silver</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 style={{ fontSize: 'clamp(24px, 7vw, 32px)', lineHeight: 1.2, marginBottom: 16 }}>
            Всё начинается с<br />«ну возьму, деньги нужны»
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="card" style={{ marginBottom: 24 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
              Проект мутный.<br />
              Бриф на три строки.<br />
              Сайт «пока такой».<br />
              Оффер «под ключ».<br />
              ОП «сами обработают».<br />
              Клиент хочет заявки и желательно вчера.
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
              Ты уже чувствуешь, что пахнет мясорубкой.<br />
              Но загрузка нужна. Деньги нужны.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.34} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <motion.button
          className="btn-primary"
          onClick={handleTake}
          animate={{ boxShadow: [
            '0 0 0 0 oklch(0.58 0.205 266 / 0)',
            '0 0 28px 2px oklch(0.58 0.205 266 / 0.55)',
            '0 0 0 0 oklch(0.58 0.205 266 / 0)',
          ] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 16 }}
        >
          Ну возьму, деньги нужны
        </motion.button>
        <button className="btn-ghost" onClick={handleRefuse} style={{ alignSelf: 'center' }}>
          Не возьму
        </button>
      </Reveal>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(8,8,16,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24, textAlign: 'center',
            }}
          >
            <div>
              <p style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-data)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Красиво.
              </p>
              <p style={{ color: 'var(--text-primary)', fontSize: 15, lineHeight: 1.7 }}>
                Но в реальности ты чаще нажимаешь «ну возьму», потому что нужна загрузка.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 16 }}>
                Покажем, что происходит дальше…
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
