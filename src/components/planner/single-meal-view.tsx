import { RecipeCard } from '@/components/planner/recipe-card'
import type { Recipe } from '@/types'

interface SingleMealViewProps {
  recipes: Recipe[]
  onViewRecipe: (recipe: Recipe) => void
}

export function SingleMealView({ recipes, onViewRecipe }: SingleMealViewProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {recipes.length} quick dish ideas based on what you have on hand.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onViewRecipe={onViewRecipe} />
        ))}
      </div>
    </div>
  )
}
