import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null

let sessionPromise: Promise<string | null> | null = null

/**
 * Ensures an anonymous Supabase auth session exists for this browser and
 * returns its user id. No email/password/login UI is ever shown — Supabase
 * issues a session tied to this device, which RLS policies use to keep each
 * device's preferences and plan history private. Returns null when Supabase
 * isn't configured (no env vars) so callers can fall back to localStorage.
 */
export function ensureAnonymousSession(): Promise<string | null> {
  if (!supabase) return Promise.resolve(null)
  if (sessionPromise) return sessionPromise

  sessionPromise = (async () => {
    try {
      const { data: existing } = await supabase.auth.getSession()
      if (existing.session?.user.id) return existing.session.user.id

      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) throw error
      return data.user?.id ?? null
    } catch {
      return null
    }
  })()

  return sessionPromise
}

export function isSupabaseConfigured(): boolean {
  return supabase !== null
}
