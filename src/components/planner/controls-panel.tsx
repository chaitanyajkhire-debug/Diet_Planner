import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CalorieInput } from '@/components/planner/calorie-input'
import { DietToggle } from '@/components/planner/diet-toggle'
import { CuisineSelect } from '@/components/planner/cuisine-select'
import { IngredientSearch } from '@/components/planner/ingredient-search'
import { GoalsChips } from '@/components/planner/goals-chips'
import { PlanModeSelector } from '@/components/planner/plan-mode-selector'
import type { PlannerPreferences } from '@/types'

interface ControlsPanelProps {
  preferences: PlannerPreferences
  onChange: (patch: Partial<PlannerPreferences>) => void
  onGenerate: () => void
  isGenerating: boolean
}

export function ControlsPanel({ preferences, onChange, onGenerate, isGenerating }: ControlsPanelProps) {
  return (
    <div className="space-y-6">
      <CalorieInput value={preferences.calorieGoal} onChange={(calorieGoal) => onChange({ calorieGoal })} />

      <DietToggle value={preferences.dietType} onChange={(dietType) => onChange({ dietType })} />

      <CuisineSelect value={preferences.cuisines} onChange={(cuisines) => onChange({ cuisines })} />

      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="ingredient-search-input">
          Ingredients on hand
        </label>
        <IngredientSearch
          value={preferences.ingredients}
          onChange={(ingredients) => onChange({ ingredients })}
          dietType={preferences.dietType}
        />
      </div>

      <GoalsChips value={preferences.goals} onChange={(goals) => onChange({ goals })} />

      <PlanModeSelector
        planMode={preferences.planMode}
        onPlanModeChange={(planMode) => onChange({ planMode })}
        mealCount={preferences.mealCount}
        onMealCountChange={(mealCount) => onChange({ mealCount })}
        singleMealSlot={preferences.singleMealSlot}
        onSingleMealSlotChange={(singleMealSlot) => onChange({ singleMealSlot })}
      />

      <Button size="lg" className="w-full" onClick={onGenerate} disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {preferences.planMode === 'full-day' ? 'Generate Day Plan' : 'Generate Recipe Ideas'}
          </>
        )}
      </Button>
    </div>
  )
}
