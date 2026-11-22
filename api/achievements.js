// Función serverless de Vercel — GET /api/achievements?profile=<url o steamid>
import { handleAchievementsApi } from '../server/api-handler.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'Método no permitido.' }))
    return
  }
  const url = new URL(req.url, `http://${req.headers.host}`)
  const { status, body } = await handleAchievementsApi(url.searchParams)
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120')
  res.end(JSON.stringify(body))
}

export const config = { maxDuration: 30 }
