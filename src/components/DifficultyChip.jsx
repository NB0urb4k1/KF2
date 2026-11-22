import { DIFF_META } from '../difficulties.js'

export default function DifficultyChip({ difficulty, done, total, pct, isActive, onToggle }) {
  const meta = DIFF_META[difficulty]
  const isAll = difficulty === 'Todas'

  return (
    <button
      type="button"
      onClick={() => onToggle(difficulty)}
      aria-pressed={isActive}
      aria-label={`${meta.label}: ${done} de ${total} logros completados (${pct}%)`}
      className={`group relative overflow-hidden rounded-xl border p-3 text-left transition duration-200 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:outline-none motion-safe:hover:-translate-y-0.5 ${
        isActive
          ? 'border-red-500/60 bg-red-500/10 shadow-lg shadow-red-950/20'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
      }`}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5">
          <span
            aria-hidden="true"
            className={`size-2 shrink-0 rounded-full ${meta.dot} ${
              isActive ? 'ring-4 ring-red-500/15' : ''
            }`}
          />
          <span className="truncate text-xs font-semibold text-zinc-200">
            {isAll ? 'Todas' : (meta.shortLabel ?? meta.label)}
          </span>
        </span>
        <span
          className={`font-display text-sm font-bold tabular-nums ${
            isActive ? 'text-red-300' : 'text-zinc-400'
          }`}
        >
          {pct}%
        </span>
      </span>

      <span className="mt-2 block text-[11px] text-zinc-400 tabular-nums">
        {done}/{total} logros
      </span>

      <span
        aria-hidden="true"
        className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/5"
      >
        <span
          className={`block h-full rounded-full ${meta.bar} transition-[width] duration-700 ease-out motion-reduce:transition-none`}
          style={{ width: `${pct}%` }}
        />
      </span>
    </button>
  )
}
