import DifficultyChip from './DifficultyChip.jsx'
import { DIFFICULTIES } from '../difficulties.js'

export default function DifficultySummary({
  byDiff,
  activeDiff,
  onToggleDiff,
  totalDone,
  totalAll,
  overallPct,
}) {
  const isAll = activeDiff === 'Todas'

  return (
    <section aria-labelledby="difficulty-heading" className="mt-8">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="difficulty-heading"
            className="font-display text-lg font-semibold tracking-wide text-zinc-100 uppercase"
          >
            Progreso por dificultad
          </h2>
          <p className="text-xs text-zinc-400">
            Toca una tarjeta para filtrar los logros por dificultad.
          </p>
        </div>

        {!isAll && (
          <button
            type="button"
            onClick={() => onToggleDiff(activeDiff)}
            className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
          >
            Quitar filtro
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
        <DifficultyChip
          difficulty="Todas"
          done={totalDone}
          total={totalAll}
          pct={overallPct}
          isActive={isAll}
          onToggle={onToggleDiff}
        />

        {DIFFICULTIES.map((difficulty) => {
          const { done, total } = byDiff[difficulty]
          const pct = total ? Math.round((done / total) * 100) : 0

          return (
            <DifficultyChip
              key={difficulty}
              difficulty={difficulty}
              done={done}
              total={total}
              pct={pct}
              isActive={activeDiff === difficulty}
              onToggle={onToggleDiff}
            />
          )
        })}
      </div>
    </section>
  )
}
