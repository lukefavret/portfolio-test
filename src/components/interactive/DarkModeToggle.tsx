import { useEffect, useState } from 'preact/hooks';
import { h } from 'preact';

// Small accessible dark mode toggle for the site.
// Behavior:
// - On mount, it reads localStorage 'theme' ('dark'|'light'|null).
// - If set, it applies that class to document.documentElement.
// - If not set, it falls back to prefers-color-scheme and applies nothing to allow CSS media query fallback.
// - Button toggles between dark and light, persists choice, and updates the <html> class.

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
  document.documentElement.setAttribute('data-theme', 'dark');
        setIsDark(true);
        return;
      }

      if (stored === 'light') {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
  document.documentElement.setAttribute('data-theme', 'light');
        setIsDark(false);
        return;
      }

      // No explicit preference; respect system preference but don't persist.
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        // Apply dark class visually but keep isDark null to indicate no explicit choice
        document.documentElement.classList.add('dark');
        document.documentElement.removeAttribute('data-theme');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');
        setIsDark(false);
      }
    } catch (e) {
      // localStorage might be unavailable; default to light
      setIsDark(false);
    }
  }, []);

  function toggle() {
    try {
      // Toggle between dark and light. If currently null (system), treat as boolean.
      const next = !Boolean(isDark);
      setIsDark(next);
      if (next) {
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
  document.documentElement.setAttribute('data-theme', 'dark');
  // Immediate paint: inline vars and styles to avoid flash
  document.documentElement.style.setProperty('--color-bg', '20 20 22');
  document.documentElement.style.setProperty('--color-text', '235 235 235');
  document.documentElement.style.backgroundColor = 'rgb(20,20,22)';
  document.documentElement.style.color = 'rgb(235,235,235)';
  localStorage.setItem('theme', 'dark');
      } else {
  document.documentElement.classList.remove('dark');
  // Add a 'light' class so our CSS prefers-color-scheme fallback won't re-apply dark variables
  document.documentElement.classList.add('light');
  document.documentElement.setAttribute('data-theme', 'light');
  document.documentElement.style.setProperty('--color-bg', '248 247 241');
  document.documentElement.style.setProperty('--color-text', '34 34 34');
  document.documentElement.style.backgroundColor = 'rgb(248,247,241)';
  document.documentElement.style.color = 'rgb(34,34,34)';
  localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      // ignore
    }
  }

  // Render a simple button; the site uses Tailwind so we keep classes minimal.
  return (
    <button
      aria-pressed={!!isDark}
      title="Toggle dark mode"
      onClick={toggle}
      class="inline-flex items-center justify-center w-10 h-10 rounded-md border border-current bg-transparent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {/* Simple icon: sun/moon using SVG */}
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2"></path>
          <path d="M12 21v2"></path>
          <path d="M4.22 4.22l1.42 1.42"></path>
          <path d="M18.36 18.36l1.42 1.42"></path>
          <path d="M1 12h2"></path>
          <path d="M21 12h2"></path>
          <path d="M4.22 19.78l1.42-1.42"></path>
          <path d="M18.36 5.64l1.42-1.42"></path>
        </svg>
      )}
    </button>
  );
}
