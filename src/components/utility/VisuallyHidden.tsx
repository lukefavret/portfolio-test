// src/components/utility/VisuallyHidden.tsx
import type { ComponentChildren } from 'preact';

/**
 * Visually Hidden Utility Component
 *
 * This component visually hides its children but keeps them accessible
 * to screen readers and other assistive technologies. It's the standard
 * modern approach for creating accessible hidden content.
 *
 * Use this for text that should be available to screen reader users but
 * would be redundant or disruptive for visual users. For example, adding
 * context to an icon-only button.
 *
 * @param {object} props - The component's props.
 * @param {ComponentChildren} props.children - The content to be hidden.
 * @returns {JSX.Element} A span element with sr-only styles.
 */
export default function VisuallyHidden({ children }: { children: ComponentChildren }) {
  const styles = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  } as const; // `as const` provides stricter typing for the style object.

  return <span style={styles}>{children}</span>;
}
