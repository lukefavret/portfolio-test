import { useState, useEffect, type VNode } from 'preact/hooks';

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
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    } else {
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
    }
    return () => {
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
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
