import diffsStatic from './diffs.js'

const APP_ID = 232090

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const TTL = 60_000
const responseCache = new Map()

/**
 * Normaliza lo que pegue el usuario a la URL de logros de KF2.
 * Acepta: SteamID64, URL /profiles/..., URL vanita /id/..., dominio sin https, o nombre vanita suelto.
 */
export function buildStatsUrl(input) {
  let s = String(input ?? '').trim()
  if (!s) return null
  if (/^\d{17}$/.test(s)) {
    return `https://steamcommunity.com/profiles/${s}/stats/${APP_ID}/achievements`
  }
  if (!/^https?:\/\//i.test(s)) {
    if (/^(www\.)?steamcommunity\.com\//i.test(s)) s = `https://${s}`
    else if (/^[\w.-]{1,64}$/.test(s)) {
      return `https://steamcommunity.com/id/${s}/stats/${APP_ID}/achievements`
    } else return null
  }
  let u
  try {
    u = new URL(s)
  } catch {
    return null
  }
  if (!/(^|\.)steamcommunity\.com$/i.test(u.hostname)) return null
  const p = u.pathname.replace(/\/+$/, '')
  const statsMatch = p.match(/^(.*?\/stats)\/\d+(\/achievements)?$/)
  if (statsMatch) return `https://steamcommunity.com${statsMatch[1]}/${APP_ID}/achievements`
  if (/^\/(profiles|id)\/[^/]+$/i.test(p)) {
    return `https://steamcommunity.com${p}/stats/${APP_ID}/achievements`
  }
  return null
}

async function fetchSSR(url) {
  const withLang = new URL(url)
  withLang.searchParams.set('l', 'spanish')
  withLang.searchParams.set('nocache', String(Math.random()))
  const res = await fetch(withLang, {
    headers: {
      'User-Agent': UA,
      Cookie: 'steam_language=spanish',
      'Accept-Language': 'es;q=0.9',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
  })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error(`Steam respondió HTTP ${res.status}`)
  }
  const html = await res.text()
  const m = html.match(
    /<script type="application\/json" id="valve-ssr-data"[^>]*>([\s\S]*?)<\/script>/,
  )
  if (!m) return null
  try {
    return JSON.parse(m[1])
  } catch {
    return null
  }
}

function extractAchievements(ssr, diffs) {
  let profile = null
  try {
    profile = JSON.parse(ssr.loaderData?.[1] ?? 'null')
  } catch {
    /* perfil no encontrado */
  }
  const steamid = profile?.targetSteamId
  const name = profile?.targetName || null
  if (!steamid) return { error: 'notfound' }

  let qd = null
  try {
    qd = JSON.parse(ssr.renderContext?.queryData ?? 'null')
  } catch {
    /* sin datos */
  }
  const queries = qd?.queries ?? []
  const findQ = (type) =>
    queries.find(
      (q) =>
        Array.isArray(q.queryKey) &&
        q.queryKey[0] === 'achievements' &&
        q.queryKey[2] === type,
    )

  const userAch = findQ('user_achievements')?.state?.data?.achievements
  const groups = findQ('schema_v2')?.state?.data?.groups
  const percentages = findQ('globalpercentages')?.state?.data?.percentages ?? {}

  if (!groups?.length) return { error: 'notfound' }
  if (!userAch) return { error: 'private', steamid, name }

  const achievements = []
  for (const g of groups) {
    for (const a of g.achievements ?? []) {
      const id = Number(a.internal_key)
      const rec = userAch[String(id)]
      achievements.push({
        id,
        name: a.name,
        desc: a.description,
        diff: diffs[String(id)] ?? 'Otros',
        pct: percentages[String(id)] ?? null,
        unlocked: !!rec?.unlocked,
        hidden: !!a.hidden,
      })
    }
  }
  return { steamid, name, achievements }
}

/** Manejador de /api/achievements — usado por Vite (dev) y server.js (prod). */
export async function handleAchievementsApi(searchParams) {
  const input = searchParams.get('profile') ?? searchParams.get('q') ?? ''
  const statsUrl = buildStatsUrl(input)
  if (!statsUrl) {
    return {
      status: 400,
      body: {
        error:
          'URL no válida. Ejemplos: https://steamcommunity.com/id/tu_usuario, https://steamcommunity.com/profiles/76561198... o solo tu SteamID64.',
      },
    }
  }

  const cached = responseCache.get(statsUrl)
  if (cached && Date.now() - cached.ts < TTL) {
    return { status: 200, body: cached.body }
  }

  let ssr
  try {
    ssr = await fetchSSR(statsUrl)
  } catch {
    return { status: 502, body: { error: 'No se pudo contactar con Steam. Intenta de nuevo.' } }
  }
  if (!ssr) {
    return { status: 404, body: { error: 'No se encontró el perfil de Steam (revisa la URL).' } }
  }

  const result = extractAchievements(ssr, diffsStatic)

  if (result.error === 'notfound') {
    return { status: 404, body: { error: 'No se encontró el perfil de Steam (revisa la URL).' } }
  }
  if (result.error === 'private') {
    return {
      status: 403,
      body: { error: 'Ese perfil es privado: Steam no muestra sus logros.' },
    }
  }

  responseCache.set(statsUrl, { ts: Date.now(), body: result })
  return { status: 200, body: result }
}
