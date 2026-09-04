import { Clock, Flame, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { Recipe } from '@/types'

interface RecipeCardProps {
  recipe: Recipe
  slotLabel?: string
  onViewRecipe: (recipe: Recipe) => void
}

export function RecipeCard({ recipe, slotLabel, onViewRecipe }: RecipeCardProps) {
  const availableCount = recipe.ingredients.filter((i) => i.available).length

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          {slotLabel && <Badge variant="amber">{slotLabel}</Badge>}
          <Badge variant="outline">{recipe.cuisine}</Badge>
        </div>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto space-y-3 pt-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
            {recipe.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {recipe.totalTimeMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}
          </span>
        </div>

        {availableCount > 0 && (
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            You have {availableCount} of {recipe.ingredients.length} ingredients
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full" variant="outline" onClick={() => onViewRecipe(recipe)}>
          View Recipe
        </Button>
      </CardContent>
    </Card>
  )
}
