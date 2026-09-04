export type DietType = 'vegetarian' | 'non-vegetarian'

export type Cuisine = 'Maharashtrian' | 'Indian' | 'Western' | 'Indo-Western'

export const CUISINES: Cuisine[] = ['Maharashtrian', 'Indian', 'Western', 'Indo-Western']

export type Goal =
  | 'Protein-Rich'
  | 'Low Sugar'
  | 'No Sugar'
  | 'Low Carbs'
  | 'Balanced'
  | 'High Fiber'

export const GOALS: Goal[] = [
  'Protein-Rich',
  'Low Sugar',
  'No Sugar',
  'Low Carbs',
  'Balanced',
  'High Fiber',
]

export type MealSlot = 'Pre-breakfast' | 'Breakfast' | 'Lunch' | 'Evening Snack' | 'Dinner'

export type MealCount = 3 | 4 | 5

export const MEAL_LAYOUTS: Record<MealCount, MealSlot[]> = {
  3: ['Breakfast', 'Lunch', 'Dinner'],
  4: ['Breakfast', 'Lunch', 'Evening Snack', 'Dinner'],
  5: ['Pre-breakfast', 'Breakfast', 'Lunch', 'Evening Snack', 'Dinner'],
}

export type PlanMode = 'full-day' | 'single-meal'

export interface Macros {
  protein: number
  carbs: number
  fats: number
}

export interface IngredientEntry {
  id: string
  english: string
  marathi?: string
  transliteration?: string
  aliases: string[]
  category: 'vegetable' | 'grain' | 'legume' | 'dairy' | 'protein' | 'spice' | 'fruit' | 'other'
  vegetarian: boolean
}

export interface RecipeIngredientLine {
  name: string
  quantity: string
  available: boolean
}

export interface RecipeStep {
  text: string
  minutes: number
}

export interface Recipe {
  id: string
  name: string
  description: string
  mealSlot?: MealSlot
  cuisine: Cuisine
  dietType: DietType
  calories: number
  macros: Macros
  servings: number
  totalTimeMinutes: number
  ingredients: RecipeIngredientLine[]
  steps: RecipeStep[]
  tags: Goal[]
}

export interface DayPlanMeal {
  slot: MealSlot
  recipe: Recipe
}

export interface DayPlan {
  id: string
  createdAt: string
  meals: DayPlanMeal[]
  totalCalories: number
  totalMacros: Macros
  calorieGoal?: number
}

export interface PlannerPreferences {
  calorieGoal: number | null
  dietType: DietType
  cuisines: Cuisine[]
  ingredients: string[]
  goals: Goal[]
  mealCount: MealCount
  planMode: PlanMode
  singleMealSlot: MealSlot
}

export const DEFAULT_PREFERENCES: PlannerPreferences = {
  calorieGoal: 2000,
  dietType: 'vegetarian',
  cuisines: ['Indian'],
  ingredients: [],
  goals: ['Balanced'],
  mealCount: 4,
  planMode: 'full-day',
  singleMealSlot: 'Lunch',
}
