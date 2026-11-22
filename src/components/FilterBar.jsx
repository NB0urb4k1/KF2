import { DIFF_META } from '../difficulties.js'
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  SearchIcon,
  XIcon,
} from './icons.jsx'

export default function FilterBar({
  query,
  onQueryChange,
  showOnlyPending,
  onShowOnlyPendingChange,
  activeDiff,
  onClearDiff,
  visibleCount,
  totalCount,
  sortBy,
  onSortChange,
  hasFilters,
  onClearFilters,
}) {
  return (
    <div className="mt-8 lg:sticky lg:top-16 lg:z-20">
      <div className="border-y border-white/5 bg-zinc-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2.5 px-4 py-3 sm:px-6">
          <div className="relative min-w-0 basis-full sm:max-w-xs sm:flex-1 sm:basis-auto">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              aria-label="Buscar logros por nombre o descripción"
              placeholder="Buscar logro o descripción…"
              autoComplete="off"
              spellCheck="false"
              className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] pr-9 pl-9 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-red-500/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-red-500/15 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Limpiar búsqueda"
                className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded text-zinc-500 transition hover:bg-white/10 hover:text-zinc-200 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={showOnlyPending}
            onClick={() => onShowOnlyPendingChange(!showOnlyPending)}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className={`relative h-5 w-9 rounded-full transition-colors ${
                showOnlyPending ? 'bg-red-600' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0 size-4 rounded-full bg-white shadow-sm transition-transform ${
                  showOnlyPending ? 'translate-x-[18px]' : 'translate-x-[2px]'
                }`}
              />
            </span>
            Solo pendientes
          </button>

          <label className="relative inline-flex h-10 shrink-0 items-center">
            <span className="sr-only">Ordenar logros</span>
            <ArrowUpDownIcon className="pointer-events-none absolute left-2.5 size-3.5 text-zinc-500" />
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="h-10 appearance-none rounded-lg border border-white/10 bg-white/[0.04] pr-8 pl-8 text-xs font-medium text-zinc-300 outline-none transition hover:border-white/20 focus:border-red-500/70 focus:ring-4 focus:ring-red-500/15 [&>option]:bg-zinc-900 [&>option]:text-zinc-100"
            >
              <option value="default">Orden original</option>
              <option value="rarity">Más raros</option>
              <option value="pending">Pendientes primero</option>
              <option value="name">Nombre A–Z</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2.5 size-3.5 text-zinc-500" />
          </label>

          {activeDiff !== 'Todas' && (
            <button
              type="button"
              onClick={onClearDiff}
              aria-label={`Quitar filtro de dificultad: ${DIFF_META[activeDiff].label}`}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-xs font-semibold text-red-200 transition hover:bg-red-500/15 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${DIFF_META[activeDiff].dot}`}
              />
              {DIFF_META[activeDiff].shortLabel ?? DIFF_META[activeDiff].label}
              <XIcon className="size-3.5" />
            </button>
          )}

          <div className="ml-auto flex items-center gap-3">
            {hasFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="text-xs font-medium text-zinc-400 underline-offset-2 transition hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
              >
                Limpiar filtros
              </button>
            )}
            <span aria-live="polite" className="text-xs text-zinc-400 tabular-nums">
              <strong className="font-semibold text-zinc-200">{visibleCount}</strong> de {totalCount}
              <span className="sr-only"> logros en vista</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
