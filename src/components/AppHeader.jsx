import BrandMark from './BrandMark.jsx'
import DifficultySummary from './DifficultySummary.jsx'
import OverallProgress from './OverallProgress.jsx'
import ProfileForm from './ProfileForm.jsx'
import { AlertIcon, RotateIcon, TrashIcon } from './icons.jsx'

export default function AppHeader({
  name,
  totalAll,
  totalDone,
  overallPct,
  rarePending,
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
    <>
      {/* Barra superior fija: marca y acciones rápidas */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <BrandMark />
            <div className="min-w-0">
              <p className="font-display text-lg leading-none font-bold tracking-wide text-white uppercase sm:text-xl">
                KF2 <span className="text-red-500">Logros</span>
              </p>
              <p className="mt-1 truncate text-[11px] text-zinc-400">
                Killing Floor 2 · Logros de Steam
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {name && (
              <span className="hidden max-w-44 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-300 lg:flex">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span className="truncate">{name}</span>
              </span>
            )}

            <button
              type="button"
              onClick={onResetToSteam}
              aria-label="Restaurar el progreso guardado de Steam"
              title="Restaurar el progreso guardado de Steam"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
            >
              <RotateIcon className="size-3.5" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>

            <button
              type="button"
              onClick={onClearAll}
              aria-label="Marcar todos los logros como pendientes"
              title="Marcar todos los logros como pendientes"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 text-xs font-medium text-zinc-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-200 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
            >
              <TrashIcon className="size-3.5" />
              <span className="hidden sm:inline">Vaciar</span>
            </button>
          </div>
        </div>

        {loading && (
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
            <span className="block h-full w-1/4 animate-progress bg-red-500" />
          </span>
        )}
      </header>

      {/* Hero: identidad, carga de perfil y resumen global */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-red-300 uppercase">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-red-400" />
              </span>
              Killing Floor 2 · Steam
            </p>

            <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[0.95] font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
              Cazador de{' '}
              <span className="relative inline-block text-red-500">
                logros
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-linear-to-r from-red-600 via-red-500 to-transparent"
                />
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {name ? (
                <>
                  Progreso de <strong className="font-semibold text-zinc-100">{name}</strong>.{' '}
                </>
              ) : null}
              Marca lo que ya hayas conseguido, filtra por dificultad y encuentra los logros más
              raros de la comunidad.
            </p>

            <ProfileForm
              value={profileInput}
              onChange={onProfileInputChange}
              onSubmit={onSubmitProfile}
              loading={loading}
            />

            {error && (
              <div
                role="alert"
                className="mt-4 flex max-w-xl items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-100"
              >
                <AlertIcon className="mt-0.5 size-4 shrink-0 text-red-400" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}
          </div>

          <OverallProgress
            totalDone={totalDone}
            totalAll={totalAll}
            overallPct={overallPct}
            rarePending={rarePending}
          />
        </div>

        <DifficultySummary
          byDiff={byDiff}
          activeDiff={activeDiff}
          onToggleDiff={onToggleDiff}
          totalDone={totalDone}
          totalAll={totalAll}
          overallPct={overallPct}
        />
      </section>
    </>
  )
}
