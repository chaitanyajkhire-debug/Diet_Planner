import { generateDayPlan, generateSingleMealOptions } from '@/lib/generator'
import type { DayPlan, PlannerPreferences, Recipe } from '@/types'

/**
 * AI generation layer.
 *
 * When VITE_OPENAI_API_KEY or VITE_ANTHROPIC_API_KEY is set, this module will
 * attempt to call the respective API directly from the browser to produce a
 * richer, model-written plan. In a production deployment this call should go
 * through a backend/API route so the key is never shipped to the client —
 * this direct-call path exists only so the feature works end-to-end for local
 * prototyping. If no key is configured, or the call fails for any reason
 * (network, parsing, rate limit), we transparently fall back to the
 * deterministic mock generator so the app always produces a result.
 */

function getProvider(): 'openai' | 'anthropic' | 'mock' {
  const configured = import.meta.env.VITE_AI_PROVIDER
  if (configured) return configured
  if (import.meta.env.VITE_OPENAI_API_KEY) return 'openai'
  if (import.meta.env.VITE_ANTHROPIC_API_KEY) return 'anthropic'
  return 'mock'
}

function simulateLatency(min = 500, max = 1100): Promise<void> {
  const ms = Math.round(min + Math.random() * (max - min))
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildPrompt(prefs: PlannerPreferences, mode: 'day' | 'meal'): string {
  const base = `You are a nutritionist generating ${
    mode === 'day' ? 'a full day diet plan' : '3 quick single-meal recipe ideas'
  }.
Dietary type: ${prefs.dietType}
Cuisines: ${prefs.cuisines.join(', ') || 'any'}
Available ingredients: ${prefs.ingredients.join(', ') || 'none specified'}
Health goals: ${prefs.goals.join(', ') || 'balanced'}
Daily calorie goal: ${prefs.calorieGoal ?? 'not specified'}
${mode === 'day' ? `Meal slots: ${prefs.mealCount}` : `Meal slot: ${prefs.singleMealSlot}`}
Respond ONLY with strict JSON matching the app's Recipe schema.`
  return base
}

async function callOpenAI(prompt: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) return null
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.choices?.[0]?.message?.content ?? null
  } catch {
    return null
  }
}

async function callAnthropic(prompt: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) return null
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.content?.[0]?.text ?? null
  } catch {
    return null
  }
}

export async function generateDayPlanSmart(prefs: PlannerPreferences): Promise<DayPlan> {
  const provider = getProvider()

  if (provider !== 'mock') {
    const prompt = buildPrompt(prefs, 'day')
    const raw = provider === 'openai' ? await callOpenAI(prompt) : await callAnthropic(prompt)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (parsed?.meals) return parsed as DayPlan
      } catch {
        // fall through to mock
      }
    }
  }

  await simulateLatency()
  return generateDayPlan(prefs)
}

export async function generateSingleMealSmart(prefs: PlannerPreferences): Promise<Recipe[]> {
  const provider = getProvider()

  if (provider !== 'mock') {
    const prompt = buildPrompt(prefs, 'meal')
    const raw = provider === 'openai' ? await callOpenAI(prompt) : await callAnthropic(prompt)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) return parsed as Recipe[]
      } catch {
        // fall through to mock
      }
    }
  }

  await simulateLatency()
  return generateSingleMealOptions(prefs)
}

export function isUsingLiveAI(): boolean {
  return getProvider() !== 'mock'
}
