import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'
import { GOALS } from '@/types'
import type { Goal } from '@/types'

interface GoalsChipsProps {
  value: Goal[]
  onChange: (value: Goal[]) => void
}

export function GoalsChips({ value, onChange }: GoalsChipsProps) {
  return (
    <div className="space-y-1.5">
      <Label>Dietary goals</Label>
      <ToggleGroup
        type="multiple"
        value={value}
        onValueChange={(v) => onChange(v as Goal[])}
        className="flex flex-wrap gap-2"
        aria-label="Dietary goals"
      >
        {GOALS.map((goal) => (
          <ToggleGroupItem key={goal} value={goal} className="rounded-full px-3.5 py-1.5 text-xs sm:text-sm">
            {goal}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
