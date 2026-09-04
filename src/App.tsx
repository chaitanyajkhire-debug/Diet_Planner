import { useEffect, useState } from 'react'
import { ListChecks, SlidersHorizontal } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Header } from '@/components/planner/header'
import { ControlsPanel } from '@/components/planner/controls-panel'
import { DayPlanView } from '@/components/planner/day-plan-view'
import { SingleMealView } from '@/components/planner/single-meal-view'
import { ResultsSkeleton } from '@/components/planner/results-skeleton'
import { EmptyState } from '@/components/planner/empty-state'
import { RecipeModal } from '@/components/planner/recipe-modal'
import { useTheme } from '@/hooks/useTheme'
import { usePlanner } from '@/hooks/usePlanner'
import { cn } from '@/lib/utils'
import type { Recipe } from '@/types'

type MobileView = 'controls' | 'results'

function App() {
  const { theme, toggleTheme } = useTheme()
  const {
    preferences,
    updatePreferences,
    dayPlan,
    singleMealOptions,
    isGenerating,
    error,
    hasGenerated,
    generate,
  } = usePlanner()

  const [mobileView, setMobileView] = useState<MobileView>('controls')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    if (!isGenerating && hasGenerated) setMobileView('results')
  }, [isGenerating, hasGenerated])

  async function handleGenerate() {
    setMobileView('results')
    await generate()
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-dvh bg-background">
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <main className="container py-6 pb-24 md:pb-10">
          <div className="grid gap-6 md:grid-cols-[380px_1fr] md:items-start lg:grid-cols-[420px_1fr]">
            <div className={cn('md:block', mobileView === 'controls' ? 'block' : 'hidden')}>
              <Card className="md:sticky md:top-24">
                <CardHeader>
                  <CardTitle>Build your plan</CardTitle>
                  <CardDescription>
                    Tell us your goals, cuisine and what&apos;s in your kitchen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ControlsPanel
                    preferences={preferences}
                    onChange={updatePreferences}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                  />
                </CardContent>
              </Card>
            </div>

            <div
              className={cn('md:block', mobileView === 'results' ? 'block' : 'hidden')}
              aria-live="polite"
            >
              {error && (
                <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {isGenerating && <ResultsSkeleton count={preferences.planMode === 'full-day' ? 4 : 3} />}

              {!isGenerating && dayPlan && (
                <DayPlanView plan={dayPlan} onViewRecipe={setSelectedRecipe} />
              )}

              {!isGenerating && singleMealOptions && (
                <SingleMealView recipes={singleMealOptions} onViewRecipe={setSelectedRecipe} />
              )}

              {!isGenerating && !dayPlan && !singleMealOptions && <EmptyState />}
            </div>
          </div>
        </main>

        <nav
          className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-card/95 backdrop-blur-md md:hidden"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            onClick={() => setMobileView('controls')}
            aria-current={mobileView === 'controls'}
            className={cn(
              'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors',
              mobileView === 'controls' ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
            Preferences
          </button>
          <button
            type="button"
            onClick={() => setMobileView('results')}
            aria-current={mobileView === 'results'}
            className={cn(
              'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors',
              mobileView === 'results' ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <ListChecks className="h-5 w-5" aria-hidden="true" />
            Results
          </button>
        </nav>

        <RecipeModal recipe={selectedRecipe} onOpenChange={(open) => !open && setSelectedRecipe(null)} />
      </div>
    </TooltipProvider>
  )
}

export default App
