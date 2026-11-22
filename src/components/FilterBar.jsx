import { DIFF_META } from '../difficulties.js'

export default function FilterBar({
  query,
  onQueryChange,
  showOnlyPending,
  onShowOnlyPendingChange,
  activeDiff,
  onClearDiff,
  visibleCount,
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar logro o descripción…"
          className="w-full max-w-xs rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-red-500 sm:w-64"
        />
        <label className="flex cursor-pointer select-none items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={showOnlyPending}
            onChange={(e) => onShowOnlyPendingChange(e.target.checked)}
            className="h-4 w-4 accent-red-500"
          />
          Solo pendientes
        </label>
        {activeDiff !== 'Todas' && (
          <button
            onClick={onClearDiff}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Quitar filtro: {DIFF_META[activeDiff].label} ✕
          </button>
        )}
        <span className="ml-auto text-xs text-zinc-500">{visibleCount} logros en vista</span>
      </div>
    </div>
  )
}
