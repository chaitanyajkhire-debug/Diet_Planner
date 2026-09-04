import type { DayPlan, PlannerPreferences } from '@/types'

const PREFS_KEY = 'nutriplan.preferences.v1'
const HISTORY_KEY = 'nutriplan.planHistory.v1'
const MAX_HISTORY = 10

export function loadPreferences(): PlannerPreferences | null {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    return raw ? (JSON.parse(raw) as PlannerPreferences) : null
  } catch {
    return null
  }
}

export function savePreferences(prefs: PlannerPreferences): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {
    // storage unavailable (private mode, quota) — ignore silently
  }
}

export function loadPlanHistory(): DayPlan[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? (JSON.parse(raw) as DayPlan[]) : []
  } catch {
    return []
  }
}

export function savePlanToHistory(plan: DayPlan): void {
  try {
    const history = loadPlanHistory()
    const next = [plan, ...history].slice(0, MAX_HISTORY)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
}
