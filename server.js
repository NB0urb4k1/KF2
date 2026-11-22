// Servidor de producción: sirve dist/ + la API /api/achievements
import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleAchievementsApi } from './server/api-handler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')
const PORT = process.env.PORT || 3000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.map': 'application/json',
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`)

    if (url.pathname === '/api/achievements') {
      const { status, body } = await handleAchievementsApi(url.searchParams)
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.end(JSON.stringify(body))
      return
    }

    // Archivos estáticos
    let filePath = path.join(DIST, decodeURIComponent(url.pathname))
    if (!filePath.startsWith(DIST)) {
      res.statusCode = 403
      res.end('Forbidden')
      return
    }
    try {
      const info = await stat(filePath)
      if (info.isDirectory()) filePath = path.join(filePath, 'index.html')
    } catch {
      filePath = path.join(DIST, 'index.html') // SPA fallback
    }
    const data = await readFile(filePath)
    res.statusCode = 200
    res.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream')
    res.end(data)
  } catch {
    res.statusCode = 500
    res.end('Error interno')
  }
})

server.listen(PORT, () => {
  console.log(`KF2 tracker corriendo en http://localhost:${PORT}`)
})
