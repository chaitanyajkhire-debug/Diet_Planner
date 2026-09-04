import { Leaf, Drumstick } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'
import type { DietType } from '@/types'

interface DietToggleProps {
  value: DietType
  onChange: (value: DietType) => void
}

export function DietToggle({ value, onChange }: DietToggleProps) {
  return (
    <div className="space-y-1.5">
      <Label>Dietary preference</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v as DietType)}
        className="grid grid-cols-2 gap-2"
        aria-label="Dietary preference"
      >
        <ToggleGroupItem value="vegetarian" className="justify-center">
          <Leaf className="h-4 w-4" aria-hidden="true" />
          Vegetarian
        </ToggleGroupItem>
        <ToggleGroupItem value="non-vegetarian" className="justify-center">
          <Drumstick className="h-4 w-4" aria-hidden="true" />
          Non-Vegetarian
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
