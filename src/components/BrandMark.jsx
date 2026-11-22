import { FlameIcon } from './icons.jsx'

// Marca de la app: llama sobre un degradado rojo, con un brillo sutil.
export default function BrandMark({ className = 'size-10' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid ${className} shrink-0 place-items-center overflow-hidden rounded-xl bg-linear-to-br from-red-500 via-red-600 to-red-800 text-white shadow-lg shadow-red-950/50 ring-1 ring-white/15`}
    >
      <span className="absolute inset-0 bg-linear-to-br from-white/25 via-transparent to-transparent" />
      <FlameIcon className="relative size-[55%]" strokeWidth={2} />
    </span>
  )
}
