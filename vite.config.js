import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleAchievementsApi } from './server/api-handler.js'

// Endpoint /api/achievements en el servidor de desarrollo de Vite
function achievementsApiPlugin() {
  return {
    name: 'kf2-achievements-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/achievements')) return next()
        try {
          const url = new URL(req.url, 'http://localhost')
          const { status, body } = await handleAchievementsApi(url.searchParams)
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(body))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'Error interno del servidor.' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), achievementsApiPlugin()],
})
