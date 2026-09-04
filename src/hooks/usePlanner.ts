import { useCallback, useEffect, useState } from 'react'
import { generateDayPlanSmart, generateSingleMealSmart } from '@/lib/ai'
import { loadPreferences, savePlanToHistory, savePreferences } from '@/lib/storage'
import { DEFAULT_PREFERENCES } from '@/types'
import type { DayPlan, PlannerPreferences, Recipe } from '@/types'

export function usePlanner() {
  const [preferences, setPreferences] = useState<PlannerPreferences>(
    () => loadPreferences() ?? DEFAULT_PREFERENCES,
  )
  const [dayPlan, setDayPlan] = useState<DayPlan | null>(null)
  const [singleMealOptions, setSingleMealOptions] = useState<Recipe[] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  useEffect(() => {
    savePreferences(preferences)
  }, [preferences])

  const updatePreferences = useCallback((patch: Partial<PlannerPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...patch }))
  }, [])

  const generate = useCallback(async () => {
    setIsGenerating(true)
    setError(null)
    try {
      if (preferences.planMode === 'full-day') {
        const plan = await generateDayPlanSmart(preferences)
        setDayPlan(plan)
        setSingleMealOptions(null)
        savePlanToHistory(plan)
      } else {
        const options = await generateSingleMealSmart(preferences)
        setSingleMealOptions(options)
        setDayPlan(null)
      }
      setHasGenerated(true)
    } catch {
      setError('Something went wrong while generating your plan. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }, [preferences])

  return {
    preferences,
    updatePreferences,
    dayPlan,
    singleMealOptions,
    isGenerating,
    error,
    hasGenerated,
    generate,
  }
}
