import { CalendarDays, Zap } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'
import type { MealCount, MealSlot, PlanMode } from '@/types'

const MEAL_SLOTS: MealSlot[] = ['Pre-breakfast', 'Breakfast', 'Lunch', 'Evening Snack', 'Dinner']

interface PlanModeSelectorProps {
  planMode: PlanMode
  onPlanModeChange: (mode: PlanMode) => void
  mealCount: MealCount
  onMealCountChange: (count: MealCount) => void
  singleMealSlot: MealSlot
  onSingleMealSlotChange: (slot: MealSlot) => void
}

export function PlanModeSelector({
  planMode,
  onPlanModeChange,
  mealCount,
  onMealCountChange,
  singleMealSlot,
  onSingleMealSlotChange,
}: PlanModeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label>Plan mode</Label>
        <ToggleGroup
          type="single"
          value={planMode}
          onValueChange={(v) => v && onPlanModeChange(v as PlanMode)}
          className="grid grid-cols-2 gap-2"
          aria-label="Plan mode"
        >
          <ToggleGroupItem value="full-day" className="justify-center">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Full Day Plan
          </ToggleGroupItem>
          <ToggleGroupItem value="single-meal" className="justify-center">
            <Zap className="h-4 w-4" aria-hidden="true" />
            Single Meal
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {planMode === 'full-day' ? (
        <div className="space-y-1.5">
          <Label>Meals per day</Label>
          <ToggleGroup
            type="single"
            value={String(mealCount)}
            onValueChange={(v) => v && onMealCountChange(Number(v) as MealCount)}
            className="grid grid-cols-3 gap-2"
            aria-label="Number of meals"
          >
            <ToggleGroupItem value="3">3 meals</ToggleGroupItem>
            <ToggleGroupItem value="4">4 meals</ToggleGroupItem>
            <ToggleGroupItem value="5">5 meals</ToggleGroupItem>
          </ToggleGroup>
          <p className="text-xs text-muted-foreground">
            {mealCount === 3 && 'Breakfast · Lunch · Dinner'}
            {mealCount === 4 && 'Breakfast · Lunch · Evening Snack · Dinner'}
            {mealCount === 5 && 'Pre-breakfast · Breakfast · Lunch · Evening Snack · Dinner'}
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          <Label>Meal type</Label>
          <ToggleGroup
            type="single"
            value={singleMealSlot}
            onValueChange={(v) => v && onSingleMealSlotChange(v as MealSlot)}
            className="flex flex-wrap gap-2"
            aria-label="Meal type"
          >
            {MEAL_SLOTS.map((slot) => (
              <ToggleGroupItem key={slot} value={slot} className="text-xs sm:text-sm">
                {slot}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
    </div>
  )
}
