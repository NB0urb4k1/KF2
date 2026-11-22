export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-white/5 px-4 py-8 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-center text-[11px] text-zinc-400 sm:flex-row sm:text-left">
        <p>Hecho para cazadores de Zeds. Datos de logros obtenidos de Steam.</p>
        <p>
          Tu progreso manual se guarda en <span className="text-zinc-400">localStorage</span>, por
          perfil de Steam.
        </p>
      </div>
    </footer>
  )
}
