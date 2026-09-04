import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ingredientLabel, INGREDIENT_MAP, searchIngredients } from '@/lib/ingredients'
import type { DietType } from '@/types'
import { cn } from '@/lib/utils'

interface IngredientSearchProps {
  value: string[]
  onChange: (next: string[]) => void
  dietType: DietType
}

export function IngredientSearch({ value, onChange, dietType }: IngredientSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  const results = useMemo(() => searchIngredients(query, dietType), [query, dietType])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function addTag(tag: string) {
    const trimmed = tag.trim()
    if (!trimmed) return
    if (value.some((v) => v.toLowerCase() === trimmed.toLowerCase())) {
      setQuery('')
      return
    }
    onChange([...value, trimmed])
    setQuery('')
    setActiveIndex(0)
  }

  function addFromEntry(entryId: string) {
    const entry = INGREDIENT_MAP.get(entryId)
    addTag(entry ? entry.english : entryId)
    setOpen(false)
  }

  function removeTag(tag: string) {
    onChange(value.filter((v) => v !== tag))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (open && results[activeIndex]) {
        addFromEntry(results[activeIndex].id)
      } else if (query.trim()) {
        addTag(query)
      }
    } else if (e.key === 'Backspace' && !query && value.length > 0) {
      removeTag(value[value.length - 1])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring">
        {value.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1 py-1 pl-2.5 pr-1">
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
              className="rounded-full p-0.5 hover:bg-foreground/10"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <div className="flex min-w-[140px] flex-1 items-center gap-1.5 px-1">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-label="Search ingredients, e.g. Kanda, कांदा, or Onion"
            className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Search ingredients (Kanda / कांदा / Onion)…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
              setActiveIndex(0)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-40 mt-1.5 max-h-64 w-full overflow-y-auto rounded-lg border border-border bg-card p-1 shadow-lg animate-fade-in"
        >
          {results.map((entry, idx) => (
            <li key={entry.id} role="option" aria-selected={idx === activeIndex}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addFromEntry(entry.id)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors',
                  idx === activeIndex ? 'bg-secondary' : 'hover:bg-secondary/60',
                )}
              >
                <span>{ingredientLabel(entry)}</span>
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </li>
          ))}
          {query.trim() && !results.some((r) => r.english.toLowerCase() === query.trim().toLowerCase()) && (
            <li role="option" aria-selected={false}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  addTag(query)
                  setOpen(false)
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-primary hover:bg-secondary/60"
              >
                <Plus className="h-3.5 w-3.5" />
                Add "{query.trim()}" as custom ingredient
              </button>
            </li>
          )}
          {results.length === 0 && !query.trim() && (
            <li className="px-3 py-2 text-sm text-muted-foreground">Start typing to search ingredients…</li>
          )}
        </ul>
      )}
    </div>
  )
}
