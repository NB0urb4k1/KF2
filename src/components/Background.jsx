// Fondo decorativo global: rejilla industrial, grano y halos rojos.
// Es puramente visual, así que queda fuera del árbol de accesibilidad.
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-zinc-950"
    >
      <div className="absolute inset-0 bg-grid mask-fade-edges opacity-40" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
      <div className="absolute -top-48 left-1/2 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute -right-40 -bottom-48 size-[30rem] rounded-full bg-orange-600/[0.07] blur-[120px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent" />
    </div>
  )
}
