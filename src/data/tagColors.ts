export interface TagColor {
  /** Background color class */
  bg: string;
  /** Text color class */
  text: string;
  /** Border color class */
  border: string;
}

export const TAG_COLORS: Record<string, TagColor> = {
  UX: { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-600' },
  UI: { bg: 'bg-green-600', text: 'text-white', border: 'border-green-600' },
  Research: {
    bg: 'bg-purple-600',
    text: 'text-white',
    border: 'border-purple-600',
  },
  'User Research': {
    bg: 'bg-purple-600',
    text: 'text-white',
    border: 'border-purple-600',
  },
  Python: {
    bg: 'bg-yellow-500',
    text: 'text-white',
    border: 'border-yellow-500',
  },
  DevEx: { bg: 'bg-pink-600', text: 'text-white', border: 'border-pink-600' },
};

export const DEFAULT_TAG_COLOR: TagColor = {
  bg: 'bg-accent',
  text: 'text-bg',
  border: 'border-accent',
};
