import type { Macros } from '@/types'

interface MacroSummaryProps {
  calories: number
  macros: Macros
  calorieGoal?: number
}

const MACRO_META = [
  { key: 'protein' as const, label: 'Protein', color: 'bg-emerald-500', caloriesPerGram: 4 },
  { key: 'carbs' as const, label: 'Carbs', color: 'bg-amber-500', caloriesPerGram: 4 },
  { key: 'fats' as const, label: 'Fats', color: 'bg-sky-500', caloriesPerGram: 9 },
]

export function MacroSummary({ calories, macros, calorieGoal }: MacroSummaryProps) {
  const macroCalories = MACRO_META.map((m) => macros[m.key] * m.caloriesPerGram)
  const totalMacroCalories = macroCalories.reduce((a, b) => a + b, 0) || 1

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-2xl font-bold tabular-nums">{calories.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            kcal{calorieGoal ? ` of ${calorieGoal.toLocaleString()} goal` : ' total'}
          </p>
        </div>
        {calorieGoal && (
          <p className="text-xs font-medium text-muted-foreground">
            {Math.round((calories / calorieGoal) * 100)}%
          </p>
        )}
      </div>

      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted" role="img" aria-label="Macro breakdown">
        {MACRO_META.map((m, i) => (
          <div
            key={m.key}
            className={m.color}
            style={{ width: `${(macroCalories[i] / totalMacroCalories) * 100}%` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {MACRO_META.map((m) => (
          <div key={m.key}>
            <div className="flex items-center justify-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${m.color}`} aria-hidden="true" />
              <span className="text-xs text-muted-foreground">{m.label}</span>
            </div>
            <p className="text-sm font-semibold tabular-nums">{macros[m.key]}g</p>
          </div>
        ))}
      </div>
    </div>
  )
}
