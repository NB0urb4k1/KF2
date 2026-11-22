import { useId } from 'react'
import { ArrowRightIcon, SearchIcon, Spinner } from './icons.jsx'

export default function ProfileForm({ value, onChange, onSubmit, loading }) {
  // useId evita ids duplicados si el formulario se renderiza en más de un sitio.
  const inputId = useId()
  const helpId = useId()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      className="mt-6 w-full max-w-xl"
    >
      <label htmlFor={inputId} className="sr-only">
        URL del perfil de Steam
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="https://steamcommunity.com/id/tu-usuario"
            aria-describedby={helpId}
            autoComplete="off"
            spellCheck="false"
            required
            className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] pr-3 pl-10 text-sm text-zinc-100 shadow-sm shadow-black/20 outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-red-500/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-red-500/15"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !value.trim()}
          aria-busy={loading}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Spinner className="size-4" />
              Cargando…
            </>
          ) : (
            <>
              Cargar perfil
              <ArrowRightIcon className="size-4" />
            </>
          )}
        </button>
      </div>

      <p id={helpId} className="mt-2 text-xs leading-relaxed text-zinc-400">
        Acepta la URL de Steam, tu nombre personalizado o tu SteamID64. Tu progreso se guarda solo
        en este navegador.
      </p>
    </form>
  )
}
