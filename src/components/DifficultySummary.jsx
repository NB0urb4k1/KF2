import DifficultyChip from './DifficultyChip.jsx'
import { DIFFICULTIES } from '../difficulties.js'

export default function DifficultySummary({ byDiff, activeDiff, onToggleDiff }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {DIFFICULTIES.map((d) => {
        const { done, total } = byDiff[d]
        const pct = total ? Math.round((done / total) * 100) : 0
        return (
          <DifficultyChip
            key={d}
            difficulty={d}
            done={done}
            total={total}
            pct={pct}
            isActive={activeDiff === d}
            onToggle={onToggleDiff}
          />
        )
      })}
    </div>
  )
}
