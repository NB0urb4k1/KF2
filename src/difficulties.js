// Dificultades del juego y su estilo visual (badge, barra, punto).
// "Todas" no es una dificultad real: se usa en la tarjeta-resumen del filtro.
export const DIFFICULTIES = ['Normal', 'Hard', 'Suicidal', 'Hell on Earth', 'Otros']

export const DIFF_META = {
  Todas: {
    label: 'Todas',
    badge: 'bg-red-500/10 text-red-300 ring-red-500/30',
    bar: 'bg-linear-to-r from-red-600 via-orange-500 to-amber-400',
    dot: 'bg-red-400',
  },
  Normal: {
    label: 'Normal',
    badge: 'bg-sky-500/10 text-sky-300 ring-sky-500/30',
    bar: 'bg-linear-to-r from-sky-600 to-sky-400',
    dot: 'bg-sky-400',
  },
  Hard: {
    label: 'Difícil',
    badge: 'bg-amber-500/10 text-amber-300 ring-amber-500/30',
    bar: 'bg-linear-to-r from-amber-600 to-amber-400',
    dot: 'bg-amber-400',
  },
  Suicidal: {
    label: 'Suicida',
    badge: 'bg-orange-500/10 text-orange-300 ring-orange-500/30',
    bar: 'bg-linear-to-r from-orange-600 to-orange-400',
    dot: 'bg-orange-400',
  },
  'Hell on Earth': {
    label: 'Infierno en la Tierra',
    shortLabel: 'Infierno',
    badge: 'bg-red-500/10 text-red-300 ring-red-500/30',
    bar: 'bg-linear-to-r from-red-600 to-red-400',
    dot: 'bg-red-400',
  },
  Otros: {
    label: 'Otros',
    badge: 'bg-zinc-500/10 text-zinc-300 ring-zinc-500/30',
    bar: 'bg-linear-to-r from-zinc-600 to-zinc-400',
    dot: 'bg-zinc-400',
  },
}
