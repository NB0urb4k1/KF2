import { useId } from 'react'

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ProgressRing({ value }) {
  const gradientId = useId().replace(/:/g, '')
  const offset = CIRCUMFERENCE - (value / 100) * CIRCUMFERENCE

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuetext={`${value}% completado`}
      aria-label="Progreso total de logros"
      className="relative grid size-28 shrink-0 place-items-center sm:size-32"
    >
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-white/5"
        />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
        />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="font-display text-4xl leading-none font-bold tracking-tight text-white">
          {value}
          <span className="text-lg text-zinc-400">%</span>
        </span>
        <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
          completado
        </span>
      </div>
    </div>
  )
}

function MiniStat({ label, value, tone, title }) {
  return (
    <div
      title={title}
      className="flex flex-col-reverse rounded-lg border border-white/5 bg-white/[0.03] px-2 py-2"
    >
      <dt className="mt-1 text-[10px] font-medium tracking-wider text-zinc-400 uppercase">
        {label}
      </dt>
      <dd className={`font-display text-lg leading-none font-bold tabular-nums ${tone}`}>{value}</dd>
    </div>
  )
}

export default function OverallProgress({ totalDone, totalAll, overallPct, rarePending }) {
  const pending = totalAll - totalDone

  return (
    <section
      aria-labelledby="overall-progress-title"
      className="relative animate-fade-up overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-4 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-5"
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-16 size-48 rounded-full bg-red-600/15 blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-5 sm:flex-row">
        <ProgressRing value={overallPct} />

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2
            id="overall-progress-title"
            className="text-[11px] font-semibold tracking-[0.18em] text-red-400 uppercase"
          >
            Progreso total
          </h2>
          <p className="mt-1 font-display text-2xl font-semibold text-white">
            {totalDone}
            <span className="text-zinc-500"> / {totalAll}</span>
          </p>
          <p className="text-xs text-zinc-400">logros desbloqueados</p>

          <dl className="mt-4 grid grid-cols-3 gap-1.5 text-center">
            <MiniStat label="Hechos" value={totalDone} tone="text-emerald-300" />
            <MiniStat label="Pendientes" value={pending} tone="text-zinc-200" />
            <MiniStat
              label="Raros pend."
              value={rarePending}
              tone="text-purple-300"
              title="Logros con menos del 10% de jugadores que aún no has completado"
            />
          </dl>
        </div>
      </div>
    </section>
  )
}
