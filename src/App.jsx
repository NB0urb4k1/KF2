import { useCallback, useMemo, useState } from 'react'
import { DIFFICULTIES } from './difficulties.js'
import { useProfileData } from './hooks/useProfileData.js'
import AppHeader from './components/AppHeader.jsx'
import FilterBar from './components/FilterBar.jsx'
import AchievementList from './components/AchievementList.jsx'
import ProfileForm from './components/ProfileForm.jsx'
import Footer from './components/Footer.jsx'

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

  // Filtros de vista (estado de la vista, no de los datos)
  const [activeDiff, setActiveDiff] = useState('Todas')
  const [query, setQuery] = useState('')
  const [showOnlyPending, setShowOnlyPending] = useState(false)

  // Cargar un perfil y, si salió bien, empezar de cero con los filtros
  const submitProfile = useCallback(async () => {
    const ok = await loadProfile()
    if (!ok) return
    setActiveDiff('Todas')
    setQuery('')
    setShowOnlyPending(false)
  }, [loadProfile])

  const toggleDiff = useCallback((d) => {
    setActiveDiff((current) => (current === d ? 'Todas' : d))
  }, [])

  const clearDiffFilter = useCallback(() => setActiveDiff('Todas'), [])

  const byDiff = useMemo(() => {
    const map = {}
    for (const d of DIFFICULTIES) map[d] = { total: 0, done: 0 }
    for (const a of achievements) {
      const slot = map[a.diff] ?? map.Otros
      slot.total++
      if (completed.has(a.id)) slot.done++
    }
    return map
  }, [achievements, completed])

  const totalDone = completed.size
  const totalAll = achievements.length
  const overallPct = totalAll ? Math.round((totalDone / totalAll) * 100) : 0

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return achievements.filter((a) => {
      if (activeDiff !== 'Todas' && a.diff !== activeDiff) return false
      if (showOnlyPending && completed.has(a.id)) return false
      if (q && !a.name.toLowerCase().includes(q) && !a.desc.toLowerCase().includes(q)) return false
      return true
    })
  }, [achievements, activeDiff, query, showOnlyPending, completed])

  // ---------- Estado: sin datos (carga inicial o error) ----------
  if (!data) {
    if (error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
          <div className="max-w-md rounded-lg border border-red-800 bg-red-950/40 p-6 text-center">
            <p className="font-semibold text-red-300">No se pudo cargar el perfil</p>
            <p className="mt-2 text-sm text-red-400/80">{error}</p>
          </div>
          <ProfileForm
            value={profileInput}
            onChange={setProfileInput}
            onSubmit={submitProfile}
            loading={loading}
          />
        </div>
      )
    }
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
        <p className="text-sm text-zinc-400">Cargando logros de Steam…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AppHeader
        name={data.name}
        totalAll={totalAll}
        totalDone={totalDone}
        overallPct={overallPct}
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
      />

      <AchievementList loading={loading} visible={visible} completed={completed} onToggle={toggle} />

      <Footer />
    </div>
  )
}
