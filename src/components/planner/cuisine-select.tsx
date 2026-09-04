import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'
import { CUISINES } from '@/types'
import type { Cuisine } from '@/types'

interface CuisineSelectProps {
  value: Cuisine[]
  onChange: (value: Cuisine[]) => void
}

export function CuisineSelect({ value, onChange }: CuisineSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label>Cuisine (select any)</Label>
      <ToggleGroup
        type="multiple"
        value={value}
        onValueChange={(v) => onChange(v as Cuisine[])}
        className="flex flex-wrap gap-2"
        aria-label="Cuisine selection"
      >
        {CUISINES.map((cuisine) => (
          <ToggleGroupItem key={cuisine} value={cuisine}>
            {cuisine}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
