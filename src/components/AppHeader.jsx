import ProfileForm from './ProfileForm.jsx'
import OverallProgress from './OverallProgress.jsx'
import DifficultySummary from './DifficultySummary.jsx'

export default function AppHeader({
  name,
  totalAll,
  totalDone,
  overallPct,
  byDiff,
  activeDiff,
  onToggleDiff,
  onResetToSteam,
  onClearAll,
  profileInput,
  onProfileInputChange,
  onSubmitProfile,
  loading,
  error,
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-black tracking-tight text-red-500 uppercase">
              Killing Floor 2 <span className="text-zinc-400">· Logros</span>
            </h1>
            <p className="text-xs text-zinc-500">
              {name ? `${name} · ` : ''}
              {totalAll} logros · datos de Steam
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onResetToSteam}
              className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
            >
              Restaurar Steam
            </button>
            <button
              onClick={onClearAll}
              className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
            >
              Vaciar todo
            </button>
          </div>
        </div>

        {/* Cargar otro perfil */}
        <div className="mt-3">
          <ProfileForm
            value={profileInput}
            onChange={onProfileInputChange}
            onSubmit={onSubmitProfile}
            loading={loading}
          />
          {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        </div>

        {/* Barra de progreso global */}
        <div className="mt-3">
          <OverallProgress totalDone={totalDone} totalAll={totalAll} overallPct={overallPct} />
        </div>

        {/* Progreso por dificultad */}
        <div className="mt-3">
          <DifficultySummary byDiff={byDiff} activeDiff={activeDiff} onToggleDiff={onToggleDiff} />
        </div>
      </div>
    </header>
  )
}
