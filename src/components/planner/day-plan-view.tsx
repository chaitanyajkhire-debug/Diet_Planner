import { RecipeCard } from '@/components/planner/recipe-card'
import { MacroSummary } from '@/components/planner/macro-summary'
import type { DayPlan, Recipe } from '@/types'

interface DayPlanViewProps {
  plan: DayPlan
  onViewRecipe: (recipe: Recipe) => void
}

export function DayPlanView({ plan, onViewRecipe }: DayPlanViewProps) {
  return (
    <div className="space-y-5">
      <MacroSummary calories={plan.totalCalories} macros={plan.totalMacros} calorieGoal={plan.calorieGoal} />
      <div className="grid gap-4 sm:grid-cols-2">
        {plan.meals.map((meal) => (
          <RecipeCard key={meal.slot} recipe={meal.recipe} slotLabel={meal.slot} onViewRecipe={onViewRecipe} />
        ))}
      </div>
    </div>
  )
}
