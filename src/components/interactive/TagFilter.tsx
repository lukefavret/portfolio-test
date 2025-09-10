// src/components/interactive/TagFilter.tsx
import { useState, useMemo } from 'preact/hooks';
import type { CollectionEntry } from 'astro:content';

/**
 * Tag Filter Component (Client-Side Island)
 *
 * This Preact component renders an accessible, interactive filtering UI
 * for the portfolio page. It allows users to select multiple tags to

 * filter the visible projects.
 *
 * State Management:
 * - It maintains an internal state of `activeTags`.
 * - When the selection changes, it dispatches a custom DOM event `filterchange`
 *   with the list of active tags in the `detail` payload. The parent Astro
 *   page listens for this event to update the project list.
 *
 * Accessibility:
 * - Buttons are used for tags, which is semantically correct for an action.
 * - `aria-pressed` indicates the state of each tag button.
 * - An `aria-live` region announces the results to screen reader users
 *   when the filter changes, e.g., "7 projects now showing."
 * - The entire component is keyboard navigable.
 */

// --- PROPS ---
interface Props {
  /** All projects from the content collection. */
  projects: CollectionEntry<'projects'>[];
  /** The total number of projects currently being displayed. */
  filteredCount: number;
}

export default function TagFilter({ projects, filteredCount }: Props) {
  // State for the set of currently selected tags.
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  // Memoize the calculation of unique tags to avoid re-computing on every render.
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.data.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  // Function to handle clicking a tag button.
  const handleTagClick = (tag: string) => {
    // Create a new Set from the current state to ensure immutability.
    const newActiveTags = new Set(activeTags);
    if (newActiveTags.has(tag)) {
      newActiveTags.delete(tag); // Toggle off
    } else {
      newActiveTags.add(tag); // Toggle on
    }
    setActiveTags(newActiveTags);
    dispatchFilterChangeEvent(newActiveTags);
  };

  // Function to clear all active filters.
  const handleClearClick = () => {
    setActiveTags(new Set());
    dispatchFilterChangeEvent(new Set());
  };

  // Dispatches a custom event that the parent Astro page can listen to.
  const dispatchFilterChangeEvent = (tags: Set<string>) => {
    const event = new CustomEvent('filterchange', {
      detail: { tags: Array.from(tags) },
    });
    // Dispatch on the component's host element for the parent to catch.
    document.getElementById('tag-filter-container')?.dispatchEvent(event);
  };

  return (
    <div id="tag-filter-container" class="space-y-4">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-mono text-sm uppercase">Filter by Tag:</span>
        {allTags.map((tag) => {
          const isPressed = activeTags.has(tag);
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              aria-pressed={isPressed}
              class={`focus-ring rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                isPressed
                  ? 'border-accent bg-accent text-background'
                  : 'border-text/30 bg-transparent hover:bg-text/5'
              }`}
            >
              {tag}
            </button>
          );
        })}
        {/* The "Clear All" button is only visible if there are active filters. */}
        {activeTags.size > 0 && (
          <button
            onClick={handleClearClick}
            class="focus-ring font-mono text-sm uppercase text-accent hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
      {/*
        ACCESSIBILITY: ARIA Live Region
        This element announces changes to screen readers without interrupting them.
        `aria-live="polite"` waits for the user to finish their current task.
        `role="status"` is appropriate for information that is not critical.
      */}
      <div
        aria-live="polite"
        role="status"
        class="visually-hidden"
        id="filter-status"
      >
        {filteredCount} {filteredCount === 1 ? 'project' : 'projects'} now showing.
      </div>
    </div>
  );
}
