import { useState, useEffect } from 'preact/hooks';
import { TAG_COLORS, DEFAULT_TAG_COLOR } from '../data/tagColors';

/**
 * Client-side tag filter announcing changes and emitting events.
 */
export interface TagFilterProps {
  tags: string[];
}

export default function TagFilter({ tags }: TagFilterProps) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    // Dispatch event for external listeners (e.g., to filter list).
    document.dispatchEvent(new CustomEvent('tag-filter', { detail: selected }));
  }, [selected]);

  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div>
      <p aria-live="polite" class="sr-only">
        {selected.length
          ? `${selected.join(', ')} filters applied`
          : 'No filters applied'}
      </p>
      <ul class="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active = selected.includes(tag);
          const color = TAG_COLORS[tag] ?? DEFAULT_TAG_COLOR;
          return (
            <li key={tag}>
              <button
                type="button"
                onClick={() => toggle(tag)}
                class={`rounded border px-2 py-1 focus-visible:outline-none ${color.border} ${active ? `${color.bg} ${color.text}` : color.text}`}
              >
                {tag}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={() => setSelected([])}
            class="underline"
          >
            Clear all
          </button>
        </li>
      </ul>
    </div>
  );
}
