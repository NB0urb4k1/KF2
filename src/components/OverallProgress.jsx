export default function OverallProgress({ totalDone, totalAll, overallPct }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
          style={{ width: `${overallPct}%` }}
        />
      </div>
      <span className="w-24 text-right text-sm font-bold text-zinc-200">
        {totalDone}/{totalAll} <span className="text-zinc-500">({overallPct}%)</span>
      </span>
    </div>
  )
}
