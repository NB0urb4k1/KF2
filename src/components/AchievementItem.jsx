import { useCallback } from 'react'
import { DIFF_META } from '../difficulties.js'
import {
  CheckIcon,
  CircleCheckIcon,
  GemIcon,
  TrophyIcon,
  UsersIcon,
} from './icons.jsx'

const percentFormatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })

export default function AchievementItem({ achievement, done, onToggle }) {
  // Extraído del map() de AchievementList: useCallback se llama en el nivel
  // superior de este componente (patrón recomendado en React).
  const handleToggle = useCallback(() => onToggle(achievement.id), [achievement.id, onToggle])

  const meta = DIFF_META[achievement.diff] ?? DIFF_META.Otros
  const isRare = achievement.pct != null && achievement.pct < 10

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={done}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-xl border p-4 text-left transition duration-200 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:outline-none motion-safe:hover:-translate-y-0.5 ${
        done
          ? 'border-emerald-500/25 bg-emerald-500/[0.06] hover:border-emerald-400/40'
          : 'border-white/10 bg-zinc-900/50 hover:border-white/20 hover:bg-zinc-900/80'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${
          done
            ? 'from-transparent via-emerald-400/60 to-transparent'
            : 'from-transparent via-white/10 to-transparent'
        }`}
      />

      <span className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border transition ${
            done
              ? 'border-emerald-400/40 bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-950/40'
              : 'border-white/10 bg-white/5 text-zinc-500 group-hover:border-red-500/40 group-hover:text-red-300'
          }`}
        >
          {done ? (
            <CheckIcon className="size-4" strokeWidth={3} />
          ) : (
            <TrophyIcon className="size-4" />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block text-sm leading-snug font-semibold ${
              done ? 'text-emerald-50' : 'text-zinc-100'
            }`}
          >
            {achievement.name}
          </span>

          <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
            {achievement.desc || 'Sin descripción disponible.'}
          </span>

          <span className="mt-3 flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ring-1 ${meta.badge}`}
            >
              <span aria-hidden="true" className={`size-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </span>

            {achievement.unlocked && (
              <span
                title="Steam marca este logro como desbloqueado"
                className="inline-flex items-center gap-1 rounded-md bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300 ring-1 ring-sky-500/25"
              >
                <CircleCheckIcon className="size-2.5" />
                <span className="sr-only">desbloqueado en</span>
                Steam
              </span>
            )}

            {isRare && !done && (
              <span
                title="Menos del 10% de los jugadores lo ha desbloqueado"
                className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-bold text-purple-300 ring-1 ring-purple-500/30"
              >
                <GemIcon className="size-2.5" />
                Raro
              </span>
            )}

            {achievement.pct != null && (
              <span
                title="Porcentaje global de jugadores que lo ha desbloqueado"
                className="ml-auto inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 tabular-nums"
              >
                <UsersIcon className="size-3" />
                {percentFormatter.format(achievement.pct)}%
                <span className="sr-only"> de los jugadores</span>
              </span>
            )}
          </span>
        </span>
      </span>
    </button>
  )
}
