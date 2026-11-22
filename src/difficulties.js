// Dificultades del juego y su estilo visual (badge, barra, punto)
export const DIFFICULTIES = ['Normal', 'Hard', 'Suicidal', 'Hell on Earth', 'Otros']

export const DIFF_META = {
  Normal: { label: 'Normal', badge: 'bg-sky-500/15 text-sky-300 ring-sky-500/40', bar: 'bg-sky-500', dot: 'bg-sky-400' },
  Hard: { label: 'Difícil', badge: 'bg-amber-500/15 text-amber-300 ring-amber-500/40', bar: 'bg-amber-500', dot: 'bg-amber-400' },
  Suicidal: { label: 'Suicida', badge: 'bg-orange-500/15 text-orange-300 ring-orange-500/40', bar: 'bg-orange-500', dot: 'bg-orange-400' },
  'Hell on Earth': { label: 'Infierno en la Tierra', badge: 'bg-red-500/15 text-red-300 ring-red-500/40', bar: 'bg-red-500', dot: 'bg-red-400' },
  Otros: { label: 'Otros', badge: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/40', bar: 'bg-zinc-500', dot: 'bg-zinc-400' },
}
