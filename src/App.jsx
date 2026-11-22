import { useCallback, useMemo, useState } from 'react'
import { DIFFICULTIES } from './difficulties.js'
import { useProfileData } from './hooks/useProfileData.js'
import AppHeader from './components/AppHeader.jsx'
import AchievementList from './components/AchievementList.jsx'
import Background from './components/Background.jsx'
import BrandMark from './components/BrandMark.jsx'
import FilterBar from './components/FilterBar.jsx'
import Footer from './components/Footer.jsx'
import ProfileForm from './components/ProfileForm.jsx'
import { AlertIcon, Spinner } from './components/icons.jsx'

// Búsqueda tolerante a mayúsculas y acentos: "paris" encuentra "París".
function normalizeText(value) {
  return (value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function App() {
  const {
    profileInput,
    setProfileInput,
    loadProfile,
    data,
    achievements,
    loading,
    error,
    completed,
    toggle,
    resetToSteam,
    clearAll,
  } = useProfileData()

  // Filtros y orden de la vista (estado de la vista, no de los datos)
  const [activeDiff, setActiveDiff] = useState('Todas')
  const [query, setQuery] = useState('')
  const [showOnlyPending, setShowOnlyPending] = useState(false)
  const [sortBy, setSortBy] = useState('default')

  // Cargar un perfil y, si salió bien, empezar de cero con los filtros
  const submitProfile = useCallback(async () => {
    const ok = await loadProfile()
    if (!ok) return
    setActiveDiff('Todas')
    setQuery('')
    setShowOnlyPending(false)
    setSortBy('default')
  }, [loadProfile])

  const toggleDiff = useCallback((difficulty) => {
    setActiveDiff((current) => (current === difficulty ? 'Todas' : difficulty))
  }, [])

  const clearDiffFilter = useCallback(() => setActiveDiff('Todas'), [])

  const clearFilters = useCallback(() => {
    setActiveDiff('Todas')
    setQuery('')
    setShowOnlyPending(false)
  }, [])

  const hasFilters = query.trim() !== '' || showOnlyPending || activeDiff !== 'Todas'

  const byDiff = useMemo(() => {
    const map = {}
    for (const difficulty of DIFFICULTIES) map[difficulty] = { total: 0, done: 0 }

    for (const achievement of achievements) {
      const slot = map[achievement.diff] ?? map.Otros
      slot.total++
      if (completed.has(achievement.id)) slot.done++
    }
    return map
  }, [achievements, completed])

  // Se calcula sobre los logros actuales (no sobre el tamaño del Set) para
  // evitar que ids antiguos de localStorage descuadren el porcentaje.
  const totalDone = useMemo(
    () => achievements.reduce((count, a) => count + (completed.has(a.id) ? 1 : 0), 0),
    [achievements, completed],
  )
  const totalAll = achievements.length
  const overallPct = totalAll ? Math.round((totalDone / totalAll) * 100) : 0

  const rarePending = useMemo(
    () =>
      achievements.reduce(
        (count, a) =>
          count + (a.pct != null && a.pct < 10 && !completed.has(a.id) ? 1 : 0),
        0,
      ),
    [achievements, completed],
  )

  const visible = useMemo(() => {
    const q = normalizeText(query.trim())

    const list = achievements.filter((achievement) => {
      if (activeDiff !== 'Todas' && achievement.diff !== activeDiff) return false
      if (showOnlyPending && completed.has(achievement.id)) return false
      if (
        q &&
        !normalizeText(achievement.name).includes(q) &&
        !normalizeText(achievement.desc).includes(q)
      ) {
        return false
      }
      return true
    })

    switch (sortBy) {
      case 'rarity':
        list.sort(
          (a, b) =>
            (a.pct ?? 100) - (b.pct ?? 100) || a.name.localeCompare(b.name, 'es'),
        )
        break
      case 'pending':
        list.sort(
          (a, b) => Number(completed.has(a.id)) - Number(completed.has(b.id)),
        )
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name, 'es'))
        break
      default:
        break
    }

    return list
  }, [achievements, activeDiff, query, showOnlyPending, completed, sortBy])

  // ---------- Estado: sin datos (carga inicial o error) ----------
  if (!data) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <Background />

        <div className="w-full max-w-lg text-center">
          <div className="flex justify-center">
            <BrandMark className="size-14" />
          </div>

          <p className="mt-6 text-[10px] font-semibold tracking-[0.22em] text-red-400 uppercase">
            Killing Floor 2 · Steam
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
            Cazador de <span className="text-red-500">logros</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
            Sigue tu progreso, encuentra los logros más raros y guarda tu avance en este navegador.
          </p>

          {error ? (
            <>
              <div
                role="alert"
                className="mt-8 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-left"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-500/15 text-red-400">
                  <AlertIcon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-red-50">
                    No se pudo cargar el perfil
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-red-200/80">{error}</p>
                </div>
              </div>

              <div className="text-left">
                <ProfileForm
                  value={profileInput}
                  onChange={setProfileInput}
                  onSubmit={submitProfile}
                  loading={loading}
                />
                <p className="mt-2 text-xs text-zinc-400">
                  Prueba con otra URL o comprueba que el perfil de Steam sea público.
                </p>
              </div>
            </>
          ) : loading ? (
            <div className="mt-10" role="status">
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-300">
                <Spinner className="size-4 text-red-400" />
                Cargando logros de Steam…
              </div>
              <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/5">
                <span className="block h-full w-1/3 animate-progress rounded-full bg-linear-to-r from-red-600 to-orange-400" />
              </div>
              <p className="mt-3 text-xs text-zinc-400">Esto puede tardar unos segundos.</p>
            </div>
          ) : (
            <div className="mt-8 text-left">
              <p className="text-sm font-semibold text-zinc-100">
                Ingresa tu perfil de Steam para empezar
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                Pega la URL de tu perfil o tu SteamID64 y cargaremos tus logros.
              </p>
              <ProfileForm
                value={profileInput}
                onChange={setProfileInput}
                onSubmit={submitProfile}
                loading={loading}
              />
              <p className="mt-2 text-xs text-zinc-400">
                Tu perfil se guardará en este navegador para la próxima visita.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <Background />

      <AppHeader
        name={data.name}
        totalAll={totalAll}
        totalDone={totalDone}
        overallPct={overallPct}
        rarePending={rarePending}
        byDiff={byDiff}
        activeDiff={activeDiff}
        onToggleDiff={toggleDiff}
        onResetToSteam={resetToSteam}
        onClearAll={clearAll}
        profileInput={profileInput}
        onProfileInputChange={setProfileInput}
        onSubmitProfile={submitProfile}
        loading={loading}
        error={error}
      />

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        showOnlyPending={showOnlyPending}
        onShowOnlyPendingChange={setShowOnlyPending}
        activeDiff={activeDiff}
        onClearDiff={clearDiffFilter}
        visibleCount={visible.length}
        totalCount={totalAll}
        sortBy={sortBy}
        onSortChange={setSortBy}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      <AchievementList
        loading={loading}
        visible={visible}
        completed={completed}
        onToggle={toggle}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      <Footer />
    </div>
  )
}
