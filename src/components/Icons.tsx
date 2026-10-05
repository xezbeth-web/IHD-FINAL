interface IconProps {
  className?: string;
}

export const ArrowRight = ({ className = 'h-3.5 w-3.5' }: IconProps) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
  </svg>
);

export const ArrowUpRight = ({ className = 'h-3.5 w-3.5' }: IconProps) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" strokeLinecap="square" />
  </svg>
);

export const ArrowLeft = ({ className = 'h-3.5 w-3.5' }: IconProps) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M14 8H3M7 4L3 8l4 4" strokeLinecap="square" />
  </svg>
);
