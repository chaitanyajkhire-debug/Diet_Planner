import { Flame } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const MIN_CALORIES = 1200
const MAX_CALORIES = 3500

interface CalorieInputProps {
  value: number | null
  onChange: (value: number | null) => void
}

export function CalorieInput({ value, onChange }: CalorieInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="calorie-goal" className="flex items-center gap-1.5">
        <Flame className="h-4 w-4 text-amber" aria-hidden="true" />
        Daily calorie goal <span className="font-normal text-muted-foreground">(optional)</span>
      </Label>
      <div className="relative">
        <Input
          id="calorie-goal"
          type="number"
          inputMode="numeric"
          min={MIN_CALORIES}
          max={MAX_CALORIES}
          step={50}
          placeholder={`${MIN_CALORIES}–${MAX_CALORIES} kcal`}
          value={value ?? ''}
          aria-describedby="calorie-goal-hint"
          onChange={(e) => {
            const raw = e.target.value
            if (raw === '') {
              onChange(null)
              return
            }
            const num = Number(raw)
            if (!Number.isNaN(num)) onChange(num)
          }}
          className="pr-14"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          kcal
        </span>
      </div>
      <p id="calorie-goal-hint" className="text-xs text-muted-foreground">
        Target range {MIN_CALORIES.toLocaleString()}–{MAX_CALORIES.toLocaleString()} kcal. Leave blank for a
        balanced default.
      </p>
    </div>
  )
}
