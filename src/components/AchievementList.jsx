import AchievementItem from './AchievementItem.jsx'
import { ListChecksIcon, Spinner } from './icons.jsx'

export default function AchievementList({
  loading,
  visible,
  completed,
  onToggle,
  hasFilters,
  onClearFilters,
}) {
  return (
    <main
      aria-busy={loading}
      className="mx-auto max-w-6xl animate-fade-in px-4 py-8 sm:px-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-wide text-white uppercase">
            Logros
          </h2>
          <p className="text-xs text-zinc-400">
            Haz clic en una tarjeta para marcar o desmarcar un logro.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {loading && (
            <span role="status" className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
              <Spinner className="size-3 text-red-400" />
              Actualizando…
            </span>
          )}

          <span className="hidden items-center gap-1.5 text-[11px] text-zinc-400 sm:inline-flex">
            <span aria-hidden="true" className="size-2 rounded-sm bg-emerald-500" />
            Completado
          </span>
          <span className="hidden items-center gap-1.5 text-[11px] text-zinc-400 sm:inline-flex">
            <span aria-hidden="true" className="size-2 rounded-sm border border-zinc-600" />
            Pendiente
          </span>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
          <span
            aria-hidden="true"
            className="mx-auto grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-400"
          >
            <ListChecksIcon className="size-6" />
          </span>
          <h3 className="mt-4 font-display text-xl font-semibold text-white">Nada por aquí</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-zinc-400">
            {hasFilters
              ? 'No hay logros que coincidan con los filtros actuales. Prueba con otra búsqueda o quita los filtros.'
              : 'Este perfil no tiene logros disponibles para mostrar.'}
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
        <ul className="grid gap-3 md:grid-cols-2">
          {visible.map((achievement) => (
            <li key={achievement.id} className="h-full">
              <AchievementItem
                achievement={achievement}
                done={completed.has(achievement.id)}
                onToggle={onToggle}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
