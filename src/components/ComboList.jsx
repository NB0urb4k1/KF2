import ComboCard from './ComboCard.jsx'
import { BoltIcon, Spinner } from './icons.jsx'

export default function ComboList({
  loading,
  combos,
  completed,
  onToggle,
  hasFilters,
  onClearFilters,
}) {
  const totalCore = combos.reduce((count, combo) => count + combo.achievements.length, 0)
  const pendingCore = combos.reduce(
    (count, combo) =>
      count + combo.achievements.reduce((n, a) => n + (completed.has(a.id) ? 0 : 1), 0),
    0,
  )
  const totalBonus = combos.reduce((count, combo) => count + combo.bonusAchievements.length, 0)

  return (
    <main
      aria-busy={loading}
      className="mx-auto max-w-6xl animate-fade-in px-4 py-8 sm:px-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-wide text-white uppercase">
            Una partida, varios logros
          </h2>
          <p className="text-xs text-zinc-400">
            Combos que se desbloquean a la vez al completar el mismo mapa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {loading && (
            <span
              role="status"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400"
            >
              <Spinner className="size-3 text-red-400" />
              Actualizando…
            </span>
          )}

          <span aria-live="polite" className="text-xs text-zinc-400 tabular-nums">
            <strong className="font-semibold text-zinc-200">{pendingCore}</strong> pendientes de{' '}
            {totalCore}
            <span className="sr-only"> logros agrupados en estos combos</span>
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3.5 text-[11px] leading-relaxed text-red-100/80">
        <p>
          <strong className="font-semibold text-red-200">Cómo funciona:</strong> solo agrupamos
          logros que de verdad se solapan. Los de «Difícil o superior» también cuentan al completar
          en Infernal. Las dificultades de una misma escalera (Normal → Difícil → Suicida →
          Infernal) <strong className="font-semibold text-red-200">no se acumulan</strong>: cada una
          pide su propia partida.
        </p>
        {totalBonus > 0 && (
          <p className="mt-1">
            Los <span className="font-semibold text-red-200">bonus</span> (coleccionables, objetos
            del mapa…) se pueden hacer en esa misma partida, pero no son obligatorios para el combo.
          </p>
        )}
      </div>

      {combos.length === 0 ? (
        <div className="relative mt-5 overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
          <span
            aria-hidden="true"
            className="mx-auto grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-400"
          >
            <BoltIcon className="size-6" />
          </span>
          <h3 className="mt-4 font-display text-xl font-semibold text-white">
            Ningún combo coincide
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-zinc-400">
            {hasFilters
              ? 'No hay combos que coincidan con los filtros actuales. Prueba con otra búsqueda o quita los filtros.'
              : 'Este perfil no tiene combos disponibles para mostrar.'}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-xs font-semibold text-white transition hover:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:outline-none"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <ul className="mt-5 grid gap-3 lg:grid-cols-2">
          {combos.map((combo) => (
            <li key={combo.id} className="h-full">
              <ComboCard combo={combo} completed={completed} onToggle={onToggle} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
