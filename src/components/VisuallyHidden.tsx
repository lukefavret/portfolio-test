import type { ComponentChildren } from 'preact';
/** Utility component to hide content visually but keep for screen readers. */
export function VisuallyHidden({ children }: { children: ComponentChildren }) {
  return <span class="sr-only">{children}</span>;
}
