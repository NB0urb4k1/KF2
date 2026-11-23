import { useCallback } from 'react'
import { DIFF_META } from '../difficulties.js'
import { BoltIcon, CheckIcon, TrophyIcon } from './icons.jsx'

const percentFormatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })

function ComboAchievementRow({ achievement, done, onToggle, compact = false }) {
  // Extraído del map() de ComboCard: useCallback se llama en el nivel superior
  // de este componente (mismo patrón que AchievementItem).
  const handleToggle = useCallback(() => onToggle(achievement.id), [achievement.id, onToggle])

  return (
    <li>
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={done}
        className={`group flex w-full items-start gap-2.5 text-left transition focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-inset focus-visible:outline-none ${
          compact ? 'px-4 py-2' : 'px-4 py-3'
        } ${
          done
            ? 'bg-emerald-500/[0.04] hover:bg-emerald-500/[0.07]'
            : 'hover:bg-white/[0.03]'
        }`}
      >
        <span
          aria-hidden="true"
          className={`mt-0.5 grid shrink-0 place-items-center rounded border transition ${
            compact ? 'size-5' : 'size-6'
          } ${
            done
              ? 'border-emerald-400/40 bg-emerald-500 text-zinc-950'
              : 'border-white/15 bg-white/5 text-zinc-500 group-hover:border-red-500/40 group-hover:text-red-300'
          }`}
        >
          {done ? (
            <CheckIcon className={compact ? 'size-3' : 'size-3.5'} strokeWidth={3} />
          ) : (
            <TrophyIcon className={compact ? 'size-3' : 'size-3.5'} />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block leading-snug font-medium ${
              compact ? 'text-[11px]' : 'text-xs'
            } ${done ? 'text-emerald-50/90' : 'text-zinc-100'}`}
          >
            {achievement.name}
          </span>
          <span
            className={`mt-0.5 block leading-relaxed ${
              compact ? 'text-[10px]' : 'text-[11px]'
            } ${done ? 'text-zinc-500' : 'text-zinc-400'}`}
          >
            {achievement.desc || 'Sin descripción disponible.'}
          </span>
        </span>

        {achievement.pct != null && (
          <span
            title="Porcentaje global de jugadores que lo ha desbloqueado"
            className="mt-0.5 shrink-0 text-[10px] font-medium text-zinc-500 tabular-nums"
          >
            {percentFormatter.format(achievement.pct)}%
          </span>
        )}
      </button>
    </li>
  )
}

export default function ComboCard({ combo, completed, onToggle }) {
  const meta = DIFF_META[combo.runDifficulty] ?? DIFF_META.Otros
  const total = combo.achievements.length
  const done = combo.achievements.reduce(
    (count, achievement) => count + (completed.has(achievement.id) ? 1 : 0),
    0,
  )
  const pct = total ? Math.round((done / total) * 100) : 0
  const isComplete = done === total
  const hasBonus = combo.bonusAchievements.length > 0

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-lg shadow-black/20 transition ${
        isComplete
          ? 'border-emerald-500/25 bg-emerald-500/[0.03]'
          : 'border-white/10 bg-zinc-900/50'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${
          isComplete
            ? 'from-transparent via-emerald-400/60 to-transparent'
            : 'from-transparent via-white/10 to-transparent'
        }`}
      />

      <header className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={`grid size-9 shrink-0 place-items-center rounded-lg border ${
              isComplete
                ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                : 'border-red-500/30 bg-red-500/10 text-red-300'
            }`}
          >
            <BoltIcon className="size-4" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="font-display text-lg leading-tight font-semibold text-white">
                {combo.map}
              </h3>
              <span className="inline-flex items-center rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-300 ring-1 ring-white/10">
                {combo.mode}
              </span>
              {isComplete && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-500/25">
                  Combo listo
                </span>
              )}
            </div>

            <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
              Completa el mapa en{' '}
              <strong className="font-semibold text-zinc-200">{meta.label}</strong> y caen{' '}
              <strong className="font-semibold text-zinc-200">{total} logros</strong> en una sola
              partida.
            </p>
          </div>

          <span
            title={`Dificultad recomendada para el combo: ${meta.label}`}
            className={`inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ring-1 ${meta.badge}`}
          >
            <span aria-hidden="true" className={`size-1.5 rounded-full ${meta.dot}`} />
            {meta.shortLabel ?? meta.label}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            aria-label={`Progreso del combo ${combo.map} en ${combo.mode}`}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5"
          >
            <span
              className={`block h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none ${
                isComplete ? 'bg-linear-to-r from-emerald-600 to-emerald-400' : meta.bar
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="shrink-0 text-[10px] font-semibold text-zinc-400 tabular-nums">
            {done}/{total}
          </span>
        </div>
      </header>

      <ul className="divide-y divide-white/5 border-t border-white/5">
        {combo.achievements.map((achievement) => (
          <ComboAchievementRow
            key={achievement.id}
            achievement={achievement}
            done={completed.has(achievement.id)}
            onToggle={onToggle}
          />
        ))}
      </ul>

      {hasBonus && (
        <div className="mt-auto border-t border-white/5 bg-white/[0.02]">
          <p
            title="Se pueden hacer durante la misma partida, pero no son obligatorios para completar el combo"
            className="px-4 pt-3 text-[10px] font-semibold tracking-[0.14em] text-zinc-500 uppercase"
          >
            Bonus en la misma partida
          </p>
          <ul className="pb-1">
            {combo.bonusAchievements.map((achievement) => (
              <ComboAchievementRow
                key={achievement.id}
                achievement={achievement}
                done={completed.has(achievement.id)}
                onToggle={onToggle}
                compact
              />
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
