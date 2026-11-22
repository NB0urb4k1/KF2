import { useCallback } from 'react'
import { DIFF_META } from '../difficulties.js'

export default function AchievementItem({ achievement, done, onToggle }) {
  // Extraido del map() de AchievementList: uno por fila; useCallback llamado
  // en el nivel superior de este componente (patrón recomendado en React).
  const handleToggle = useCallback(() => onToggle(achievement.id), [achievement.id, onToggle])

  const meta = DIFF_META[achievement.diff] ?? DIFF_META.Otros

  return (
    <button
      onClick={handleToggle}
      className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition ${
        done
          ? 'border-emerald-800/60 bg-emerald-950/30'
          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
      }`}
    >
      {/* Checkbox custom */}
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-bold ${
          done
            ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
            : 'border-zinc-600 text-transparent'
        }`}
      >
        ✓
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span
            className={`text-sm font-semibold ${done ? 'text-emerald-300 line-through decoration-zinc-600' : 'text-zinc-100'}`}
          >
            {achievement.name}
          </span>
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ring-1 ${meta.badge}`}>
            {meta.label}
          </span>
          {achievement.pct != null && achievement.pct < 10 && !done && (
            <span className="rounded bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-bold text-purple-300 ring-1 ring-purple-500/40">
              RARO {achievement.pct}%
            </span>
          )}
        </span>
        <span className={`mt-0.5 block text-xs ${done ? 'text-zinc-500' : 'text-zinc-400'}`}>
          {achievement.desc}
        </span>
      </span>
    </button>
  )
}
