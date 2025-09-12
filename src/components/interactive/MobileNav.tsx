import { useState, useEffect, useRef } from 'preact/hooks';
import type { VNode } from 'preact';

/**
 * Props for the MobileNav component.
 */
interface MobileNavProps {
  children: VNode;
}

/**
 * Navigation Icon Component
 * Renders either a hamburger or a close icon.
 */
function NavIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      class="h-8 w-8"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      )}
    </svg>
  );
}

/**
 * Mobile Navigation Island
 * Manages the state of the mobile navigation menu.
 */
export default function MobileNav({ children }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Manage a robust scroll lock that works better on mobile (iOS) and
  // keep the existing Tailwind utility fallback. Also clean up on unmount.
  useEffect(() => {
    const body = document.body;
    let scrollY = 0;

    if (isOpen) {
      // store scroll pos and lock
      scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      // also add the class for larger breakpoints
      body.classList.add('lg:overflow-auto');
    } else {
      // restore
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.classList.remove('lg:overflow-auto');
      window.scrollTo(0, scrollY);
    }

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.classList.remove('lg:overflow-auto');
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Keyboard + focus handling: close on Escape, trap Tab inside panel, and
  // restore focus to the toggle when closing.
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // focus the panel (or the first focusable inside it)
    requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const selectors =
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(selectors)).filter(
        (el) => el.offsetParent !== null
      );
      if (focusables.length) focusables[0].focus();
      else panel.focus();
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const panel = panelRef.current;
        if (!panel) return;
        const selectors =
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>(selectors)).filter(
          (el) => el.offsetParent !== null
        );
        if (!focusables.length) {
          e.preventDefault();
          panel.focus();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || active === panelRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      // restore focus
      if (toggleRef.current) toggleRef.current.focus();
      else previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  return (
    <>
      <button
        class="focus-ring relative z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="mobile-nav-panel"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <NavIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div id="mobile-nav-panel" class="fixed inset-0 z-40">
          {/* semi-opaque backdrop, closes menu when clicked */}
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* menu surface on top of the backdrop */}
          <div class="relative bg-surface/95 min-h-screen pt-16">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
