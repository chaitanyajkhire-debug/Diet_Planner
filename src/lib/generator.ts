import { RECIPE_TEMPLATES, type RecipeTemplate } from '@/lib/recipes'
import { INGREDIENT_MAP } from '@/lib/ingredients'
import { uid } from '@/lib/utils'
import type {
  DayPlan,
  DayPlanMeal,
  Macros,
  MealSlot,
  PlannerPreferences,
  Recipe,
  RecipeIngredientLine,
} from '@/types'
import { MEAL_LAYOUTS } from '@/types'

const SLOT_CALORIE_SHARE: Record<MealSlot, number> = {
  'Pre-breakfast': 0.08,
  Breakfast: 0.22,
  Lunch: 0.32,
  'Evening Snack': 0.12,
  Dinner: 0.26,
}

function normalize(text: string): string {
  return text.toLowerCase().trim()
}

/** Checks whether a user-provided ingredient tag matches a template ingredient line. */
function ingredientMatches(userTag: string, line: { name: string; ingredientId?: string }): boolean {
  const tag = normalize(userTag)
  if (line.ingredientId) {
    const entry = INGREDIENT_MAP.get(line.ingredientId)
    if (entry) {
      const haystacks = [entry.english, entry.marathi, entry.transliteration, ...entry.aliases].filter(Boolean)
      if (haystacks.some((h) => normalize(h!).includes(tag) || tag.includes(normalize(h!)))) return true
    }
  }
  return normalize(line.name).includes(tag) || tag.includes(normalize(line.name))
}

function scoreTemplate(template: RecipeTemplate, prefs: PlannerPreferences, slot?: MealSlot): number {
  let score = 0

  if (prefs.cuisines.length > 0) {
    score += prefs.cuisines.includes(template.cuisine) ? 6 : -3
  }

  if (slot) {
    score += template.suitableSlots.includes(slot) ? 5 : -6
  }

  const matchedGoals = template.tags.filter((t) => prefs.goals.includes(t)).length
  score += matchedGoals * 3

  const availableCount = prefs.ingredients.filter((tag) =>
    template.ingredients.some((line) => ingredientMatches(tag, line)),
  ).length
  score += availableCount * 4

  // small deterministic jitter so repeated generations vary, based on id hash
  score += (hashString(template.id) % 5) * 0.3

  return score
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

function scaleFactor(template: RecipeTemplate, targetCalories: number | null): number {
  if (!targetCalories) return 1
  const raw = targetCalories / template.baseCalories
  return Math.min(1.6, Math.max(0.6, raw))
}

function scaleMacros(macros: Macros, factor: number): Macros {
  return {
    protein: Math.round(macros.protein * factor),
    carbs: Math.round(macros.carbs * factor),
    fats: Math.round(macros.fats * factor),
  }
}

function buildIngredientLines(template: RecipeTemplate, prefs: PlannerPreferences): RecipeIngredientLine[] {
  return template.ingredients.map((line) => ({
    name: line.name,
    quantity: line.quantity,
    available: prefs.ingredients.some((tag) => ingredientMatches(tag, line)),
  }))
}

function templateToRecipe(
  template: RecipeTemplate,
  prefs: PlannerPreferences,
  targetCalories: number | null,
  slot?: MealSlot,
): Recipe {
  const factor = scaleFactor(template, targetCalories)
  return {
    id: uid('recipe'),
    name: template.name,
    description: template.description,
    mealSlot: slot,
    cuisine: template.cuisine,
    dietType: template.dietType,
    calories: Math.round(template.baseCalories * factor),
    macros: scaleMacros(template.macros, factor),
    servings: template.servings,
    totalTimeMinutes: template.totalTimeMinutes,
    ingredients: buildIngredientLines(template, prefs),
    steps: template.steps,
    tags: template.tags,
  }
}

function candidatesFor(prefs: PlannerPreferences, slot?: MealSlot): RecipeTemplate[] {
  const dietFiltered = RECIPE_TEMPLATES.filter((t) =>
    prefs.dietType === 'vegetarian' ? t.dietType === 'vegetarian' : true,
  )
  return [...dietFiltered].sort((a, b) => scoreTemplate(b, prefs, slot) - scoreTemplate(a, prefs, slot))
}

export function generateDayPlan(prefs: PlannerPreferences): DayPlan {
  const slots = MEAL_LAYOUTS[prefs.mealCount]
  const calorieGoal = prefs.calorieGoal ?? 2000
  const usedIds = new Set<string>()

  const meals: DayPlanMeal[] = slots.map((slot) => {
    const pool = candidatesFor(prefs, slot).filter((t) => !usedIds.has(t.id))
    const chosen = pool[0] ?? candidatesFor(prefs, slot)[0]
    usedIds.add(chosen.id)
    const targetForSlot = calorieGoal * SLOT_CALORIE_SHARE[slot]
    const recipe = templateToRecipe(chosen, prefs, targetForSlot, slot)
    return { slot, recipe }
  })

  const totalCalories = meals.reduce((sum, m) => sum + m.recipe.calories, 0)
  const totalMacros = meals.reduce<Macros>(
    (sum, m) => ({
      protein: sum.protein + m.recipe.macros.protein,
      carbs: sum.carbs + m.recipe.macros.carbs,
      fats: sum.fats + m.recipe.macros.fats,
    }),
    { protein: 0, carbs: 0, fats: 0 },
  )

  return {
    id: uid('plan'),
    createdAt: new Date().toISOString(),
    meals,
    totalCalories,
    totalMacros,
    calorieGoal: prefs.calorieGoal ?? undefined,
  }
}

export function generateSingleMealOptions(prefs: PlannerPreferences, count = 3): Recipe[] {
  const slot = prefs.singleMealSlot
  const pool = candidatesFor(prefs, slot)
  const picks: RecipeTemplate[] = []
  for (const t of pool) {
    if (picks.length >= count) break
    if (!picks.find((p) => p.cuisine === t.cuisine && p.name === t.name)) picks.push(t)
  }
  // Fallback: if fewer than requested matched strictly, pad with best remaining regardless of slot
  if (picks.length < count) {
    const fallbackPool = candidatesFor(prefs)
    for (const t of fallbackPool) {
      if (picks.length >= count) break
      if (!picks.includes(t)) picks.push(t)
    }
  }

  const calorieGoal = prefs.calorieGoal ?? 2000
  const targetForSlot = calorieGoal * SLOT_CALORIE_SHARE[slot]

  return picks.slice(0, count).map((t) => templateToRecipe(t, prefs, targetForSlot, slot))
}
