import AchievementItem from './AchievementItem.jsx'

export default function AchievementList({ loading, visible, completed, onToggle }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-4">
      {loading && (
        <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border border-red-500 border-t-transparent" />
          Actualizando…
        </div>
      )}
      {visible.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-700 py-16 text-center">
          <p className="text-lg font-semibold text-zinc-300">¡Nada por aquí! 🎉</p>
          <p className="mt-1 text-sm text-zinc-500">
            No hay logros que coincidan con el filtro actual.
          </p>
        </div>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {visible.map((a) => (
            <li key={a.id}>
              <AchievementItem achievement={a} done={completed.has(a.id)} onToggle={onToggle} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
