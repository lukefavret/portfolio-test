// src/components/interactive/EmailObfuscator.tsx
import { useState, useEffect } from 'preact/hooks';

/**
 * Email Obfuscator Component (Client-Side Island)
 *
 * This component renders an email address and a `mailto:` link in a way that
 * makes it harder for simple bots to scrape from the static HTML. The link
 * is constructed on the client-side using JavaScript.
 *
 * Props:
 * - `user`: The part of the email address before the @ symbol.
 * - `domain`: The part of the email address after the @ symbol.
 *
 * Accessibility:
 * - The visible text of the link is the full email address, which is clear
 *   and accessible.
 * - A `<noscript>` fallback is provided for users without JavaScript,
 *   ensuring the email is always accessible.
 */

// --- PROPS ---
interface Props {
  /** The local-part of the email, e.g., "jane.doe" */
  user: string;
  /** The domain-part of the email, e.g., "example.com" */
  domain: string;
}

export default function EmailObfuscator({ user, domain }: Props) {
  // State to hold the fully constructed email address.
  const [email, setEmail] = useState('');

  // The `useEffect` hook runs only on the client, after the component mounts.
  useEffect(() => {
    // Construct the email address and update the state.
    // This triggers a re-render with the `mailto:` link.
    setEmail(`${user}@${domain}`);
  }, [user, domain]); // Re-run if props change.

  const emailText = `${user} [at] ${domain}`;

  return (
    <>
      {/*
        This is the main element that will be progressively enhanced.
        Initially, it's just a placeholder. Once `email` state is set,
        it becomes a functional `mailto:` link.
      */}
      <a
        href={email ? `mailto:${email}` : '#'}
        // Security best practice for external links, though mailto is special.
        rel="noopener noreferrer"
        // Apply focus ring for accessibility.
        class="focus-ring font-mono text-lg text-accent hover:underline"
      >
        {email || 'Loading email...'}
      </a>

      {/*
        NOSCRIPT FALLBACK:
        This content is only rendered if JavaScript is disabled.
        It provides the email address in a human-readable format
        so the user can still contact you.
      */}
      <noscript>
        <p class="font-mono text-lg text-text">
          You can reach me at: {user} [at] {domain}
        </p>
      </noscript>
    </>
  );
}
