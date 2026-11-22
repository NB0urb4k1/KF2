import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const STORAGE_PREFIX = 'kf2-tracker-v1:'
const LAST_PROFILE_KEY = 'kf2-tracker-last-profile'
const MY_PROFILE = 'https://steamcommunity.com/profiles/76561198055880724/'

// Referencia estable: si el array vacío viviera dentro del hook, `?? []`
// crearía uno nuevo en cada render y los useMemo se re-ejecutarían sin motivo.
const EMPTY_ACHIEVEMENTS = []

function loadCompleted(steamid, unlockedIds) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + steamid)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return new Set(parsed)
    }
    // Migración: la versión anterior usaba una key única sin steamid
    const legacy = localStorage.getItem('kf2-tracker-v1')
    if (legacy && steamid === '76561198055880724') {
      const parsed = JSON.parse(legacy)
      if (Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_PREFIX + steamid, legacy)
        return new Set(parsed)
      }
    }
  } catch {
    // storage corrupto: volvemos al estado de Steam
  }
  return new Set(unlockedIds)
}

// ids de los logros que Steam reporta como desbloqueados en un body de respuesta
function toUnlockedIds(body) {
  return (body?.achievements ?? []).filter((a) => a.unlocked).map((a) => a.id)
}

async function fetchProfile(target) {
  const res = await fetch('/api/achievements?profile=' + encodeURIComponent(target))
  const body = await res.json()
  if (!res.ok) throw new Error(body?.error || `Error ${res.status}`)
  return body
}

// Capa de datos del perfil: input del usuario, carga desde la API,
// progreso manual (completed) y su persistencia en localStorage.
export function useProfileData() {
  const [profileInput, setProfileInput] = useState(() => {
    try {
      return localStorage.getItem(LAST_PROFILE_KEY) || MY_PROFILE
    } catch {
      return MY_PROFILE
    }
  })
  const [completed, setCompleted] = useState(new Set())

  // El input es solo un borrador; este ref guarda el perfil realmente pedido
  // a la API para que escribir en el campo no dispare nada por sí solo.
  const targetRef = useRef(profileInput)

  // La carga inicial la dispara useQuery (sin useEffect), que además
  // deduplica peticiones y evita carreras/dobles fetch.
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(targetRef.current),
  })
  const { refetch } = profileQuery
  const data = profileQuery.data
  const loading = profileQuery.isFetching
  const error =
    profileQuery.isError && !loading
      ? profileQuery.error.message || 'No se pudo cargar el perfil.'
      : null

  const achievements = data?.achievements ?? EMPTY_ACHIEVEMENTS

  // Devuelve true si la carga terminó bien (para que la vista resetee filtros).
  const loadProfile = useCallback(
    async (value) => {
      const target = (value ?? profileInput).trim()
      if (!target) return false
      targetRef.current = target
      const result = await refetch()
      if (result.error) return false
      try {
        localStorage.setItem(LAST_PROFILE_KEY, target)
      } catch {
        // localStorage bloqueado: no persistimos la URL
      }
      setCompleted(loadCompleted(result.data.steamid, toUnlockedIds(result.data)))
      return true
    },
    [profileInput, refetch],
  )

  // Llegó un resultado de Steam: sincronizar el progreso manual
  // con lo que Steam reporta (localStorage manda si existe).
  useEffect(() => {
    if (!data) return
    setCompleted(loadCompleted(data.steamid, toUnlockedIds(data)))
  }, [data])

  // Guardar progreso del usuario actual
  useEffect(() => {
    if (data?.steamid) {
      try {
        localStorage.setItem(STORAGE_PREFIX + data.steamid, JSON.stringify([...completed]))
      } catch {
        // localStorage lleno o bloqueado: el progreso vive solo en memoria
      }
    }
  }, [completed, data])

  const toggle = useCallback((id) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const resetToSteam = useCallback(() => {
    if (!confirm('¿Restaurar el estado guardado de Steam? Se perderán tus cambios manuales.')) return
    setCompleted(new Set(achievements.filter((a) => a.unlocked).map((a) => a.id)))
  }, [achievements])

  const clearAll = useCallback(() => {
    if (!confirm('¿Marcar TODO como pendiente para este usuario?')) return
    setCompleted(new Set())
  }, [])

  return {
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
  }
}
