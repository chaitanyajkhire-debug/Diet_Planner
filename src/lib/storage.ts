import { ensureAnonymousSession, supabase } from '@/lib/supabase'
import type { DayPlan, PlannerPreferences } from '@/types'

const PREFS_KEY = 'nutriplan.preferences.v1'
const HISTORY_KEY = 'nutriplan.planHistory.v1'
const MAX_HISTORY = 10

// localStorage acts as an instant-read cache and offline fallback; Supabase
// (when configured) is the source of truth so plans/preferences follow the
// device across sessions even if the browser storage is cleared.

function loadPreferencesLocal(): PlannerPreferences | null {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    return raw ? (JSON.parse(raw) as PlannerPreferences) : null
  } catch {
    return null
  }
}

function savePreferencesLocal(prefs: PlannerPreferences): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {
    // storage unavailable (private mode, quota) — ignore silently
  }
}

function loadPlanHistoryLocal(): DayPlan[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? (JSON.parse(raw) as DayPlan[]) : []
  } catch {
    return []
  }
}

function savePlanHistoryLocal(history: DayPlan[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // ignore
  }
}

/** Synchronous best-effort read for initial render; Supabase syncs in afterwards. */
export function loadPreferences(): PlannerPreferences | null {
  return loadPreferencesLocal()
}

export async function loadPreferencesAsync(): Promise<PlannerPreferences | null> {
  const userId = await ensureAnonymousSession()
  if (!supabase || !userId) return loadPreferencesLocal()

  try {
    const { data, error } = await supabase
      .from('preferences')
      .select('data')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw error
    if (data?.data) {
      savePreferencesLocal(data.data as PlannerPreferences)
      return data.data as PlannerPreferences
    }
  } catch {
    // fall through to local cache
  }
  return loadPreferencesLocal()
}

export async function savePreferences(prefs: PlannerPreferences): Promise<void> {
  savePreferencesLocal(prefs)

  const userId = await ensureAnonymousSession()
  if (!supabase || !userId) return

  try {
    await supabase
      .from('preferences')
      .upsert({ user_id: userId, data: prefs, updated_at: new Date().toISOString() })
  } catch {
    // offline or RLS issue — local cache already has the latest value
  }
}

export async function loadPlanHistory(): Promise<DayPlan[]> {
  const userId = await ensureAnonymousSession()
  if (!supabase || !userId) return loadPlanHistoryLocal()

  try {
    const { data, error } = await supabase
      .from('day_plans')
      .select('data')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(MAX_HISTORY)
    if (error) throw error
    if (data) {
      const history = data.map((row) => row.data as DayPlan)
      savePlanHistoryLocal(history)
      return history
    }
  } catch {
    // fall through to local cache
  }
  return loadPlanHistoryLocal()
}

export async function savePlanToHistory(plan: DayPlan): Promise<void> {
  const nextLocal = [plan, ...loadPlanHistoryLocal()].slice(0, MAX_HISTORY)
  savePlanHistoryLocal(nextLocal)

  const userId = await ensureAnonymousSession()
  if (!supabase || !userId) return

  try {
    await supabase.from('day_plans').insert({ id: plan.id, user_id: userId, data: plan })
  } catch {
    // offline or RLS issue — local cache already has the latest value
  }
}
