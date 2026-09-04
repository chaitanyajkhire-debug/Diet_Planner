import { CheckCircle2, Circle, Clock, Flame, Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Recipe } from '@/types'

interface RecipeModalProps {
  recipe: Recipe | null
  onOpenChange: (open: boolean) => void
}

export function RecipeModal({ recipe, onOpenChange }: RecipeModalProps) {
  return (
    <Dialog open={!!recipe} onOpenChange={onOpenChange}>
      {recipe && (
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{recipe.cuisine}</Badge>
              <Badge variant="secondary" className="capitalize">
                {recipe.dietType}
              </Badge>
              {recipe.mealSlot && <Badge variant="amber">{recipe.mealSlot}</Badge>}
            </div>
            <DialogTitle>{recipe.name}</DialogTitle>
            <DialogDescription>{recipe.description}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-4 rounded-lg bg-secondary/60 px-4 py-3 text-sm">
            <span className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-amber" aria-hidden="true" />
              {recipe.calories} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {recipe.totalTimeMinutes} min
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" aria-hidden="true" />
              {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg border border-border py-2">
              <p className="font-semibold">{recipe.macros.protein}g</p>
              <p className="text-muted-foreground">Protein</p>
            </div>
            <div className="rounded-lg border border-border py-2">
              <p className="font-semibold">{recipe.macros.carbs}g</p>
              <p className="text-muted-foreground">Carbs</p>
            </div>
            <div className="rounded-lg border border-border py-2">
              <p className="font-semibold">{recipe.macros.fats}g</p>
              <p className="text-muted-foreground">Fats</p>
            </div>
          </div>

          <section aria-labelledby="ingredients-heading">
            <h4 id="ingredients-heading" className="mb-2 text-sm font-semibold">
              Ingredients
            </h4>
            <ul className="space-y-1.5">
              {recipe.ingredients.map((ing) => (
                <li key={ing.name} className="flex items-start gap-2 text-sm">
                  {ing.available ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden="true" />
                  )}
                  <span className={cn(ing.available && 'font-medium text-emerald-700 dark:text-emerald-400')}>
                    {ing.name}
                    <span className="text-muted-foreground"> — {ing.quantity}</span>
                    {ing.available && <span className="ml-1.5 text-xs">(you have this)</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="steps-heading">
            <h4 id="steps-heading" className="mb-2 text-sm font-semibold">
              Instructions
            </h4>
            <ol className="space-y-3">
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">
                    {step.text}
                    <span className="ml-1.5 whitespace-nowrap text-xs text-muted-foreground">
                      (~{step.minutes} min)
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}
