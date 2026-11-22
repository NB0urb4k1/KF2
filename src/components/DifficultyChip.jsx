import { DIFF_META } from '../difficulties.js'

export default function DifficultyChip({ difficulty, done, total, pct, isActive, onToggle }) {
  const meta = DIFF_META[difficulty]
  return (
    <button
      onClick={() => onToggle(difficulty)}
      className={`rounded-lg border p-2 text-left transition ${
        isActive
          ? 'border-zinc-500 bg-zinc-800/80'
          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
        <span className="truncate text-xs font-semibold text-zinc-200">{meta.label}</span>
      </div>
      <div className="mt-1 text-xs text-zinc-400">
        {done}/{total}
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div className={`h-full ${meta.bar} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </button>
  )
}
