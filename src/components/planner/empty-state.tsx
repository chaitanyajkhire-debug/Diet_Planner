import { ChefHat } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <ChefHat className="h-7 w-7 text-primary" aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold">Your plan will appear here</p>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          Set your preferences and tap Generate to get a tailored diet plan or quick recipe ideas.
        </p>
      </div>
    </div>
  )
}
