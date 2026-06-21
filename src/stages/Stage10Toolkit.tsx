import { navigateScreen } from '../lib/navigateScreen'
import { useTelegramHaptics } from '../hooks/useTelegramHaptics'
import { Reveal } from '../components/Reveal'
import { CaseBar, ProgressLevels, SystemLabel } from '../components/ui'
import { useAppStore } from '../store/useAppStore'
import { ARTIFACTS } from '../data/content'
import type { Artifact } from '../types'

const kindTag = (kind: Artifact['kind']) => {
  if (kind === 'gpt') return { cls: 'tag tag-cyan', label: 'GPT' }
  if (kind === 'extension') return { cls: 'tag tag-amber', label: 'EXTENSION' }
  return { cls: 'tag tag-red', label: 'CHECKLIST' }
}

const ArtifactCard = ({ a }: { a: Artifact }) => {
  const { impact } = useTelegramHaptics()
  const tag = kindTag(a.kind)

  const onTap = () => {
    impact('light')
    if (a.link) window.open(a.link, '_blank')
    else window.Telegram?.WebApp?.showAlert?.('Чеклист будет доступен после запуска')
  }

  return (
    <div className="panel" style={{ marginBottom: 12 }}>
      <span className={tag.cls}>{tag.label}</span>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 17,
          margin: '10px 0 6px',
          lineHeight: 1.2,
        }}
      >
        {a.title}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.55 }}>{a.body}</p>
      {a.teaser && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            lineHeight: 1.5,
            color: 'var(--text-faint)',
            marginTop: 10,
            paddingLeft: 10,
            borderLeft: '2px solid var(--border)',
          }}
        >
          {a.teaser}
        </p>
      )}
      <button
        className={`btn ${a.link ? 'btn-primary' : 'btn-ghost'}`}
        style={{ marginTop: 14, width: '100%' }}
        onClick={onTap}
      >
        {a.cta}
      </button>
    </div>
  )
}

export const Stage10Toolkit = () => {
  const { select } = useTelegramHaptics()
  const role = useAppStore((s) => s.role)
  const items = ARTIFACTS.filter(
    (a) => a.when.includes('all') || (role ? (a.when as string[]).includes(role) : false),
  )

  return (
    <div className="screen">
      <CaseBar id="CASE #001" status="ARTEFACT VAULT" tone="amber" />
      <div style={{ marginBottom: 16 }}>
        <ProgressLevels current={4} />
      </div>

      <Reveal>
        <SystemLabel tone="amber">TOOL LOCKER / ARTEFACT VAULT</SystemLabel>
        <h1 style={{ fontSize: 'clamp(24px, 7vw, 34px)', margin: '10px 0 8px' }}>Антислив-набор открыт</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>
          Система открыла тебе не склад ссылок, а инструменты под твои слабые места.
        </p>
      </Reveal>

      {items.map((a, i) => (
        <Reveal key={a.id} delay={i * 0.1}>
          <ArtifactCard a={a} />
        </Reveal>
      ))}

      <button
        className="btn btn-primary"
        style={{ marginTop: 14, width: '100%' }}
        onClick={() => {
          select()
          navigateScreen(11, 'scan')
        }}
      >
        Дальше
      </button>
    </div>
  )
}
